const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });
