
import React, { useState } from 'react';
import serviceValidationSchema from './formvalidation/serviceform-validator';
import './form.css';

const ServiceForm = ({handleChange,handleSubmit,formData,submitText}) => {
  
 // State for form errors
 const [errors, setErrors] = useState({});

 // Handle form submission with validation
 const handleFormSubmit = async(e) => {
 

   try {
     // Validate form data using Yup schema
     await serviceValidationSchema.validate(formData, { abortEarly: false });
     setErrors({}); 
     // Call handleSubmit function if validation passes
     handleSubmit(e);
   } catch (err) {
     // Collect validation errors if validation fails
     console.log(err);
     const newErrors = err.inner.reduce((acc, error) => {
      console.log(error.path);
       acc[error.path] = error.message;
       return acc;
     }, {});

     setErrors(newErrors); // Update the errors state
   }
 };


return (
  <div >
  <form className="form" onSubmit={handleFormSubmit}   >
  <div>
    <label>Service Title:</label>
    <input
      type="text"
      name="service_title"
      value={formData.service_title}
      onChange={handleChange}
   
    />

{errors.service_title && <div className="text-danger">{errors.service_title}</div>}
  </div>

  <div>
    <label>Service Description:</label>
    <textarea
      name="service_description"
      value={formData.service_description}
      onChange={handleChange}
    
    ></textarea>

  </div>
{errors.service_description && <div className="text-danger">{errors.service_description}</div>}

  <div>
    <label>Service Thumbnail URL:</label>
    <input
      type="text"
      name="service_thumbnail"
      value={formData.service_thumbnail}
      onChange={handleChange}
     
    />

{errors.service_thumbnail && <div className="text-danger">{errors.service_thumbnail}</div>}
  </div>

  <div>
    <label>Service Text:</label>
    <textarea
      name="service_text"
      value={formData.service_text}
      onChange={handleChange}
     
    ></textarea>

{errors.service_text && <div className="text-danger">{errors.service_text}</div>}
  </div>

  <div>
    <label>Service Price:</label>
    <input
      type="number"
      name="service_price"
      value={formData.service_price}
      onChange={handleChange}
     
    />
    {errors.service_price && <div className="text-danger">{errors.service_price}</div>}
  </div>
 
  <button type="submit">{submitText}

  </button>

 
</form>
</div>
  );
};

export default ServiceForm;
