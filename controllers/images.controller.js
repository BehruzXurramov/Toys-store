const { errorHandler } = require("../helpers/error_handler");
const Image = require("../models/images");
const { imageValidation } = require("../validations/images");

const get = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.send(images);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = imageValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const image = await Image.create(value);
    res.status(201).send(image);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = imageValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const image = await Image.update(
      value,
      { where: { id }, returning: true }
    );
    res.send(image[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Image.destroy({ where: { id } });
    res.send({ message: "Rasm o'chirildi." });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.findByPk(id);
    res.send(image);
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
