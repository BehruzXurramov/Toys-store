const { errorHandler } = require("../helpers/error_handler");
const Review = require("../models/review");
const { reviewValidation } = require("../validations/review");

const get = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.send(reviews);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = reviewValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const review = await Review.create(value);
    res.status(201).send(review);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = reviewValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const review = await Review.update(value, {
      where: { id },
      returning: true,
    });
    res.send(review[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Review.destroy({ where: { id } });
    res.send({ message: "Review deleted" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findByPk(id);
    res.send(review);
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
