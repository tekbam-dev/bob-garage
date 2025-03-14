
/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\user\components\Edit.jsx
 * Handle displaying edit user in the admin dashboard 
 * Form and event handler
 * @version 5.0.0
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser, getSingleUser, fetchUserList } from "../userSlice.js";
import UserForm from "../../../template-parts/clients/forms/UserForm.jsx";

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const EditUser = () => {
  const dispatch = useDispatch();
  //   const history = useHistory();

  const userId = window.location.hash.split("/").pop();

  const [userIdState, setUserIdState] = useState(userId);
  let userIdStateNum = parseInt(userIdState);

  const [isUserExist,setIsUserExist] = useState(true);

  if (userId !== userIdState && Number.isInteger(userIdStateNum)) {
    setUserIdState(userId);
  }

  // Get the specific user data from the Redux store
  const user = useSelector(getSingleUser(userIdStateNum));

  //   Initialize form state based on the existing user data
  const [formData, setFormData] = useState({
    user_fn: "",
    user_ln: "",
    user_pp: "",
    user_isadmin: false,
    user_email: "",
  });

  // Populate form fields when component loads
  useEffect(() => {
    if (user) {
      setFormData({
        user_fn: user.user_fn || "",
        user_ln: user.user_ln || "",
        user_pp: user.user_pp || "",
        user_isadmin: user.user_isadmin || false,
        user_email: user.user_email || "",
      });
    }
  }, [userIdState]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("Handle submitted activated");
    e.preventDefault();

    console.log(user);
    if(user) {
    dispatch(updateUser({ userIdStateNum, users: formData }))
      .unwrap()
      .then(() => {
        // history.push("/dashboard#user"); // Redirect to user list page after update
        console.log("Record udpated");
        dispatch(fetchUserList());
        // window.location.reload();
        window.location.href = "/dashboard#user";
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });

    } else {
      setIsUserExist(false);
      
    }
  };

  return (
    <div className="edit-user-form">
      { isUserExist ? 
      <UserForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
        caller="Edit User"
      />
      : (<h4>USER NOT  EXIST !!</h4>)}
    </div>
  );
};

export default EditUser;
