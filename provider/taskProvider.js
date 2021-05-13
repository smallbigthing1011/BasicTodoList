const mongoose = require("mongoose");
const Task = require("../models/Task");

//Đây là chỗ để lấy data (data provider) dành cho User
//Ở đây t có xử lý logic 1 chút, nếu theo 1 architecture thì ko nên xử lý logic ở đây, mà phải tạo 1 usecase folder

//Funciton để thêm 1 Task cho User đó
const insertOneTask = async (data) => {
  const newTask = await Task.create({
    content: data.content,
    author: data.author,
  });
  if (!newTask) {
    return { exit: 1, message: "Unable to process a new task!" };
  }
  return { exit: 0, data: newTask };
};

//Function để list các tasks theo User
const getAllTasksOfAuthor = async (data) => {
  const tasks = await Task.find({ author: data });
  const count = await Task.countDocuments({ author: data });
  if (!tasks) {
    return { exit: 1, message: "No exsited tasks!" };
  }
  return {
    exit: 0,
    data: {
      tasks,
      number: count,
    },
  };
};

//Function để sửa 1 task theo task Id và User Id
const updateOneTask = async (data) => {
  if (!mongoose.isValidObjectId(data._id)) {
    return { exit: 2, message: `Invalid Id: ${data._id}` };
  }
  const updatedTask = await Task.findOneAndUpdate(
    { _id: data._id, author: data.author },
    { content: data.content },
    { new: true }
  );
  if (!updatedTask) {
    return { exit: 1, message: `Task ${data._id} is not existed!` };
  }
  return { exit: 0, data: updatedTask };
};

//Function để xóa 1 task theo task Id và User Id
const deleteOneTask = async (data) => {
  if (!mongoose.isValidObjectId(data._id)) {
    return { exit: 2, message: `Invalid Id: ${data._id}` };
  }
  const deletedTask = await Task.findOneAndDelete({
    _id: data._id,
    author: data.author,
  });
  if (!deletedTask) {
    return { exit: 1, message: `Task ${data._id} is not existed!` };
  }
  const newList = await Task.find({ author: data.author });
  return {
    exit: 0,
    data: {
      deletedTask,
      tasks: newList,
    },
  };
};

module.exports = {
  insertOneTask,
  getAllTasksOfAuthor,
  updateOneTask,
  deleteOneTask,
};
