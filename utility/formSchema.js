import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Password length should be greater than 6 chars")
    .max(20, "Password is too long!")
    .required("Password is required!"),
  email: Yup.string().email("Invalid email").required("Email is required!"),
});
