/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ErrorMessage } from "formik";
import styles from "./UserInfo.module.css";

interface Props {
  label: string;
  fieldName: string;
  isEditing?: boolean;
}

export const UserField = ({ label, fieldName, isEditing = false }: Props) => {
  return (
    <div className={styles['field']}>
      <div className={styles['field-row']}>
        <label htmlFor={fieldName}>{label}:</label>

        {isEditing ? (
          <Field id={fieldName} name={fieldName} />
        ) : (
          <Field name={fieldName}>
            {({ field }: any) => <p>{field.value}</p>}
          </Field>
        )}
      </div>

      {isEditing && (
        <ErrorMessage
          name={fieldName}
          render={(msg) => <span className={styles.error}>{msg}</span>}
        />
      )}
    </div>
  );
};