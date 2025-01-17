const Joi = require("joi");

exports.customerValidation = (data) => {
  const customerValidate = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    phone: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
    adress: Joi.string().max(250).required(),
    birthday: Joi.date().required(),
    passport_number: Joi.string().max(9).required(),
  });

  return customerValidate.validate(data, { abortEarly: false });
};
