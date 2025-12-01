import { useMemo, useState } from "react";
import { Card } from "../../../components/Card";
import styles from "./PostInfo.module.css";
import { FormActionBar } from "../../../components/Formik/FormActionBar/FormActionBar";
import { Form, Formik } from "formik";
import { FormikField } from "../../../components/Formik/FormikField";

interface PostInfoProps {
  title: string;
  text: string;
}

export const PostInfo: React.FC<PostInfoProps> = ({ title, text }) => {
  const [isEditing, setIsEditing] = useState(false);

  const fields = useMemo(
    () => [
      { label: "Name", name: "userName", as: "input" },
      { label: "text", name: "text", as: "textArea" },
    ],
    []
  );

  return (
    <Card classes={styles["info"]}>
      <div className={styles["user-info-content"]}>
        <Formik
          initialValues={{
            title,
            text,
          }}
          enableReinitialize={false}
          onSubmit={(values) => {
            console.log(values);
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
                  as={field.as}
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
    </Card>
  );
};
