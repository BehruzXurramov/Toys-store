const {
  get,
  findById,
  add,
  update,
  deleting,
  login,
  logout,
  refresh,
} = require("../controllers/admin.controller");
const adminGuard = require("../guard/admin.guard");
const creatorGuard = require("../guard/creator.guard");
const decodedGuard = require("../guard/decoded.guard");
const selfGuard = require("../guard/self.guard");

const router = require("express").Router();

router.get("/", decodedGuard, adminGuard, get);
router.get("/:id", decodedGuard, adminGuard, selfGuard, findById);
router.post("/", decodedGuard, adminGuard, creatorGuard, add);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.patch("/:id", decodedGuard, adminGuard, creatorGuard, update);
router.delete("/:id", decodedGuard, adminGuard, creatorGuard, deleting);

module.exports = router;
