import { useFormikContext } from "formik";
import styles from "./FormActionBar.module.css";
import { Button } from "../../Button";
import PeniclIcon from "../../../Icons/PencilIcon";

interface Props {
  isEditing: boolean;
  onClickEdit: () => void;
  onCancel: () => void;
}

export const FormActionBar = ({ isEditing, onClickEdit, onCancel }: Props) => {
  const { dirty, isSubmitting, resetForm, submitForm } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useFormikContext<any>();

  return (
    <div className={styles["buttons-container"]}>
      {!isEditing && (
        <Button
          variant="transparent"
          color="primary"
          onClick={onClickEdit}
          icon={<PeniclIcon />}
          iconPosition="left"
        >
          Edit
        </Button>
      )}
      {isEditing && dirty && (
        <Button
          variant="outline"
          color="primary"
          onClick={() => resetForm()}
          disabled={!dirty}
        >
          Revert changes
        </Button>
      )}

      {isEditing && (
        <>
          <Button
            variant="outline"
            color="success"
            onClick={submitForm}
            disabled={!dirty || isSubmitting}
          >
            Save
          </Button>

          <Button
            variant="outline"
            color="danger"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  );

};
