import Joi from 'joi';

// Joi schema for social model validation
const socialValidationSchema = Joi.object({
  social_id: Joi.number().integer().optional(), // auto-incremented, not required
  social_icon: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'Social icon is required',
    'string.min': 'Social icon must have at least 1 character',
    'string.max': 'Social icon cannot exceed 255 characters',
  }),
  social_handler: Joi.string().min(1).max(255).required().messages({
    'string.empty': 'Social handler is required',
    'string.min': 'Social handler must have at least 1 character',
    'string.max': 'Social handler cannot exceed 255 characters',
  }),
});

const validateSocial = (data) => {
  const { error, value } = socialValidationSchema.validate(data);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
  return value;
};

export default validateSocial ;
