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

const router = require("express").Router();

router.get("/", get);
router.get("/:id", findById);
router.post("/", add);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.patch("/:id", update);
router.delete("/:id", deleting);

module.exports = router;
