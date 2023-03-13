//const { Json } = require("sequelize/types/utils");
const { users } = require("../models");
const post = require("../models/post");
const user = require("../models/user");

exports.createPost = (req, res) => {
  //(userId, comments, likes)
  Post.create({
    comments: req.bod.comments,
    likes: req.body.likes,
    userId: req.body.userId,
  })
    .then((user) => {
      res.send({ message: "created post:" });
      return user;
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//create and save new comments
exports.findUserById = (userId) => {
  return user
    .findByPk(userId, { include: ["post"] })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log(">>Error while finding  user", err);
    });
};

// get  the post for given user
exports.findPostById = (id) => {
  return Post.findByPk(id, { include: ["user"] })
    .then((post) => {
      return post;
    })
    .catch((err) => {
      console.log(">> Error while finding post: ", err);
    });
};

// get the post for a given post id
exports.findPostById = (id) => {
  return Post.findByPk(id, { include: ["post"] })
    .then((post) => {
      return post;
    })
    .catch((err) => {
      console.log(">> Error while finding post: ", err);
    });
};

//get all tutorials inclue posts

exports.findAll = () => {
  return user
    .findAll({
      include: ["post"],
    })
    .then((users) => {
      return users;
    });
};
