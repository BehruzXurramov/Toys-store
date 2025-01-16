const Joi = require("joi");

exports.paymentPlanValidation = (data) => {
  const paymentPlanValidate = Joi.object({
    interest_rate: Joi.number().integer().required(),
    months: Joi.number().integer().required(),
  });

  return paymentPlanValidate.validate(data, { abortEarly: false });
};
