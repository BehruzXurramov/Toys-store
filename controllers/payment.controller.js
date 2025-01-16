const { errorHandler } = require("../helpers/error_handler");
const Payment = require("../models/payment");
const { paymentValidation } = require("../validations/payment");

const get = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.send(payments);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = paymentValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const payment = await Payment.create(value);
    res.status(201).send(payment);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = paymentValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const payment = await Payment.update(value, {
      where: { id },
      returning: true,
    });
    res.send(payment[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Payment.destroy({ where: { id } });
    res.send({ message: "Payment deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByPk(id);
    res.send(payment);
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
