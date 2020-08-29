const { Router } = require("express");
const router = Router();
const {
  renderFormLogin,
  loginUser,
  renderFormRegister,
  addUser,
  logoutUser,
} = require("../controllers/user.controller");

router.get("/user", renderFormLogin);
router.post("/user/login", loginUser);
router.get("/user/register", renderFormRegister);
router.post("/user/adduser", addUser);
router.get("/user/logout", logoutUser);

module.exports = router;
