//const { Json } = require("sequelize/types/utils");
const { users } = require("../models");
const post = require("../models/post");
const user = require("../models/user");

//for public access
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content");
};

//loggedin users
exports.userBoard = (req, res) => {
  res.status(200).send("User Cotent");
};

e



