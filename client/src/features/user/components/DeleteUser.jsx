/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\user\components\DeleteUsers.jsx
 * Handle delting user from the dashboard
 * Form and event handler
 * @version 5.0.0
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUserList, getSingleUser } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../auth/authSlicer";

const DeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_id } = useSelector(getAuthUser);
// getting ID from url 
  const userId = window.location.hash.split("/").pop();

  const [userIdState, setUserIdState] = useState(userId);
// Ensuring ID is number 
  let userIdStateNum = parseInt(userIdState);
 

  if (userId !== userIdState && Number.isInteger(userIdStateNum)) {
    setUserIdState(userId);
  }

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [refreshUserSection, setRefreshUserSection] = useState(false);

  const userReturn = useSelector(getSingleUser(userIdStateNum));

  const handleDelete = () => {
    dispatch(deleteUser({ userIdStateNum, user_id }))
      .unwrap()
      .then(() => {
        
        dispatch(fetchUserList());
      });

    setRefreshUserSection((prev) => !prev); // Toggle the state to trigger re-render
    setConfirmDelete(false); // Reset confirmation state
    // window.location.href = '/dashboard#user'; // Full

    //  window.location.href = '/dashboard#user'; // Full
    //   window.location.reload();//redirect to refresh the page
  };

  const handleCancel = () => {
   window.location.href= "/dashboard#user";
  };

  return (
    <div className="delete-user">
      {userReturn ? (
        <>
          <h4>{`Will delete record - ${userReturn.user_fn}   ${userReturn.user_ln}`}</h4>
          <p>Are you sure you want to delete this user?</p>

          <button onClick={handleDelete}>
            <a href="/dashboard#user">Yes, Delete</a>
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <h5>Data not found</h5>
      )}
    </div>
  );
};

export default DeleteUser;
