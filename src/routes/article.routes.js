const { Router } = require("express");
const router = Router();
const { renderArticle } = require("../controllers/article.controller");

router.get("/article", renderArticle);

module.exports = router;
