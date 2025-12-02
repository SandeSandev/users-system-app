import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required("Username is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  address: Yup.object({
    street: Yup.string()
      .trim()
      .required("Street is required"),

    suite: Yup.string()
      .trim()
      .required("Suite is required"),

    city: Yup.string()
      .trim()
      .required("City is required"),
  }),
});