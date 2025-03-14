import Joi from 'joi';

// Joi schema for validation
const feedbackValidationSchema = Joi.object({
  feedback_id: Joi.number().integer().optional(), // Auto-incremented
  feedback_body: Joi.string().min(1).required(),  // Non-empty string
  feedback_star: Joi.number().integer().min(0).max(5).default(0), // Star rating
  user_id : Joi.number().integer().min(0)
});

const validateFeedback = (data) => {
    try {
      const { error, value } = feedbackValidationSchema.validate(data);
      if (error) {
        // You can customize the error message as per your need
       throw new Error(`Joi Validation error: ${error.details[0].message}`);
      }
      console.log(value);
      return value;
    } catch (err) {
      // Log the error (optional) and return a user-friendly message
    console.log(`Thrown Error ${err}`);
    return  err;
    }
  };
  

export default validateFeedback ;
