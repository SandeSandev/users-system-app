import { NavLink } from "react-router-dom";
import styles from "./Avatar.module.css";
import cn from "classnames";
export const Avatar: React.FC<{
  imgUrl: string;
  userId: string;
  showSeePosts?: boolean;
}> = ({ imgUrl, userId, showSeePosts = false }) => {
  return (
    <div className={styles["avatar-container"]}>
      <img src={imgUrl} height={190} width={190} />
      {showSeePosts && (
        <NavLink
          className={({ isActive }) =>
            cn(styles["link"], { [styles["active"]]: isActive })
          }
          to={"/posts/" + userId}
        >
          See posts
        </NavLink>
      )}
    </div>
  );
};
