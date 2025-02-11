const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "no taken in auth",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decodedToken);

    if (!decodedToken) {
      return res.status(400).json({
        message: "Error in decoding token",
      });
    }
    const user = await User.findById(decodedToken.token)
      .populate("followers")
      .populate("threads")
      .populate("replies")
      .populate("reposts");

    if (!user) {
      return res.status(400).json({ message: "No user found!" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({
      message: "Error in authorization",
      error: err.message,
    });
  }
};

module.exports = auth;
