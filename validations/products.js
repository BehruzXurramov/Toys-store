const Joi = require("joi");

exports.productValidation = (data) => {
  const productValidate = Joi.object({
    categoryId: Joi.number().integer().required(),
    name: Joi.string().max(50).required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().integer().required(),
    description: Joi.string().max(2000).required(),
  });

  return productValidate.validate(data, { abortEarly: false });
};
