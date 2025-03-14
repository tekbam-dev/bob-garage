import Joi from 'joi';

// Define the Joi validation schema for the user model
const validateUser = (userData) => {
  const schema = Joi.object({
    user_fn: Joi.string()
      .max(20)
      .required()
      .messages({
        'string.base': 'First name must be a string.',
        'string.max': 'First name cannot be longer than 20 characters.',
        'any.required': 'First name is required.',
      }),

    user_ln: Joi.string()
      .max(20)
      .required()
      .messages({
        'string.base': 'Last name must be a string.',
        'string.max': 'Last name cannot be longer than 20 characters.',
        'any.required': 'Last name is required.',
      }),

    user_pp: Joi.string()
      .optional()
      .allow('')
      .messages({
        'string.base': 'Profile picture must be a string.',
      }),

    user_isadmin: Joi.boolean()
      .optional()
      .default(false)
      .messages({
        'boolean.base': 'Admin status must be a boolean.',
        'any.required': 'Admin status is required.',
      }),

    user_ismode_dark: Joi.boolean()
      .optional()
      .default(false)
      .messages({
        'boolean.base': 'Dark mode setting must be a boolean.',
        'any.required': 'Dark mode setting is required.',
      }),

    user_email: Joi.string()
      .email()
      .required()
      .messages({
        'string.base': 'Email must be a string.',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.',
      }),

     

  });

  return schema.validate(userData);
};

export default validateUser;
