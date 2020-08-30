require("dotenv").config();
const https = require("https");
const path = require("path");
const fs = require("fs");

const app = require("./server.js");
require("./database.js");

// Server with SSL
// https
//   .createServer(
//     {
//       key: fs.readFileSync(
//         path.join(
//           __dirname,
//           "../..",
//           "my_certs",
//           "ssl.admin.dgbdevelopment.com.key"
//         )
//       ),
//       cert: fs.readFileSync(
//         path.join(
//           __dirname,
//           "../..",
//           "my_certs",
//           "ssl.admin.dgbdevelopment.com.crt"
//         )
//       ),
//     },
//     app
//   )
//   .listen(app.get("port"), () => {
//     console.log("Server on port", app.get("port"));
//   });

// Normal Server
app.listen(app.get("port"), () => {
  console.log("App listening on port: " + app.get("port"));
});
