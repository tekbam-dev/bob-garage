// File: src/routes/feedbackroute.js
// This file holds the routes for feedback
// It holds the routes for:
// add: /api/feedback/add
// Type: private
// Allows users to post feedback
// getAllFeedback: /api/feedback
// type: public
// Returns all feedback
// getById: /api/feedback/edit/:id
// type: private
// Get single feedback item
// update: /api/feedback/edit/:id
// type: private
// update single feedback item
// delete: /api/feedback/delete/:id
// type: private
// delete single feedback item

// Bring in required modules
import express from "express";
import db from "../models/index.js";
import validateFeedback from "../validator/feedback-validator.js";
// import auth from '../middleware/auth.js';

// Creating Router instance for the feedback
const router = express.Router();

const { Feedbacks } = db.sequelize.models;

//Route to add new feedback after user logged in ( Need to add middleware to check the login )
router.get("/feedbacks", async (req, res) => {
  try {
    const feedback = await Feedbacks.findAll(); // Fetch all records from the Service table
    res.json(feedback); // Send the data as a JSON response
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get All Feedback

//Create new feedback ( only admin can create a feedback )

router.post("/feedback/add", async (req, res) => {
  console.log(req.body);

  //validating with JOI
try {

  const validateData = validateFeedback(req.body);

  const { feedback_body, feedback_star, user_id } = req.body;

  // Create a new feedback record
  // Create a new feedback record using promise chaining
  Feedbacks.create({
    feedback_body: validateData.feedback_body,
    feedback_star: validateData.feedback_star,
    UserUserId: validateData.user_id,
  })
    .then((newFeedback) => {
      // Respond with the created feedback
      res.status(201).json(newFeedback);
      console.log("New Feedback has been added !");
    })
    .catch((error) => {
      console.log(`Inside then block ${error}`)
     
      res.status(500).send("Internal Server Error");
      
    })
  } catch (error) {

  console.log(`Error from JOi ${error.message}`);
  if(error.message.includes("Joi validation Error")){
   
    return  res.status(400).json({
      error: "Invalid Data",
      message:error.message
    })
  
  }
}
})
;

// Delete feedback by ID
router.delete("/feedback/delete/:id", async (req, res) => {
  console.log(`Delete Feedback - DELETE`)

  console.log(req.params)
  const feedbackId = Number(req.params.id);

  const feedback = await Feedbacks.findOne({
    where: { feedback_id: feedbackId },
  });

  try {
    const deleted = await Feedbacks.destroy({
      where: { feedback_id: feedbackId },
    });

    if (deleted) {
      res.status(200).json({ feedback });
      // res.send(`Service with ID ${feedbackId} was deleted successfully.`);
    } else {
      res.send(`No feedback found with ID ${feedbackId}.`);
    }
  } catch (error) {
    res.send("Error deleting feedback:", error);
  }
});

export default router;
