import { useState, useMemo, useCallback } from "react";
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
import { notifySuccess } from "../../../../utils/notifySuccess";
import { notifyApiError } from "../../../../utils/notifyApiErro";
import { handleApiError } from "../../../../utils/handleApiError";

interface UserCardProps {
  img?: string;
  user: User;
  showSeePosts?: boolean;
}

export const UserInfo: React.FC<UserCardProps> = ({
  img = userImg,
  user,
  showSeePosts = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const initialValues = useMemo(
    () => ({
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
    }),
    [user]
  );

  const handleSubmit = useCallback(
    async (values: User) => {
      try {
        const updatedUser = await userService.updateById(user.id, values);
        dispatch(usersActions.updateUserInStore(updatedUser));
        notifySuccess("Successfully updated user");
        setIsEditing(false);
      } catch (error) {
        const apiError = handleApiError(error);
        notifyApiError(apiError);
      }
    },
    [user.id, dispatch]
  );

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
      <Avatar
        imgUrl={img}
        userId={user.id.toString()}
        showSeePosts={showSeePosts}
      />

      <div className={styles["user-info-content"]}>
        <Formik
          initialValues={initialValues}
          validateOnChange
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            handleSubmit(values as User);
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
