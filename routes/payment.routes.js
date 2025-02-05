const {
  get,
  findById,
  add,
  update,
  deleting,
} = require("../controllers/payment.controller");
const adminGuard = require("../guard/admin.guard");
const customerGuard = require("../guard/customer.guard");
const decodedGuard = require("../guard/decoded.guard");

const router = require("express").Router();

router.get("/", decodedGuard, customerGuard, get);
router.get("/:id", decodedGuard, customerGuard, findById);
router.post("/", decodedGuard, adminGuard, add);
router.patch("/:id", decodedGuard, adminGuard, update);
router.delete("/:id", decodedGuard, adminGuard, deleting);

module.exports = router;
