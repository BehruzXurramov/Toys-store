const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../models/admin");
const BlockList = require("../models/block_list");
const Customer = require("../models/customer");
const { blockListValidation } = require("../validations/block_list.validation");

const get = async (req, res) => {
  try {
    const blockLists = await BlockList.findAll({
      include: [Admin, Customer],
    });
    res.send(blockLists);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = blockListValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const blockList = await BlockList.create(value);
    res.status(201).send(blockList);
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = blockListValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const blockList = await BlockList.update(value, {
      where: { id },
      returning: true,
    });
    res.send(blockList[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await BlockList.destroy({ where: { id } });
    res.send({ message: "BlockList entry deleted." });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const blockList = await BlockList.findByPk(id, {
      include: [Admin, Customer],
    });
    res.send(blockList);
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
