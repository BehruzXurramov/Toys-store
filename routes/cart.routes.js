const {
  get,
  findById,
  add,
  update,
  deleting,
} = require("../controllers/cart.controller");
const customerGuard = require("../guard/customer.guard");
const decodedGuard = require("../guard/decoded.guard");

const router = require("express").Router();

router.get("/", decodedGuard, customerGuard, get);
router.get("/:id", decodedGuard, customerGuard, findById);
router.post("/", decodedGuard, customerGuard, add);
router.patch("/:id", decodedGuard, customerGuard, update);
router.delete("/:id", decodedGuard, customerGuard, deleting);

module.exports = router;
