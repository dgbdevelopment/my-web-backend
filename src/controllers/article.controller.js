const Article = require("../models/article");

articleController = {};

articleController.renderArticles = async (req, res) => {
  const articles = await Article.find();
  res.render("pages/article", {
    title: "Admin Panel - Todos los artículos",
    articles,
  });
};

articleController.renderNewForm = (req, res) => {
  res.render("pages/article", {
    title: "Admin Panel - Proyecto nuevo",
    newarticle: true,
  });
};

articleController.addArticle = async (req, res) => {
  const { title, subtitle, description, content } = req.body;
  const image = req.file.filename;
  const newArticle = new Article({
    title,
    subtitle,
    description,
    content,
    image,
  });
  try {
    await newArticle.save();
    req.flash("success_msg", "Artículo añadido correctamente");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

articleController.editArticle = async (req, res) => {
  const formdata = await Article.findById(req.params.id);
  res.render("pages/article", { formdata });
};

module.exports = articleController;
