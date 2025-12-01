import { useFormikContext } from "formik";
import styles from "./FormActionBar.module.css";
import { Button } from "../../Button";

interface Props {
  isEditing: boolean;
  onClickEdit: () => void;
  onCancel: () => void;
}

export const FormActionBar = ({ isEditing, onClickEdit, onCancel }: Props) => {
  const { dirty, isSubmitting, resetForm, submitForm } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useFormikContext<any>();

  if (!isEditing) {
    return (
      <div className={styles["button-container"]}>
        <Button variant="outline" color="primary" onClick={onClickEdit}>
          Edit
        </Button>
      </div>
    );
  }

  return (
    <div className={styles["buttons-container"]}>
      {dirty && (
        <Button
          variant="outline"
          color="primary"
          onClick={() => resetForm()}
          disabled={!dirty}
        >
          Revert changes
        </Button>
      )}

      <Button
        variant="outline"
        color="success"
        onClick={submitForm}
        disabled={!dirty || isSubmitting}
      >
        Save
      </Button>

      <Button variant="outline" color="danger" type="button" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};
