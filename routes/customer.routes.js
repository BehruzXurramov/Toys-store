const {
  get,
  findById,
  add,
  update,
  deleting,
  activate,
  login,
  logout,
  refresh,
} = require("../controllers/customer.controller");
const adminGuard = require("../guard/admin.guard");
const customerGuard = require("../guard/customer.guard");
const decodedGuard = require("../guard/decoded.guard");
const selfGuard = require("../guard/self.guard");

const router = require("express").Router();

router.get("/", decodedGuard, adminGuard, get);
router.get("/:id", decodedGuard, customerGuard, selfGuard, findById);
router.get("/activate/:link", activate);
router.post("/", add);
router.post("/login", login);
router.post("/logout", decodedGuard, customerGuard, logout);
router.post("/refresh", decodedGuard, customerGuard, refresh);
router.patch("/:id", decodedGuard, customerGuard, selfGuard, update);
router.delete("/:id", decodedGuard, adminGuard, deleting);

module.exports = router;
