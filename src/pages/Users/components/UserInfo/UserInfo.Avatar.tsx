import { Link } from "react-router-dom";
import styles from "./UserInfo.module.css";

export const Avatar: React.FC<{
  userName: string;
  imgUrl: string;
  userId: string;
}> = ({ imgUrl, userId }) => {
  return (
    <div className={styles["avatar-container"]}>
      <img src={imgUrl} height={190} width={190} />
      <Link to={"/posts/" + userId}> See posts </Link>
    </div>
  );
};
