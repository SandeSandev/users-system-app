import { useMemo, useState } from "react";
import { Card } from "../../../components/Card";
import styles from "./PostInfo.module.css";
import { FormActionBar } from "../../../components/Formik/FormActionBar/FormActionBar";
import { Form, Formik } from "formik";
import { FormikField } from "../../../components/Formik/FormikField";
import { postsService } from "../../../services/posts";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { ConfirmationModal } from "../../../components/ConfirmationModal/ConfirmationModal";
import { Button } from "../../../components/Button";

interface PostInfoProps {
  id: number;
  title: string;
  body: string;
  onDelete: (id: number) => void;
}

interface PostFormValues {
  title: string;
  body: string;
}

export const PostInfo: React.FC<PostInfoProps> = ({
  id,
  title,
  body,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, open, close } = useConfirmation();

  const fields = useMemo(
    () => [
      { label: "Title", name: "title", as: "input" },
      { label: "Body", name: "body", as: "textarea" },
    ],
    []
  );

  const handleSubmit = async (values: PostFormValues): Promise<void> => {
    try {
      await postsService.updateById(id, values);
      setIsEditing(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await postsService.deleteById(id);
      onDelete(id);
      close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card classes={styles["info"]}>
        <div className={styles["user-info-content"]}>
          <Formik
            initialValues={{
              title,
              body,
            }}
            enableReinitialize={false}
            onSubmit={(values) => {
              handleSubmit(values);
              setIsEditing(false);
            }}
          >
            {() => (
              <Form className={styles["form"]}>
                {fields.map((field) => (
                  <FormikField
                    key={id}
                    label={field.label}
                    fieldName={field.name}
                    isEditing={isEditing}
                    rows={4}
                    as={field.as as "textarea" | "input"}
                  />
                ))}
                <FormActionBar
                  isEditing={isEditing}
                  onClickEdit={() => setIsEditing(true)}
                  onCancel={() => setIsEditing(false)}
                />
              </Form>
            )}
          </Formik>
        </div>
        <Button
          variant="normal"
          color="danger"
          className={styles["button-container"]}
          onClick={open}
        >
          Delete
        </Button>
      </Card>
      {isOpen && (
        <ConfirmationModal
          title="Delete Post?"
          message="This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={close}
        />
      )}
    </>
  );
};
