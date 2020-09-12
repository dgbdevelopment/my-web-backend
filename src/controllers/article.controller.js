const Article = require("../models/article");
const fs = require("fs-extra");
const path = require("path");
const { CLIENT_RENEG_LIMIT } = require("tls");

articleController = {};

articleController.getAllArticles = async (req, res) => {
  const articles = await Article.find();
  res.send({ articles });
};

articleController.renderArticles = async (req, res) => {
  const articles = await Article.find();
  res.render("pages/article", {
    title: "Admin Panel - Todos los artículos",
    articles,
  });
};

articleController.getArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findById(id);
    res.send({ article });
  } catch (err) {
    console.log(err);
  }
};

articleController.renderArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findById(id);
    res.render("pages/article", { title: article.title, article });
  } catch (err) {
    console.log(err);
  }
};

articleController.renderNewForm = (req, res) => {
  res.render("pages/article", {
    title: "Admin Panel - Artículo nuevo",
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

articleController.updateArticle = async (req, res) => {
  const { title, subtitle, description, content } = req.body;
  let image = undefined;
  if (req.file) {
    image = req.file.filename;
  }
  try {
    if (image) {
      await Article.findByIdAndUpdate(
        req.params.id,
        {
          title,
          subtitle,
          description,
          content,
          image,
        },
        async (err, result) => {
          if (err) {
            console.log(err.message);
          } else {
            await fs.unlink(
              path.resolve("src/public/assets/img/imguploads", result.image)
            );
          }
        }
      );
    } else {
      await Article.findByIdAndUpdate(req.params.id, {
        title,
        subtitle,
        description,
        content,
      });
    }
    req.flash("success_msg", "Artículo actualizado correctamente");
  } catch (err) {
    req.flash("error_msg", "Error al actualizar artículo");
  }
  res.redirect("/article");
};

articleController.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id, async (err, result) => {
    if (err) req.flash("error_msg", "No se ha podido eliminar el artículo");
    else {
      await fs.unlink(
        path.resolve("src/public/assets/img/imguploads", result.image)
      );
    }
    req.flash("success_msg", "Artículo eliminado correctamente");
    res.redirect("/article");
  });
};

articleController.searchArticles = async (req, res) => {
  console.log(req.headers.host.includes("localhost:3200" || "admin"));
  const { search } = req.body;
  const regex = new RegExp(search, "i");
  try {
    const articles = await Article.find({
      $or: [
        { title: regex },
        { description: regex },
        { subtitle: regex },
        { content: regex },
      ],
    });
    if (articles.length <= 0) {
      req.flash(
        "error_msg",
        'No se han encontrado artículos que contengan "' + search + '"'
      );
      res.redirect("/article");
    } else {
      res.render("pages/article", {
        articles,
        success_msg: 'Artículos encontrados que contienen "' + search + '"',
        query: search,
      });
    }
  } catch (err) {
    req.flash("error_msg", "Algo ha fallado al hacer la búsqueda");
    res.redirect("/article");
  }
};

articleController.orderArticles = async (req, res) => {
  const { order, query } = req.params;
  console.log(query);
  if (!query || query == "") {
    console.log("ENTRA????");
    const articles = await Article.find().sort({ createdAt: order });
    res.render("pages/article", {
      title: "Admin Panel - Búsqueda de artículos",
      articles,
      query: null,
    });
  } else {
    const regex = new RegExp(query, "i");
    try {
      const articles = await Article.find({
        $or: [
          { title: regex },
          { description: regex },
          { subtitle: regex },
          { content: regex },
        ],
      }).sort({ createdAt: order });
      if (articles.length <= 0) {
        req.flash(
          "error_msg",
          'No se han encontrado artículos que contengan "' + query + '"'
        );
        res.redirect("/article");
      } else {
        res.render("pages/article", {
          title: "Admin Panel - Búsqueda de artículos",
          articles,
          success_msg: 'Artículos ordenados que contienen "' + query + '"',
          query,
        });
      }
    } catch (err) {
      req.flash("error_msg", "Algo ha fallado al ordenar la búsqueda");
      res.redirect("/article");
    }
  }
};

module.exports = articleController;
