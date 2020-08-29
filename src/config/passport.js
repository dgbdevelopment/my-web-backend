const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  //Es el nombre que le he puesto a la Estrategia
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      const userFound = await User.findOne({ username });
      if (userFound) {
        if (await userFound.matchPassword(password)) {
          return done(null, userFound);
        } else {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
      }
      return done(null, false, { message: "Usuario no encontrado" });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
