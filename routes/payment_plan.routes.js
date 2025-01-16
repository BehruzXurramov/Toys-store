const {
  get,
  findById,
  add,
  update,
  deleting,
} = require("../controllers/payment_plan.controller");

const router = require("express").Router();

router.get("/", get);
router.get("/:id", findById);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", deleting);

module.exports = router;
