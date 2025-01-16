const Joi = require("joi");

exports.reviewValidation = (data) => {
  const reviewValidate = Joi.object({
    productId: Joi.number().integer().required(),
    customerId: Joi.number().integer().required(),
    comment: Joi.string().max(250).required(),
    rating: Joi.number().integer().max(5).required(),
    is_anonymous: Joi.boolean().required(),
  });

  return reviewValidate.validate(data, { abortEarly: false });
};
