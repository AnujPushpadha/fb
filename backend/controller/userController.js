const model = require("../models/user");

const getUser = async (req, res) => {
  try {
    // console.log("anuj");
    const user = await model.find();
    console.log(user);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "usernot found",
    });
  }
};

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await model.create({
      email,
      password,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.data,
    });
  }
};

const findUserByEmail = async (req, res) => {
  try {
    const token = { key: "12345" };
    const { email, password } = req.body;
    const user = await model.findOne({ email });

    if (user) {
      res.status(200).json({
        status: "success",
        data: { token },
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getUser, postUser, findUserByEmail };
