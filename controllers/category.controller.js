const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category");
const { categoryValidation } = require("../validations/category");

const get = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const category = await Category.create(value);
    res.status(201).send(category);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const category = await Category.update(value, {
      where: { id },
      returning: true,
    });
    res.send(category[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.destroy({ where: { id } });
    res.send({ message: "Category deleted." });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    res.send(category);
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
