// src/validators/authValidator.js
import Joi from 'joi';

// Validator for login request
export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must have at least 6 characters',
    'string.empty': 'Password is required',
  }),
});

// Validator for register request
export const registerValidationSchema = Joi.object({
  firstName: Joi.string().min(1).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must have at least 1 character',
  }),
  lastName: Joi.string().min(1).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must have at least 1 character',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),
  image: Joi.string().allow('').uri().optional().messages({
    'string.uri': 'Profile image URL must be valid',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must have at least 6 characters',
    'string.empty': 'Password is required',
  }),
});
