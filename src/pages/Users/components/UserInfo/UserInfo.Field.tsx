import { Field } from "formik";
import styles from "./UserInfo.module.css";

export const UserField: React.FC<{
  label: string;
  value: string;
  isEditing?: boolean;
}> = ({ label, value, isEditing=false }) => {
  return (
    <div className={styles["field"]}>
      <label>{label}:</label>
      {isEditing ? <Field name="userName" /> : <p>{value}</p>}
    </div>
  );
};
