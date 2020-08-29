const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

//Initializations

//Settings

app.set("port", process.env.PORT || 3200);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash({}));

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/project.routes"));
app.use(require("./routes/article.routes"));

//Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
