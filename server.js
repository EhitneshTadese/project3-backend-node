const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Correct the corsOptions object and typo in origin
var corsOptions = {
  origin: "http://localhost:8081" // Corrected from orgin to origin
};

// Correct the typo: app.use instead of app.user
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Resume Builder application." });
});

require("./app/routes/resume.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); // Fixed template literal
});
