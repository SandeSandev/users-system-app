import styles from "./ConfirmationModal.module.css";
import { Button } from "../Button";
interface Props {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmationModal = ({
  title = "Confirm action",
  message = "Are you sure you want to continue?",
  onConfirm,
  onCancel,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
}: Props) => {
  return (
    <div className={styles["backdrop"]}>
      <div className={styles["modal"]}>
        <h2 className={styles["title"]}>{title}</h2>

        <p className={styles["message"]}>{message}</p>

        <div className={styles["actions"]}>
          <Button
            variant="normal"
            color="success"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
          <Button variant="normal" color="danger" onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};
