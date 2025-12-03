import { useCallback, useMemo, useState } from "react";
import { Card } from "../../../components/Card";
import styles from "./PostInfo.module.css";
import { FormActionBar } from "../../../components/Formik/FormActionBar/FormActionBar";
import { Form, Formik } from "formik";
import { FormikField } from "../../../components/Formik/FormikField";
import { postsService } from "../../../services/posts";
import { useConfirmation } from "../../../hooks/useConfirmation";
import { ConfirmationModal } from "../../../components/ConfirmationModal/ConfirmationModal";
import { Button } from "../../../components/Button";
import TrashIcon from "../../../Icons/TrashIcon";
import { notifySuccess } from "../../../utils/notifySuccess";
import { handleApiError } from "../../../utils/handleApiError";
import { notifyApiError } from "../../../utils/notifyApiErro";
import type { Post } from "../../../models/post";

interface PostInfoProps {
  post: Post;
  onDelete: (id: number) => void;
  onUpdate: (newValue: Post) => void;
}

interface PostFormValues {
  title: string;
  body: string;
}

export const PostInfo: React.FC<PostInfoProps> = ({
  post,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { isOpen, open, close } = useConfirmation();

  const fields = useMemo(
    () => [
      { label: "Title", name: "title", as: "input" },
      { label: "Body", name: "body", as: "textarea" },
    ],
    []
  );

  const initialValues = useMemo(
    () => ({
      title: post.title,
      body: post.body,
    }),
    [post.title, post.body]
  );

  const handleEditSubmit = async (values: PostFormValues) => {
    try {
      await postsService.updateById(post.id, values);
      onUpdate({ ...post, ...values });
      notifySuccess("Successfully updated post");
      setIsEditing(false);
    } catch (error: unknown) {
      const apiError = handleApiError(error);
      notifyApiError(apiError);
    }
  };

  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await postsService.deleteById(post.id);
      onDelete(post.id);
      notifySuccess("Successfully delete post");
      close();
    } catch (error: unknown) {
      const apiError = handleApiError(error);
      notifyApiError(apiError);
    } finally {
      setIsDeleting(false);
    }
  }, [post.id, onDelete, close]);

  return (
    <>
      <Card classes={styles["info"]}>
        <div className={styles["post-info-content"]}>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values) => {
              handleEditSubmit(values);
              setIsEditing(false);
            }}
          >
            {() => (
              <Form className={styles["form"]}>
                {fields.map((field) => (
                  <FormikField
                    key={field.name}
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
          variant="transparent"
          color="danger"
          className={styles["button-container"]}
          onClick={open}
          icon={<TrashIcon />}
          iconPosition="right"
        >
          Delete
        </Button>
      </Card>
      {isOpen && (
        <ConfirmationModal
          title="Delete Post?"
          message="Are you sure to delete this post?"
          confirmText="Delete"
          cancelText="Cancel"
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={close}
        />
      )}
    </>
  );
};
