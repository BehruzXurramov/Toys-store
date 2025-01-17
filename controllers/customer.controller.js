const { errorHandler } = require("../helpers/error_handler");
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const Jwt = require("../service/jwt_service");
const config = require("config");
const to = require("../helpers/to_promise");
const { customerValidation } = require("../validations/customer");
const SendMail = require("../service/mail_service");
const uuid = require("uuid");
const Cart = require("../models/cart");

const get = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.send(customers);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = customerValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    const activate_link = uuid.v4();
    const customer = await Customer.create({
      ...value,
      password: hashedPassword,
      activate_link,
    });
    await SendMail.sendMailActivateCode(
      customer.email,
      `${config.get("api_url")}/api/customer/activate/${activate_link}`
    );

    res.status(201).send({
      message: "Faollashtirish havolasi emailga yuborildi",
      customer,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = customerValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    const customer = await Customer.update(
      { ...value, password: hashedPassword },
      { where: { id }, returning: true }
    );
    res.send(customer[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.destroy({ where: { id } });
    res.send({ message: "Customer deleted." });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findByPk(id);
    res.send(customer);
  } catch (error) {
    errorHandler(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(400).send({ message: "Email yoki parol xato" });
    }
    if (!customer.is_active) {
      return res.status(400).send({ message: "Customer faollashtirilmagan" });
    }
    const validPassword = bcrypt.compareSync(password, customer.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki parol xato" });
    }

    const payload = {
      id: customer.id,
      role: "customer",
    };

    const tokens = Jwt.generateTokens(payload);
    customer.refresh_token = tokens.refreshToken;
    await customer.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });

    res.send({
      message: "Tizimga xush kelibsiz!",
      customer_id: customer.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).send({ message: "Token topilmadi" });
    }
    const customer = await Customer.update(
      { refresh_token: "" },
      { where: { refresh_token: refreshToken }, returning: true }
    );
    if (!customer) {
      return res.status(400).send({ message: "Bunday tokenli customer yo'q" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "Tizimdan chiqarildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).send({ message: "Token topilmadi" });
    }
    const [error, token] = await to(Jwt.verifyRefreshToken(refreshToken));
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const customer = await Customer.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!customer) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli customer topilmadi" });
    }

    const payload = {
      id: customer.id,
      role: "customer",
    };

    const tokens = Jwt.generateTokens(payload);
    customer.refresh_token = tokens.refreshToken;
    await customer.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });
    res.send({
      message: "Tizimga xush kelibsiz",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activate = async (req, res) => {
  try {
    const link = req.params.link;
    const customer = await Customer.findOne({
      where: { activate_link: link },
    });
    if (!customer) {
      return res.status(401).send({ message: "Bunday customer topilmadi." });
    }
    if (customer.is_active) {
      return res.send({ message: "Customer avval faollashtirilgan" });
    }
    const cart = await Cart.create({ total_price: 0, customerId: customer.id });
    customer.is_active = true;
    await customer.save();
    res.send({
      message: "Customer faollashtirildi",
      is_active: customer.is_active,
      cart: cart.id,
    });
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
  login,
  logout,
  refresh,
  activate,
};
