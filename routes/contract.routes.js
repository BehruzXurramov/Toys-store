const {
  get,
  findById,
  add,
  update,
  deleting,
} = require("../controllers/contract.controller");
const adminGuard = require("../guard/admin.guard");
const decodedGuard = require("../guard/decoded.guard");

const router = require("express").Router();

router.get("/", get);
router.get("/:id", findById);
router.post("/", decodedGuard, adminGuard, add);
router.patch("/:id", decodedGuard, adminGuard, update);
router.delete("/:id", decodedGuard, adminGuard, deleting);

module.exports = router;
