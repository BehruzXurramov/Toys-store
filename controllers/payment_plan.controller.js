const { errorHandler } = require("../helpers/error_handler");
const PaymentPlan = require("../models/payment_plan");
const { paymentPlanValidation } = require("../validations/payment_plan");

const get = async (req, res) => {
  try {
    const plans = await PaymentPlan.findAll();
    res.send(plans);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = paymentPlanValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const plan = await PaymentPlan.create(value);
    res.status(201).send(plan);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = paymentPlanValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const plan = await PaymentPlan.update(value, {
      where: { id },
      returning: true,
    });
    res.send(plan[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await PaymentPlan.destroy({ where: { id } });
    res.send({ message: "Payment plan deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const plan = await PaymentPlan.findByPk(id);
    res.send(plan);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  get,
  add,
  update,
  deleting,
  findById,
};
