import { useParams } from "react-router-dom";
import styles from "./Posts.module.css";
import { UserInfo } from "../Users/UserInfo";
import { PostInfo } from "./PostInfo/PostInfo";
import { useEffect, useState } from "react";
import { postsService } from "../../services/posts";
import type { Post } from "../../models/post";
import { notifyApiError } from "../../utils/notifyApiErro";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { Spinner } from "../../components/Spinner/Spinner";
import { BackButton } from "./Header/Header";
import { handleApiError } from "../../utils/handleApiError";
import { NoData } from "../../components/NoData/NoData";

const Posts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const userInfo = useAppSelector((state) => state.users.list)?.find(
    (user) => user.id === Number(userId)
  );

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await postsService.getByUserId(userId);
        setPosts(data);
      } catch (error: unknown) {
        const apiError = handleApiError(error);
        notifyApiError(apiError);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    loadPosts();
  }, [userId]);

  const handleDeletePost = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdatePost = (post: Post) => {
    setPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
  };

  return (
    <>
      <div className={styles["page-container"]}>
        <div className={styles["header-container"]}>
          <BackButton />
          <h2>User Details:</h2>
        </div>
        {userInfo && <UserInfo user={userInfo}></UserInfo>}
          <h2>Posts:</h2>
        <div className={styles["posts-container"]}>
          {isLoadingPosts && <Spinner size="lg" />}
          {!isLoadingPosts && posts.length === 0 && (
            <NoData title="No posts found" />
          )}
          {!isLoadingPosts &&
            posts.length > 0 &&
            posts.map((post) => (
              <PostInfo
                post={post}
                key={`post-${post.id}`}
                onUpdate={handleUpdatePost}
                onDelete={handleDeletePost}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
