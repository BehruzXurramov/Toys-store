module.exports = async function (req, res, next) {
  try {
    const id = req.params.id;

    if (req.decoded.id != id) {
      return res.status(403).send({ message: "Sizda bunday vakolat yo'q" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ message: error.message });
  }
};
