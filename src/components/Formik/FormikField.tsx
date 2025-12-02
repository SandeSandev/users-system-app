/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ErrorMessage } from "formik";
import styles from "./FormikField.module.css";

interface Props {
  label: string;
  fieldName: string;
  isEditing?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}

export const FormikField = ({
  label,
  fieldName,
  isEditing = false,
  as = "input",
  rows = 4,
}: Props) => {
  return (
    <div className={styles.field}>
      <label htmlFor={fieldName}>{label}:</label>

      <div className={styles.fieldControl}>
        {isEditing ? (
          <Field
            id={fieldName}
            name={fieldName}
            as={as}
            rows={as === "textarea" ? rows : undefined}
          />
        ) : (
          <Field name={fieldName}>
            {({ field }: any) => <p>{field.value}</p>}
          </Field>
        )}

        {isEditing && (
          <ErrorMessage
            name={fieldName}
            render={(msg) => <span className={styles.error}>{msg}</span>}
          />
        )}
      </div>
    </div>
  );
};