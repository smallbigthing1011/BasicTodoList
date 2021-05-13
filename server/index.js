const mongoose = require("mongoose");
const app = require("../app/app");
const http = require("http");
const server = http.createServer(app);
const config = require("../config/config");

//Connect với database (mongoose) trước

mongoose
  .connect(config.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongoose is connected!");
    //Sau đó init server
    server.listen(config.serverPort, () => {
      console.log("Server is running on port ", config.serverPort);
    });
  })
  .catch((err) => {
    console.log(err);
  });
