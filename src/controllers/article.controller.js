articleController = {};

articleController.renderArticle = (req, res) => {
  res.render("pages/article", {
    title: "Admin Panel - Blog",
    text: "Página de artículos",
  });
};

module.exports = articleController;
