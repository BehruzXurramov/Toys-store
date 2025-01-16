const Joi = require("joi");

exports.cartValidation = (data) => {
  const cartValidate = Joi.object({
    customerId: Joi.number().integer().required(),
  });

  return cartValidate.validate(data, { abortEarly: false });
};
