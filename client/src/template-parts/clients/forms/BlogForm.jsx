import React, { useState } from 'react';
import blogFormValidation from './formvalidation/blogfrom-validator';

import './form.css';

const BlogForm = ({handleSubmit,handleChange,formData,submitText}) => {

  const [errors,setErrors] = useState({});

 console.log(formData);

   // Validate form with Yup
   const validateForm = async () => {
    try {
      await blogFormValidation.validate(formData, { abortEarly: false });
      setErrors({}); // Clear previous errors if validation passes
      return true;
    } catch (validationErrors) {
      const errorObj = validationErrors.inner.reduce((acc, currError) => {

        console.log(acc);
        console.log(currError);
        acc[currError.path] = currError.message;
        return acc;
      }, {});
      setErrors(errorObj);
      return false;
    }
  };
   
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      console.log('Form Submitted:', formData);
      // Handle form submission logic here
      handleSubmit(e); // Assuming handleSubmit is passed as prop
    } else {
      console.log('Form has errors');
    }
  };


  return (
    <div >
      <form className="form blog-form" onSubmit={handleFormSubmit}>
        <div>
          <label>Blog Title</label>
          <input
            type="text"
            name="blog_title"
            value={formData.blog_title}
            onChange={handleChange}
          
          />
          {errors.blog_title && <div className="text-danger">{errors.blog_title}</div>}
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="blog_description"
            value={formData.blog_description}
            onChange={handleChange}
           
          />
            {errors.blog_description && <div className="text-danger">{errors.blog_description}</div>}
        </div>

        <div>
          <label>Blog Feature Image</label>
          <input
            type="url"
            name="blog_thumbnail"
            value={formData.blog_thumbnail}
            onChange={handleChange}
          
          />
            {errors.blog_thumbnail && <div className="text-danger">{errors.blog_thumbnail}</div>}
        </div>

       

        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
