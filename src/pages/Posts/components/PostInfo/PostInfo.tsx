import { Card } from "../../../../components/Card";
import styles from "./PostInfo.module.css";


interface PostInfoProps {
  title: string;
  text: string;
}

export const PostInfo: React.FC<PostInfoProps> = ({ title, text }) => {
  return (
    <Card classes={styles['info']}>
      <h2 className={styles["post-title"]}>{title}</h2>
      <p className={styles["post-body"]}> {text}</p>
    </Card>
  );
};
