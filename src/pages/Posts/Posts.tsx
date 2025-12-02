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
const Posts: React.FC = () => {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        notifyApiError(error);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    loadPosts();
  }, [userId]);

  const handlePostDelete = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={styles["page-container"]}>
      {userInfo && <UserInfo user={userInfo}></UserInfo>}

      <div className={styles["posts-container"]}>
        {isLoadingPosts && <Spinner size="md" />}
        {!isLoadingPosts &&
          posts.map(({ id, title, body }) => (
            <PostInfo
              id={id}
              title={title}
              body={body}
              key={`post-${id}`}
              onDelete={handlePostDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Posts;
