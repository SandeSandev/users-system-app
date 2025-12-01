import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import styles from "./UserInfo.module.css";
import userImg from "../../../../assets/user.png";
import { Card } from "../../../../components/Card";
import { Avatar } from "../Avatar/Avatar";
import { validationSchema } from "./userInfo.validation.";
import { FormActionBar } from "../../../../components/Formik/FormActionBar/FormActionBar";
import { FormikField } from "../../../../components/Formik/FormikField";

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
          {() => (
            <Form className={styles["form"]}>
              <div className={styles["fields-grid"]}>
                {fields.map((field) => (
                  <FormikField
                    key={field.name}
                    label={field.label}
                    fieldName={field.name}
                    isEditing={isEditing}
                  />
                ))}
              </div>
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
