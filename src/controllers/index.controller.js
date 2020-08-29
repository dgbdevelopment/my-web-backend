indexController = {};

indexController.renderIndex = (req, res) => {
  //Aqui vendría para averiguar si algun usuario logueado

  res.render("pages/index", {
    title: "DGB Development - Admin Panel",
    // user,
  });
};

module.exports = indexController;
