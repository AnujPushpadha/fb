const express = require("express");

const {
  getUser,
  postUser,
  findUserByEmail,
} = require("../controller/userController");

const router = express.Router();

router.route("/").get(getUser).post(postUser);
router.route("/login").post(findUserByEmail);

module.exports = router;
