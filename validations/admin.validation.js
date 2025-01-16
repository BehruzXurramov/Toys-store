const Joi = require("joi");

exports.adminValidation = (data) => {
  const adminValidate = Joi.object({
    first_name: Joi.string().min(2).max(50),
    last_name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(4).max(20),
    is_creator: Joi.boolean().default(false),
    is_active: Joi.boolean().default(false),
  });

  return adminValidate.validate(data, { abortEarly: false });
};
