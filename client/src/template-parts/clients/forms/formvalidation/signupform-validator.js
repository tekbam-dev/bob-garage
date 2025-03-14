import * as Yup from "yup";

const signupValidation = Yup.object().shape({
  user_fn: Yup.string()
    .required("First Name is required."),
  user_ln: Yup.string()
    .required("Last Name is required."),
  user_pp: Yup.string()
    .url("Profile Picture must be a valid URL.")
    .nullable(),
  user_email: Yup.string()
    .email("Email must be a valid email.")
    .required("Email is required."),
  user_password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 8 characters.")
    .matches(/^.{6,}$/, "Password must be at least 6 characters long.")
 ,
  passwordCompare: Yup.string()
    .required("Re-entering your password is required.")
    .oneOf([Yup.ref("user_password"), null], "Passwords must match."),
 
});

export default signupValidation;
