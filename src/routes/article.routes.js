const { Router } = require("express");
const router = Router();
const multer = require("../config/multer");
const {
  getAllArticles,
  getArticle,
  renderArticles,
  renderArticle,
  renderNewForm,
  addArticle,
  editArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  orderArticles,
  sendResults,
} = require("../controllers/article.controller");

router.get("/article", renderArticles);

router.get("/article/render/:id", renderArticle);

router.get("/article/getarticle/:id", getArticle);

router.get("/article/getall", getAllArticles);

router.get("/article/newarticle", renderNewForm);

router.post("/article/addarticle", multer.single("image"), addArticle);

router.post("/article/edit/:id", editArticle);

router.put("/article/update/:id", multer.single("image"), updateArticle);

router.delete("/article/delete/:id", deleteArticle);

router.post("/article/search", searchArticles);

router.get("/article/searching/:query?", sendResults);

router.get("/article/search/:order/:query?", orderArticles);

module.exports = router;
