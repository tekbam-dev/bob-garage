/**
 * @author Tek Bam
 * @description Simple discription template use for Feedback card
 * @version 2.0.0
 */

import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./scd.css";
import { getSingleUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";

const SimpleDescriptionCard = ({ feedback }) => {
  let currentUser;

  // const [feedbackStar,setFeedbackStar] = useState(feedbac);

  currentUser = useSelector(getSingleUser(feedback.UserUserId));



  // console.log(feedback.feedback_);
  const { feedback_id, feedback_body, feedback_star } = feedback;
  // const {feedback_body} = feedback

  console.log(feedback);

  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <p style={styles.description} className="feedback-description">
          {feedback_body}
        </p>
      </div>

      <div>
        <div className="stars" style={{ display: "flex", gap: "10px" }}>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className={index < feedback_star ? "star filled" : "star"}
              >
                {index + 1 <= feedback_star ? <FaStar /> : <FaRegStar />}
              </span>
            ))}
          <div data-coreui-toggle="rating" data-coreui-value="3"></div>
          <p
            style={{
              textAlign: "right",
              color: "var(--primary-colour)",
              padding: "10px 10px 0px 0px",
            }}
          >
            <i>{`- ${currentUser.user_fn}  ${currentUser.user_ln}`}</i>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    width: "300px",
    height: "200px",
    margin: "20px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  content: {
    padding: "16px",
  },
  feedbackBody: {
    fontSize: "1.1em",
    margin: "0 0 10px",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1em",

    marginBottom: "16px",
  },
  rating: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0",
    backgroundColor: "#f8f8f8",
    borderTop: "1px solid #ddd",
  },
  star: {
    fontSize: "1.5em",
    color: "#FFD700", // Gold color for stars
    padding: "0 2px",
  },
};

export default SimpleDescriptionCard;
