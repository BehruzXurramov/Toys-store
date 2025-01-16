const { errorHandler } = require("../helpers/error_handler");
const Cart = require("../models/cart");
const CartItem = require("../models/cart_item");
const Customer = require("../models/customer");
const Product = require("../models/products");
const { cartValidation } = require("../validations/cart");

const get = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      include: [Customer, { model: CartItem, include: Product }],
    });

    res.send(carts);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = cartValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const cart = await Cart.create(value);
    res.status(201).send(cart);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = cartValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const cart = await Cart.update(value, {
      where: { id },
      returning: true,
    });
    res.send(cart[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Cart.destroy({ where: { id } });
    res.send({ message: "Cart deleted." });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findByPk(id);
    res.send(cart);
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
