/**
 * @author Tek Bam
 *
 * @description Edit Blog feature component to handle put request and return  Blog Form with onsubmit and on change handler
 *
 * @version 5.0.0
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBlogById, updateBlog } from "../blogSlice";
import { useState } from "react";
import BlogForm from "../../../template-parts/clients/forms/BlogForm";

const EditBlog = () => {
  const dispatch = useDispatch();

  //Use dispatch to work inside the component
  const blogId = window.location.hash.split("/").pop();
  let blogIdNumber = parseInt(blogId);

  
  const blog = useSelector(getBlogById(blogIdNumber));

  const [requestStatus, setRequestStatus] = useState("idle");

  const [formData, setFormData] = useState({
    blog_title: blog?.blog_title,

    blog_description: blog?.blog_description,

    blog_thumbnail: blog?.blog_thumbnail,
  });

  if (!blog && blog === undefined) {
    return <section>Blog not found </section>;
  }

  //Handling on change event

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = blog !== undefined && requestStatus == "idle";

  //Handling onSubmit event

  const handleSubmit = (e) => {
    console.log("On submit ran");
    e.preventDefault();
    const { blog_title, blog_description, blog_thumbnail } = formData;

    const editBlog = {
      id: blogIdNumber,
      updatedBlog: {
        blog_title,
        blog_description,
        blog_thumbnail,
      },
    };

    try {
      if (canSave) {
        console.log("Can Update ... updateing..");
        setRequestStatus("pending");

        /**
         * than catch on promise to handle error and success
         */
        dispatch(updateBlog(editBlog))
          .then((data) => {
            if (data.payload) {
       

              window.location.href = "/dashboard#blog";
              window.location.reload();
              
            }
          })
          .catch((error) => {
            return error;
          });
      } else {
        console.log("Cannot update");
      }
    } catch (err) {
      console.log("Failed to udpate feedback ", err);
    } finally {
      setRequestStatus("idle");
      // navigate("/dashboard#blog")
    }
  };

  return (
    <BlogForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      submitText="Blog Edit"
    />
  );
};

export default EditBlog;
