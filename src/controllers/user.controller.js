const User = require("../models/user");

userController = {};

userController.renderFormLogin = (req, res) => {
  res.render("pages/index", {
    title: "Admin panel - Login",
  });
};

userController.renderUser = async (req, res) => {
  const { username, password } = req.body;
  const userFound = await User.findOne({ name: username });
  if (userFound) {
    if (await userFound.matchPassword(password)) {
      res.render("pages/index", {
        title: "DGB Development - Admin Panel",
        user: userFound,
      });
    }
  }
  req.flash("error_msg", "Usuario no encontrado");
  res.redirect("/");
};

userController.renderFormRegister = (req, res) => {
  res.render("pages/index", {
    title: "Admin panel - Register",
    register: true,
    username: "",
    password: "",
    confirm_password: "",
  });
};

userController.addUser = async (req, res) => {
  const { username, password, confirm_password } = req.body;
  const regex = new RegExp(/^[a-zA-Z]{0,36}$/i);
  let errors = [];
  const users = await User.find();
  if (users.length) {
    errors.push("Límite máximo de usuarios registrados");
  }
  if (username.length < 4 || password.length < 4) {
    errors.push("Los campos deben contener al menos 4 carcateres");
  }
  if (!regex.test(username)) {
    errors.push("El usuario solo puede contener letras sin espacios");
  }
  if (password != confirm_password) {
    errors.push(" Las contraseñas no coinciden");
  }
  //Si hay errores volvemos al formulario de registro
  if (errors.length > 0) {
    res.render("pages/index", {
      title: "Admin panel - Register",
      register: true,
      error_msg: errors,
      username,
      password,
      confirm_password,
    });
  } else {
    //Si no hay errores almacenamos usuario y lo hacemos loguear
    const newUser = new User({ name: username, password });
    newUser.password = await newUser.encryptPassword(password);
    try {
      await newUser.save();
      req.flash("success_msg", "Usuario creado correctamente. Haz login");
      res.redirect("/user");
    } catch (err) {
      req.flash("error_msg", "Ha ocurrido un error en el registro");
      res.redirect("/user/register");
    }
  }
};

module.exports = userController;
