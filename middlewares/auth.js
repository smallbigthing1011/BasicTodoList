const jwt = require("jsonwebtoken");
const constants = require("../constants/constants");
const userProvider = require("../provider/userProvider");

//Function để xử lý token và lấy data từ token
const parseToken = async (req, res, next) => {
  const token = req.headers.token;
  try {
    const tokenData = jwt.verify(token, constants.JWT_SECRET);
    // if (!tokenData) {
    //   return res.status(400).json({ message: "Invalid token" });
    // }
    const user = await userProvider.getOneUserById(tokenData.userId);
    if (user.exit !== 0) {
      return res.status(401).json({ message: user.message });
    }
    req.user = user;
    next();
  } catch (error) {
    req.user = null;
    console.log(error);
  }
};

//Function để lưu lấy user info sau khi đã xử lý token
const verifyUser = async (req, res, next) => {
  const user = req.user;
  if (user) return next();
  res.status(401).json({ message: "Unauthorized!" });
};

module.exports = { parseToken, verifyUser };
