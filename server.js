// import statements
const sequelize = require("sequelize");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const db = require("./app/models");
const cors = require("cors");
const { json } = require("body-parser");
const controller = require ("./app/controllers/user.controller");

dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

//middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json()); //parse reques content type json
app.use(bodyParser.urlencoded({ extended: true })); //parse reques content x-www-form-urlencoded

//simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome to instagram api" });
});

db.sequelize.sync(); // sync function created

//routes

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//seting port to listen the requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}.`);
});

// checking the database connection
async function test() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
test();
