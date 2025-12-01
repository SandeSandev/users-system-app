import * as Yup from "yup";

export const validationSchema = Yup.object({
  userName: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),

  addressStreet: Yup.string()
    .trim()
    .min(3, "Street must be at least 3 characters")
    .max(100, "Street must be under 100 characters")
    .required("Street is required"),

  addressSuite: Yup.string()
    .trim()
    .min(1, "Suite must be at least 1 character")
    .max(20, "Suite must be under 20 characters")
    .required("Suite is required"),

  addressCity: Yup.string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be under 50 characters")
    .required("City is required"),
});
