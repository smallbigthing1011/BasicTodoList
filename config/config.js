const constants = require("../constants/constants");
const status = 0;

switch (status) {
  case 0:
    module.exports = {
      uri: "mongodb://localhost:27017/todolist",
      serverPort: constants.PORT,
    };
    break;
  case 1:
    //Ở đây nếu như có connect tới Cloud thì làm 1 cái config tương tự như case 0, đổi uri
    break;
  default:
    break;
}
