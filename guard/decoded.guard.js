const to = require("../helpers/to_promise");
const Jwt = require("../service/jwt_service");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res
        .status(401)
        .send({ message: "Siz ro'yxatdan o'tmagansiz" });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer !== "Bearer" || !token) {
      return res
        .status(401)
        .send({ message: "Siz ro'yxatdan o'tmagansiz (token berilmagan)" });
    }
    const [error, decoded] = await to(Jwt.verifyAccessToken(token));
    if (error) {
      return res.status(403).send({ message: error.message });
    }
    req.decoded = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ message: error.message });
  }
};
