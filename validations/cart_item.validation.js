const Joi = require("joi");

exports.cartItemValidation = (data) => {
  const cartItemValidate = Joi.object({
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
  });

  return cartItemValidate.validate(data, { abortEarly: false });
};
