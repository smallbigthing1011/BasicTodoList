const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const constants = require("../constants/constants");
const User = require("../models/User");

//Đây là chỗ để lấy data (data provider) dành cho User
//Ở đây t có xử lý logic 1 chút, nếu theo 1 architecture thì ko nên xử lý logic ở đây, mà phải tạo 1 usecase folder

//Function để lấy 1 User dựa theo Id
const getOneUserById = async (data) => {
  if (!mongoose.isValidObjectId(data)) {
    return { exit: 1, message: "Invalid Id type!" };
  }
  const user = await User.findById(data);
  if (!user) {
    return { exit: 2, message: "Inexisted User!" };
  }
  return { exit: 0, data: user };
};

//Function để lấy 1 User theo username (vì username t set là unique ở Model)
const getOneUserByUsername = async (data) => {
  const user = await User.findOne({ username: data });
  if (!user) {
    return { exit: 1, message: "Invalid username or password!" };
  }
  return { exit: 0, data: user };
};

//Function để thêm 1 User
const insertOneUser = async (data) => {
  const existedUser = await User.findOne({ username: data.username });
  if (existedUser) {
    return { exit: 1, message: "Already existed username!" };
  }
  const hashPassword = bcrypt.hashSync(data.password, constants.SALT_ROUNDS);
  const user = await User.create({
    username: data.username,
    password: hashPassword,
  });
  if (!user) {
    return { exit: 2, message: "Unable to create User!" };
  }
  return { exit: 0, data: user };
};

module.exports = { getOneUserById, getOneUserByUsername, insertOneUser };
