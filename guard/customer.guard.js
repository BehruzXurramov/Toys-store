module.exports = async function (req, res, next) {
  try {
    if (req.decoded.role != "customer") {
      return res.status(403).send({ message: "Sizda bunday vakolat yo'q" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ message: error.message });
  }
};
