// FeedbackForm.js
import React, { useState } from "react";
import "./form.css";
import { FaTimes } from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa";
import { getAuthUser, getIsAuth } from "../../../features/auth/authSlicer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFeedback } from "../../../features/feeback/feedbackSlice";


const FeedbackForm = ({ onSubmit, onClose }) => {
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const authorisedUser = useSelector(getAuthUser);
  const isAuthorised = useSelector(getIsAuth);
 

  const handleSubmit = (e) => {
    e.preventDefault();
   if(!isAuthorised) {
    alert('Please sign in to leave the comment');
    return ;
   }
   
     const newFeedback = {
      feedback_body : feedback,
      user_id: authorisedUser.user_id,
      feedback_star: rating

     }

    dispatch(addFeedback(newFeedback)).then(()=>{
      setFeedback("");
      setRating(0);
      onClose();
      window.location.reload();
    }).catch((error)=>{
      console.log (`Error while adding  ${error}`);
    })
   
  
   
  };

  const handleStarClick = (index) => {
    
    setRating(index + 1);
  };

  return (
    <div className="feedbackForm">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <h4>Submit Your Feedback</h4>
        <FaTimes style={{ border: " solid red 1px" }} onClick={onClose} />
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Feedback:
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="textarea"
            required
          />
        </label>
        <label>
          Rating:
          <div className="stars" style={{ display: "flex", gap: "10px" }}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className={index < rating ? "star filled" : "star"}
                >
                  {index + 1 <= rating ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            <div data-coreui-toggle="rating" data-coreui-value="3"></div>
          </div>
        </label>
        <button type="submit" className="submitButton">
          Submit
        </button>
        <h6>Give us some nice word <a href="/login">Login</a> or <a href="signup">Signup</a></h6>
      </form>
    </div>
  );
};

export default FeedbackForm;
