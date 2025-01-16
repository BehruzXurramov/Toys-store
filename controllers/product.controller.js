const { errorHandler } = require("../helpers/error_handler");
const Product = require("../models/products");
const { productValidation } = require("../validations/products");

const get = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = productValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const product = await Product.create(value);
    res.status(201).send(product);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = productValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const product = await Product.update(value, {
      where: { id },
      returning: true,
    });
    res.send(product[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.destroy({ where: { id } });
    res.send({ message: "Product deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    res.send(product);
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
