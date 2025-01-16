const Joi = require("joi");

exports.imageValidation = (data) => {
  const imageValidate = Joi.object({
    productId: Joi.number().integer().required(),
    link: Joi.string().max(250).required(),
  });

  return imageValidate.validate(data, { abortEarly: false });
};
