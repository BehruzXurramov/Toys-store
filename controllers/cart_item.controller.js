const { errorHandler } = require("../helpers/error_handler");
const CartItem = require("../models/cart_item");
const { cartItemValidation } = require("../validations/cart_item.validation");

const get = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    res.send(cartItems);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = cartItemValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const cartItem = await CartItem.create(value);
    res.status(201).send(cartItem);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = cartItemValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const cartItem = await CartItem.update(value, {
      where: { id },
      returning: true,
    });
    res.send(cartItem[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await CartItem.destroy({ where: { id } });
    res.send({ message: "Cart item deleted." });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id);
    res.send(cartItem);
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
