import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import styles from "./UserInfo.module.css";
import userImg from "../../../../assets/user.png";
import { Card } from "../../../../components/Card";
import { Button } from "../../../../components/Button";
import { UserField } from "./UserInfo.Field";
import { Avatar } from "./UserInfo.Avatar";
import { validationSchema } from "./UserInfo.validation.";

interface UserCardProps {
  userId: string;
  img?: string;
  userName: string;
  email: string;
  addressStreet: string;
  addressSuite: string;
  addressCity: string;
}

export const UserInfo: React.FC<UserCardProps> = ({
  userId,
  img = userImg,
  userName,
  email,
  addressStreet,
  addressSuite,
  addressCity,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const fields = useMemo(
    () => [
      { label: "Name", name: "userName" },
      { label: "Email", name: "email" },
      { label: "Address", name: "addressStreet" },
      { label: "Suite", name: "addressSuite" },
      { label: "City", name: "addressCity" },
    ],
    []
  );

  return (
    <Card classes={styles["user-info"]}>
      <Avatar imgUrl={img} userId={userId} />
      <div className={styles["user-info-content"]}>
        <Formik
          initialValues={{
            userName,
            email,
            addressStreet,
            addressSuite,
            addressCity,
          }}
          validateOnChange
          validationSchema={validationSchema}
          enableReinitialize={false}
          onSubmit={(values) => {
            console.log(values);
            setIsEditing(false);
          }}
        >
          {({ dirty, isSubmitting, resetForm }) => (
            <Form className={styles["form"]}>
              <div className={styles["fields-grid"]}>
                {fields.map((field) => (
                  <UserField
                    key={field.name}
                    label={field.label}
                    fieldName={field.name}
                    isEditing={isEditing}
                  />
                ))}
              </div>
              {isEditing && (
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
                    type="submit"
                    disabled={!dirty || isSubmitting}
                  >
                    Save
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    color="danger"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      {!isEditing && (
        <div className={styles["button-container"]}>
          <Button
            variant="outline"
            color="primary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      )}
    </Card>
  );
};
