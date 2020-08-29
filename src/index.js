require("dotenv").config();

const app = require("./server.js");
require("./database.js");

app.listen(app.get("port"), () => {
  console.log("App listening on port: " + app.get("port"));
});
