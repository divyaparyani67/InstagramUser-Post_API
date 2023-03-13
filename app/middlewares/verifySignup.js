const db = require("../models");
const user = require("../models/user");
const Post = db.posts;
const User = db.users;

// checking for username and email
checkDuplicateUsernameOrEmail = (req, res, next) => {
  //username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "failers! Username is already in use!",
      });
      return;
    }

    //email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
