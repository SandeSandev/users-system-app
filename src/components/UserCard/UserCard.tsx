import { useState } from "react";
import { Formik, Form, Field } from "formik";
import styles from "./UserCard.module.css";
import userImg from "../../assets/user.png";
import { Button } from "../Button/Button";

interface UserCardProps {
  img?: string;
  userName: string;
  email: string;
  addressStreet: string;
  addressSuite: string;
  addressCity: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  img = userImg,
  userName,
  email,
  addressStreet,
  addressSuite,
  addressCity,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles["user-card"]}>
      <img src={img} height={190} width={190} />

      <div className={styles["user-card-content"]}>
        {!isEditing ? (
          <>
            <h4 className={styles["title"]}>Name: {userName}</h4>

            <div className={styles["field"]}>
              <label>Email:</label>
              <p>{email}</p>
            </div>

            <div className={styles["field"]}>
              <label>Address:</label>
              <p>{addressStreet}</p>
            </div>

            <div className={styles["field"]}>
              <label>Suite:</label>
              <p>{addressSuite}</p>
            </div>

            <div className={styles["field"]}>
              <label>City:</label>
              <p>{addressCity}</p>
            </div>

            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
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
                <div className={styles["field"]}>
                  <label>Name:</label>
                  <Field name="userName" />
                </div>

                <div className={styles["field"]}>
                  <label>Email:</label>
                  <Field name="email" />
                </div>

                <div className={styles["field"]}>
                  <label>Address:</label>
                  <Field name="addressStreet" />
                </div>

                <div className={styles["field"]}>
                  <label>Suite:</label>
                  <Field name="addressSuite" />
                </div>

                <div className={styles["field"]}>
                  <label>City:</label>
                  <Field name="addressCity" />
                </div>

                <div className={styles["buttons"]}>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};
