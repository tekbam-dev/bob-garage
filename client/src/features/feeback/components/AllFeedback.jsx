/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\feeback\components\AllFeedback.jsx
 * All Feedback component to handle adding feedback
 * Form and event handler
 * @version 4.0.0
 */

import { useSelector, useDispatch } from "react-redux";
import { SimpleDescriptionCard } from "../../../template-parts/clients/index.js";

import DashboardItemsList from "../../../template-parts/admins/dashboard-items-list/DashboardItemsList.jsx";

import { Spin } from "@holmesdev/ponder-spinners";

import { getAllFeedbacks, getFeedbackStatus } from "../feedbackSlice.js";

const AllFeedback = ({ page }) => {
  let content;

  const feedbackList = useSelector(getAllFeedbacks);
  const feedbackStatus = useSelector(getFeedbackStatus);

  if (feedbackStatus == "loading") {
    return (content = (
      <Spin
        color1="#FF6F61"
        color2="#ffa9a1"
        opacity1={0.5}
        opacity2={1}
        speed="1s"
        direction="360deg"
        size={200}
        
      />
    ));
  } else if (feedbackStatus == "succeeded" && page == "client") {
    if (feedbackList.length == 0) {
      return (content = (
        <>
          <h1>NO Feedback found</h1>
        </>
      ));
    }

    content = feedbackList.map((feedback) => {
      return (
        <SimpleDescriptionCard key={feedback.feedback_id} feedback={feedback} />
      );
    });
  } else if (feedbackStatus == "succeeded" && page == "admin") {
    if (feedbackList.length == 0) {
      return (content = (
        <>
          <h1>NO Feedback found</h1>
        </>
      ));
    }
    content = feedbackList.map((feedback) => {
      return (
        <DashboardItemsList
          key={feedback.feedback_id}
          data={feedback}
          callerpage="feedback"
        />
      );
    });
  }

  return content;
};

export default AllFeedback;
