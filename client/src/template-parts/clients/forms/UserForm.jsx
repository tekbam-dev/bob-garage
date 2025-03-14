import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser, getSingleUser } from "../../../features/user/userSlice";

import { getIsAdmin, getIsAuth } from "../../../features/auth/authSlicer";
import userValidationSchema from "./formvalidation/userfrom-validator";

const UserForm = ({ handleChange, handleSubmit, formData, caller }) => {
  // Getting isAuth and Is Admin to conditionally display is Admin checkbox ( only for admin user )
  const isAuth = useSelector(getIsAuth);
  const isAdmin = useSelector(getIsAuth);
  const [errors, setErrors] = useState({});

  // Local submit handler for validation
  const submitForm = async(e) => {
    e.preventDefault();

    console.log(`Form submitted ran`);
    try {
      // Validate the form data against the Yup schema
      await userValidationSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear errors if validation passes

      console.log(`inside try bloc inside userForm`)
      handleSubmit(e); // Call the parent-provided handleSubmit function
    } catch (validationErrors) {
      // Update the errors state with validation messages
      console.log(validationErrors);
      const formattedErrors = {};
      validationErrors.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  const {
    user_fn,
    user_ln,
    user_pp,
    user_isadmin,
    user_email,
    // user_password,
    // passwordCompare,
  } = formData;

  return (
    <div className="edit-user-form">
      <form onSubmit={(e)=>submitForm(e)}>
        <div>
          <label>First Name User form</label>
          <input
            type="text"
            name="user_fn"
            value={user_fn}
            onChange={handleChange}
          />

          {errors.user_fn && (
            <div className="text-danger">{errors.user_fn}</div>
          )}
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="user_ln"
            value={user_ln}
            onChange={handleChange}
          />

          {errors.user_ln && (
            <div className="text-danger">{errors.user_ln}</div>
          )}
        </div>

        <div>
          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="user_pp"
            value={user_pp}
            onChange={handleChange}
          />

          {errors.user_pp && (
            <div className="text-danger">{errors.user_pp}</div>
          )}
        </div>

        {true && (
          //Remove it once all done

          // isAdmin && isAuth

          <div>
            <label>Is Admin:</label>
            <input
              type="checkbox"
              name="user_isadmin"
              checked={user_isadmin}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="user_email"
            value={user_email}
            onChange={handleChange}
          />

          {errors.user_email && (
            <div className="text-danger">{errors.user_email}</div>
          )}
        </div>

        <button type="submit">{caller}</button>
      </form>
    </div>
  );
};

export default UserForm;
