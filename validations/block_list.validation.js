const Joi = require("joi");

exports.blockListValidation = (data) => {
  const blockListValidate = Joi.object({
    customerId: Joi.number().integer().required(),
    reason: Joi.string().max(250).required(),
  });

  return blockListValidate.validate(data, { abortEarly: false });
};
