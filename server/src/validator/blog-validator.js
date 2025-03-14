

import Joi from 'joi';

const blogValidationSchema = Joi.object({
  // blog_id is auto-incremented and should not be included in the creation request
  blog_id: Joi.number().integer().optional(),

  // blog_title: required string with a max length of 50 characters
  blog_title: Joi.string().max(50).required(),

  // blog_description: required text (no max length specified here)
  blog_description: Joi.string().min(1).required(), // Ensures it's not an empty string

  // blog_thumbnail: optional string (URL or file path)
  blog_thumbnail: Joi.string().uri().optional(), // You can modify `.uri()` to validate specific URL formats if needed
});

const validateBlog = (data) => {
  const { error, value } = blogValidationSchema.validate(data);

  if (error) {
    throw new Error(`Joi Validation error: ${error.details[0].message}`);
  }

  return value; // Return the validated data
};

export default validateBlog;
