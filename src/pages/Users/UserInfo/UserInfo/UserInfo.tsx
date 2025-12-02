import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import styles from "./UserInfo.module.css";
import userImg from "../../../../assets/user.png";
import { Card } from "../../../../components/Card";
import { Avatar } from "../Avatar/Avatar";
import { validationSchema } from "./userInfo.validation.";
import { FormActionBar } from "../../../../components/Formik/FormActionBar/FormActionBar";
import { FormikField } from "../../../../components/Formik/FormikField";
import type { User } from "../../../../models/user";
import { useAppDispatch } from "../../../../store/hooks/useAppDispatch";
import { usersActions } from "../../../../store/slices/users-slice";
import { userService } from "../../../../services/users";

interface UserCardProps {
  img?: string;
  user: User;
}

export const UserInfo: React.FC<UserCardProps> = ({ img = userImg, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: User) => {
    try {
      const response = await userService.updateById(user.id, values);
      console.log("response", response);
      dispatch(usersActions.updateUserInStore(response));

      setIsEditing(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }
  };

  const fields = useMemo(
    () => [
      { label: "User name", name: "username" },
      { label: "Name", name: "name" },
      { label: "Email", name: "email" },
      { label: "Address", name: "address.street" },
      { label: "Latitude", name: "address.geo.lat" },
      { label: "Longitude", name: "address.geo.lng" },
      { label: "Suite", name: "address.suite" },
      { label: "City", name: "address.city" },
      { label: "Zip code", name: "address.zipcode" },
      { label: "Phone", name: "phone" },
      { label: "Website", name: "website" },
      { label: "Company Name", name: "company.name" },
      { label: "Company Bs", name: "company.bs" },
      { label: "Company catch phrase", name: "company.catchPhrase" },
    ],
    []
  );

  return (
    <Card classes={styles["user-info"]}>
      <Avatar imgUrl={img} userId={user.id.toString()} />
      <div className={styles["user-info-content"]}>
        <Formik
          initialValues={{
            username: user.username,
            name: user.name,
            email: user.email,
            address: {
              street: user.address.street,
              suite: user.address.suite,
              city: user.address.city,
              zipcode: user.address.zipcode,
              geo: {
                lat: user.address.geo.lat,
                lng: user.address.geo.lng,
              },
            },
            phone: user.phone,
            website: user.website,
            company: {
              name: user.company.name,
              bs: user.company.bs,
              catchPhrase: user.company.catchPhrase,
            },
          }}
          validateOnChange
          validationSchema={validationSchema}
          enableReinitialize={false}
          onSubmit={(values) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handleSubmit(values as any);
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
