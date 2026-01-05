import { Field, ErrorMessage, type FieldInputProps } from "formik";
import styles from "./FormikField.module.css";

interface FormikFieldProps {
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
}: FormikFieldProps) => {
  return (
    <div className={styles['field']}>
      <label htmlFor={fieldName}>{label}:</label>

      <div className={styles["field-control"]}>
        {isEditing ? (
          <Field
            id={fieldName}
            name={fieldName}
            as={as}
            rows={as === "textarea" ? rows : undefined}
          />
        ) : (
          <Field name={fieldName}>
            {({ field }: { field: FieldInputProps<string> }) => (
              <p>{field.value}</p>
            )}
          </Field>
        )}

        {isEditing && (
          <ErrorMessage
            name={fieldName}
            render={(msg) => <span className={styles['error']}>{msg}</span>}
          />
        )}
      </div>
    </div>
  );
};
