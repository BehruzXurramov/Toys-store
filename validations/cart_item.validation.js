const Joi = require("joi");

exports.cartItemValidation = (data) => {
  const cartItemValidate = Joi.object({
    cartId: Joi.number().integer().required(),
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
  });

  return cartItemValidate.validate(data, { abortEarly: false });
};
