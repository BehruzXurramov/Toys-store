const {
  get,
  findById,
  add,
  update,
  deleting,
} = require("../controllers/review.controller");
const customerGuard = require("../guard/customer.guard");
const decodedGuard = require("../guard/decoded.guard");

const router = require("express").Router();

router.get("/", get);
router.get("/:id", findById);
router.post("/", decodedGuard, customerGuard, add);
router.patch("/:id", decodedGuard, customerGuard, update);
router.delete("/:id", decodedGuard, customerGuard, deleting);

module.exports = router;
