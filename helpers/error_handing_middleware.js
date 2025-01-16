const logger = require("../service/logger_service");

module.exports = function (err, req, res, next) {
  logger.error(err);
  return res.status(400).send({ error: err.message });
};
