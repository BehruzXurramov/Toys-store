const Joi = require("joi");

exports.contractValidation = (data) => {
  const contractValidate = Joi.object({
    cartId: Joi.number().integer().required(),
    paymentPlanId: Joi.number().integer().required(),
    first_payment: Joi.number().precision(2).required(),
    day_of_month: Joi.number().integer().max(31).required(),
    other_side: Joi.string(),
    first_payment_rate: Joi.number().required(),
  });

  return contractValidate.validate(data, { abortEarly: false });
};
