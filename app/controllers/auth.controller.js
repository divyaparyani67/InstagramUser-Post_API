const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Post = db.posts;

const Op = db.Sequelize.Op; //object properties for queries with operators

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


//user  signup function created
exports.signup = (req, res) => {
  //Save User to databse

  User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: "User was registered successfully!" });
      return user;
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// after sign up user sign in fubction will be used
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,  // checks the username
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) { // checks the password
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, //24 hours
    });
    // need to add code to get user information & access token
  });
}