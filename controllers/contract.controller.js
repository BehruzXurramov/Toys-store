const { errorHandler } = require("../helpers/error_handler");
const Cart = require("../models/cart");
const Contract = require("../models/contract");
const PaymentPlan = require("../models/payment_plan");
const { contractValidation } = require("../validations/contract");

const get = async (req, res) => {
  try {
    const contracts = await Contract.findAll();
    res.send(contracts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = contractValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const plan = await PaymentPlan.findByPk(value.paymentPlanId);
    const cart = await Cart.findByPk(value.cartId);

    if (cart.total_price < value.first_payment) {
      return res
        .status(400)
        .send({ message: "Siz ortiqcha to'lov qila olmaysiz" });
    }
    if (
      (value.first_payment / cart.total_price) * 100 <
      value.first_payment_rate
    ) {
      return res.status(400).send({ message: "Birinchi to'lov miqdori kam" });
    }

    const summa =
      (cart.total_price - value.first_payment) * (1 + plan.interest_rate / 100);

    const contract = await Contract.create({
      ...value,
      remaining_balance: summa,
      monthly_payment: summa / plan.months,
      adminId: req.decoded.id,
    });
    cart.is_active = false;
    await cart.save();
    console.log(req.decoded.id);
    
    await Cart.create({ customerId: cart.customerId });

    res.status(201).send(contract);
  } catch (error) {
    console.log(error);
    
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = contractValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const contract = await Contract.update(value, {
      where: { id },
      returning: true,
    });
    res.send(contract[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Contract.destroy({ where: { id } });
    res.send({ message: "Contract deleted." });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contract.findByPk(id);
    res.send(contract);
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
