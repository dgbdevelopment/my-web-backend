const { Router } = require("express");
const router = Router();
const { main } = require("../controllers/mail.controller");

router.post("/mail", main);

module.exports = router;
