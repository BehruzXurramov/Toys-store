const {
  get,
  findById,
  add,
  update,
  deleting,
} = require("../controllers/block_list.controller");
const adminGuard = require("../guard/admin.guard");
const decodedGuard = require("../guard/decoded.guard");

const router = require("express").Router();

router.get("/", decodedGuard, adminGuard, get);
router.get("/:id", decodedGuard, adminGuard, findById);
router.post("/", decodedGuard, adminGuard, add);
router.patch("/:id", decodedGuard, adminGuard, update);
router.delete("/:id", decodedGuard, adminGuard, deleting);

module.exports = router;
