const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../constants/constants");
const userProvider = require("../provider/userProvider");
const { parseToken, verifyUser } = require("../middlewares/auth");

//User đăng nhập
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await userProvider.getOneUserByUsername(username);
  if (user.exit !== 0) {
    return res.status(401).json({ message: user.message });
  }
  const checkValidPassword = bcrypt.compareSync(password, user.data.password);
  if (!checkValidPassword) {
    return res.status(401).json({ message: "Invalid username or password!" });
  }
  const token = jwt.sign({ userId: user.data._id }, constants.JWT_SECRET);
  res.json({ token });
});

//User đăng ký
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await userProvider.insertOneUser({ username, password });
  if (newUser.exit !== 0) {
    return res.status(400).json({ message: newUser.message });
  }
  res.json(newUser.data);
});

//User view tài khoản của mình
router.get("/me", parseToken, verifyUser, async (req, res) => {
  const user = req.user;
  res.json(user);
});

module.exports = router;
