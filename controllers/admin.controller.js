const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const Jwt = require("../service/jwt_service");
const config = require("config");
const to = require("../helpers/to_promise");
const { adminValidation } = require("../validations/admin.validation");
const uuid = require("uuid");
const SendMail = require("../service/mail_service");

const get = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.send(admins);
  } catch (error) {
    errorHandler(error, res);
  }
};

const add = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    const admin = await Admin.create({
      ...value,
      password: hashedPassword,
    });

    res.status(201).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { error, value } = adminValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    const admin = await Admin.update(
      { ...value, password: hashedPassword },
      { where: { id }, returning: true }
    );
    res.send(admin[1][0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleting = async (req, res) => {
  try {
    const id = req.params.id;
    await Admin.destroy({ where: { id } });

    res.send({ message: "Admin deleted." });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id);
    res.send(admin);
  } catch (error) {
    errorHandler(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      role: "admin",
    };

    const tokens = Jwt.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_token_ms"),
    });

    res.send({
      message: "Tizimga xush kelibsiz",
      admin_id: admin.id,
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
    const admin = await Admin.update(
      { refresh_token: "" },
      { where: { refresh_token: refreshToken }, returning: true }
    );
    if (!admin) {
      return res.status(400).send({ message: "Bunday tokenli admin yo'q" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "Tizimdan chiqdingiz" });
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
    const admin = await Admin.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!admin) {
      return res.status(400).send({ message: "Bunday tokenli admin yo'q" });
    }
    const payload = {
      id: admin.id,
      email: admin.email,
      role: "admin",
    };

    const tokens = Jwt.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
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

module.exports = {
  get,
  add,
  update,
  deleting,
  findById,
  login,
  logout,
  refresh,
};
