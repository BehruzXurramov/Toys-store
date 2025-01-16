const Joi = require("joi");

exports.paymentPlanValidation = (data) => {
  const paymentPlanValidate = Joi.object({
    interest_rate: Joi.number().integer().required(),
    months: Joi.number().integer().required(),
    remaining_balance: Joi.number.required(),
  });

  return paymentPlanValidate.validate(data, { abortEarly: false });
};
