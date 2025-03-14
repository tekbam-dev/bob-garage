import * as Yup from "yup";

const userValidation = Yup.object().shape({
  user_fn: Yup.string()
    .required("First Name is required from user form ."),
  user_ln: Yup.string()
    .required("Last Name is required."),
  user_pp: Yup.string()
    .url("Profile Picture must be a valid URL.")
    .nullable(),
  user_email: Yup.string()
    .email("Email must be a valid email.")
    .required("Email is required."),

  user_isadmin: Yup.boolean()

  
 
});

export default userValidation;
