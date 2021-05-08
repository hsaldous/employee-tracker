const express = require("express");
const path = require("path");
const tools = require("./private/tools");
const db = require("./private/db");


// Express
var app = express();
var PORT = process.env.PORT || 3500;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("private"));

require("./private/routes")(app);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// MySQL Connection
db.connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.connection.threadId);
  tools.cmsMain();
});