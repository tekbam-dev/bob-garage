/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\user\components\AddUser.jsx
 * Handle add new user 
 * Form and event handler
 * @version 4.0.0
 */

import React, { useState } from "react";
import { useDispatch} from "react-redux";

import { addNewUser, fetchUserList } from "../userSlice.js";
import UserForm from "../../../template-parts/clients/forms/UserForm.jsx";

import { is_Empty } from "../../../utils/validation.js";

const AddUser = () => {
  const dispatch = useDispatch();

  //   Initialize form state based on the existing user data
  const [formData, setFormData] = useState({
    user_fn: "",
    user_ln: "",
    user_pp: "",
    user_isadmin: false,
    user_email: "",
    user_password: "",
    passwordCompare: "",

    errors: {
      // password: "",
      // passwordCompare: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      user_fn,
      user_ln,
      user_pp,
      user_isadmin,
      user_email,
      user_password,
      passwordCompare,
      errors,
    } = formData;

    // Validation
    // Firstname
    if (is_Empty(user_fn)) {
      setFormData({
        ...formData,
        errors: {
          user_fn: "First name is required",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { user_fn: "" } });
    }
    // lastname
    if (is_Empty(user_ln)) {
      setFormData({
        ...formData,
        errors: {
          user_ln: "Last name is required",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { user_ln: "" } });
    }
    // user_email
    if (is_Empty(user_email)) {
      setFormData({
        ...formData,
        errors: {
          user_email: "Email is required",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { user_email: "" } });
    }
    // user_password
    if (is_Empty(user_password)) {
      setFormData({
        ...formData,
        errors: {
          password: "user_password is required",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { password: "" } });
    }
    // passwordCompare
    if (is_Empty(passwordCompare)) {
      setFormData({
        ...formData,
        errors: {
          passwordCompare: "You need to retype your user_password",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { passwordCompare: "" } });
    }
    // Test that the passwords match
    if (user_password !== passwordCompare) {
      setFormData({
        ...formData,
        errors: { password: "Passwords do not match!" },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { password: "" } });
    }

    // Sending new data information to slicer to create new user
    const newUserData = {
      user_fn,
      user_ln,
      user_pp,
      user_isadmin,
      user_email,
      user_password,
    };

    dispatch(addNewUser({ newUserData }));

    //Setting bacck all the data to inital position after adding new data
    setFormData({
      ...formData,
      user_fn: "",
      user_ln: "",
      user_pp: "",
      user_isadmin: false,
      user_email: "",
      user_password: "",
      passwordCompare: "",
    });

    dispatch(fetchUserList())
      .then(() => {
        console.log(`data fethed completed`);

        window.location.href = "/dashboard#user";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-user-form">
      <UserForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        caller="Add User"
      />
    </div>
  );
};

export default AddUser;
