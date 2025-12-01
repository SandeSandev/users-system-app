import { useState } from "react";
import { Formik, Form } from "formik";
import styles from "./UserInfo.module.css";
import userImg from "../../../../assets/user.png";
import { Card } from "../../../../components/Card";
import { Button } from "../../../../components/Button";
import { UserField } from "./UserInfo.Field";
import { Avatar } from "./UserInfo.Avatar";

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

  return (
    <Card classes={styles["user-info"]}>
      <Avatar userName={userName} imgUrl={img} userId={userId} />

      <div className={styles["user-info-content"]}>
        {!isEditing ? (
          <>
            <div className={styles["fields-grid"]}>
              <UserField label="Name" value={userName} />
              <UserField label="Email" value={email} />
              <UserField label="Address" value={addressStreet} />
              <UserField label="Suite" value={addressSuite} />
              <UserField label="Suite" value={addressCity} />
            </div>
          </>
        ) : (
          <Formik
            initialValues={{
              userName,
              email,
              addressStreet,
              addressSuite,
              addressCity,
            }}
            onSubmit={(values) => {
              console.log(values);
              setIsEditing(false);
            }}
          >
            {() => (
              <Form className={styles["form"]}>
                <div className={styles["fields-grid"]}>
                  <UserField label="name" value={userName} isEditing />
                  <UserField label="Email" value={email} isEditing />
                  <UserField label="Address" value={addressStreet} isEditing />
                  <UserField label="Suite" value={addressSuite} isEditing />
                  <UserField label="Suite" value={addressCity} isEditing />
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>

      <div className={styles["buttons-container"]}>
        {!isEditing && (
          <Button
            variant="outline"
            color="primary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
        {isEditing && (
          <>
            <Button variant="outline" color="primary" type="submit">
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
          </>
        )}
      </div>
    </Card>
  );
};
