const Joi = require("joi");

exports.customerValidation = (data) => {
  const customerValidate = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    phone: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    adress: Joi.string().max(250).required(),
    birthday: Joi.date().required(),
    passport_number: Joi.string().max(10).required(),
  });

  return customerValidate.validate(data, { abortEarly: false });
};
