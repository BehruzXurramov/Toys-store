const { errorHandler } = require("../helpers/error_handler");
const Contract = require("../models/contract");
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
    const contract = await Contract.create(value);
    res.status(201).send(contract);
  } catch (error) {
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
