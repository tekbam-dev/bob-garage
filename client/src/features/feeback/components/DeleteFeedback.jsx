/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\feeback\components\DeleteFeedback.jsx
 * Delete Feedback component to handle the delete request
 * dispatch deleteFeedback to delete the feedback 
 *
 * Form and event handler
 * @version 4.0.0
 */

// DeleteFeedback.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeedback,
  fetchFeedbackList,
  getFeedback,
} from "../feedbackSlice";

import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DeleteFeedback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feedbackId = window.location.hash.split("/").pop();

  const [feedbackIdState, setFeedbackIdState] = useState(feedbackId);

  let feedbackIdStateNum = parseInt(feedbackIdState);

  if (feedbackId !== feedbackIdState && Number.isInteger(feedbackIdStateNum)) {
    setFeedbackIdState(feedbackId);
  }

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [refreshFeedbackSection, setRefreshFeedbackSection] = useState(false);

  const feedbackReturn = useSelector(getFeedback(feedbackIdStateNum));

  const handleDelete = () => {
    dispatch(deleteFeedback({ feedbackIdStateNum }))
      .unwrap()
      .then((data) => {
        try {
          if (data) {
            dispatch(fetchFeedbackList());
          }

          return <Navigate to="/dashboard#feedback" />;
        } catch (error) {
          console.log(error);
        } finally {
          window.location.href = "/dashboard#feedback";
         
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setRefreshFeedbackSection((prev) => !prev); // Toggle the state to trigger re-render
    setConfirmDelete(false); // Reset confirmation state
   
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Redirect back to feedbacks list
  };

  return (
    <div className="delete-Feedback">
      {feedbackReturn ? (
        <>
          <h4>{`Will delete record - ${feedbackReturn.feedback_fn}   ${feedbackReturn.feedback_ln}`}</h4>
          <p>Are you sure you want to delete this Feedback?</p>

          <button onClick={handleDelete}>
            <a href="/dashboard#Feedback">Yes, Delete</a>
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <h5>Data not found</h5>
      )}
    </div>
  );
};

export default DeleteFeedback;
