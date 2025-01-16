const Joi = require("joi");

exports.paymentValidation = (data) => {
  const paymentValidate = Joi.object({
    contractId: Joi.number().integer().required(),
    amount_paid: Joi.number().precision(2).required(),
  });

  return paymentValidate.validate(data, { abortEarly: false });
};
