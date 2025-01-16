const Joi = require("joi");

exports.categoryValidation = (data) => {
  const categoryValidate = Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(250),
  });

  return categoryValidate.validate(data, { abortEarly: false });
};
