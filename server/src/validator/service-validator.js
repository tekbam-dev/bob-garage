import Joi from 'joi';

const serviceValidationSchema = Joi.object({
  // service_id: Not necessary to validate as it is auto-incremented in the database
  service_title: Joi.string().max(40).required().messages({
    'string.base': `"service_title" should be a type of 'text'`,
    'string.empty': `"service_title" cannot be an empty field`,
    'string.max': `"service_title" should have a maximum length of 20 characters`,
    'any.required': `"service_title" is a required field`
  }),

  service_description: Joi.string().max(200).required().allow(null).messages({
    'string.base': `"service_description" should be a type of 'text'`,
    'string.max': `"service_description" should have a maximum length of 50 characters`,
    'any.allowOnly': `"service_description" can be null or a string with a maximum length of 50 characters`
  }),

  service_thumbnail: Joi.string().uri().optional().allow(null).messages({
    'string.uri': `"service_thumbnail" should be a valid URL`,
    'any.allowOnly': `"service_thumbnail" can be null or a valid URL`
  }),

  service_text: Joi.string().optional().allow(null).messages({
    'string.base': `"service_text" should be a type of 'text'`,
    'any.allowOnly': `"service_text" can be null or a string`
  }),

  service_price: Joi.number().precision(2).greater(0).required().messages({
    'number.base': `"service_price" should be a type of 'number'`,
    'number.greater': `"service_price" should be greater than 0`,
    'any.required': `"service_price" is a required field`
  })
});

const validateService = (data) => {
  const { error, value } = serviceValidationSchema.validate(data);
  if (error) {
    throw new Error(`Joi Validation error: ${error.details[0].message}`);
  }
  return value;
};

export default validateService;
