const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const userRouter = require("../routes/userRouter");
const taskRouter = require("../routes/taskRouter");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

module.exports = app;
