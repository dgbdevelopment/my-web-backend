const { Router } = require("express");
const router = Router();
const multer = require("../config/multer");
const {
  renderArticles,
  renderNewForm,
  addArticle,
  editArticle,
} = require("../controllers/article.controller");

router.get("/article", renderArticles);

router.get("/article/newarticle", renderNewForm);

router.post("/article/addarticle", multer.single("image"), addArticle);

router.post("/article/edit/:id", editArticle);

module.exports = router;
