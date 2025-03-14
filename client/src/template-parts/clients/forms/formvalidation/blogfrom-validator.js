import * as Yup from "yup";

// Define the Yup validation schema
const blogFormValidaion = Yup.object({

  blog_title: Yup.string().required("Blog title is required"),

  blog_description: Yup.string().required("Description is required"),

  blog_thumbnail: Yup.string()
    .url("Invalid URL format")
    .required("Blog feature image is required"),
});

export default blogFormValidaion;
