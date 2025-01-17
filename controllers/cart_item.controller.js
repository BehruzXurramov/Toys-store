const { errorHandler } = require("../helpers/error_handler");
const Cart = require("../models/cart");
const CartItem = require("../models/cart_item");
const Product = require("../models/products");
const { cartItemValidation } = require("../validations/cart_item.validation");

const get = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        customerId: req.decoded.id,
        is_active: true,
      },
    });
    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });
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
    const cart = await Cart.findOne({
      where: {
        customerId: req.decoded.id,
        is_active: true,
      },
    });
    const product = await Product.findByPk(value.productId);
    if (product.quantity < value.quantity) {
      return res.status(400).send({
        message: "Maxsulotlar soni cheklangan",
        product_quantity: product.quantity,
      });
    }
    const cartItem = await CartItem.create({ ...value, cartId: cart.id });
    cart.total_price = parseFloat(cart.total_price) + parseFloat(product.price) * value.quantity;
    await cart.save();
    product.quantity -= value.quantity;
    await product.save();
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
    const cart = await Cart.findOne({
      where: {
        customerId: req.decoded.id,
        is_active: true,
      },
    });
    const cartItem = await CartItem.findByPk(id);
    if (cart.id != cartItem.cartId) {
      return res.status(403).send({ message: "Bu sizniki emas" });
    }
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
