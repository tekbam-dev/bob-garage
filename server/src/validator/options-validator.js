import Joi from 'joi';

const validateOptions = (data) => {
  const schema = Joi.object({
    options_banner_image: Joi.string().uri().optional(), // Optional field, can be a valid URI string
    option_banner_text: Joi.string().max(20).optional(), // Optional field, max length 20 characters
    option_banner_overlay: Joi.boolean().required().default(false), // Required boolean field, default false
  });

  return schema.validate(data);
};

export default validateOptions;
