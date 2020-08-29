const { Router } = require("express");
const router = Router();
const {
  renderFormLogin,
  renderUser,
  renderFormRegister,
  addUser,
} = require("../controllers/user.controller");

router.get("/user", renderFormLogin);
router.post("/user/login", renderUser);
router.get("/user/register", renderFormRegister);
router.post("/user/newuser", addUser);

module.exports = router;
