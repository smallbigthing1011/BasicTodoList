const express = require("express");
const router = express.Router({ mergeParams: true });
const taskProvider = require("../provider/taskProvider");
const { parseToken, verifyUser } = require("../middlewares/auth");
router.use(parseToken, verifyUser);

//User tạo 1 task mới
router.post("/", async (req, res) => {
  const { content } = req.body;
  const user = req.user;
  const newTask = await taskProvider.insertOneTask({
    content,
    author: user.data._id,
  });
  if (newTask.exit !== 0) {
    return res.status(501).json({ message: newTask.message });
  }
  res.json(newTask);
});

//User view danh sách tasks của mình
router.get("/", async (req, res) => {
  const user = req.user;
  const tasks = await taskProvider.getAllTasksOfAuthor(user.data._id);
  if (tasks.exit !== 0) {
    return res.status(501).json({ message: tasks.message });
  }
  res.json(tasks);
});

//User sửa 1 task content dựa theo Id của task
router.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { content } = req.body;
  const user = req.user;
  const updatedTask = await taskProvider.updateOneTask({
    _id: taskId,
    author: user.data._id,
    content,
  });
  if (updatedTask.exit !== 0) {
    return res.status(501).json({ message: updatedTask.message });
  }
  res.json(updatedTask);
});

//User xóa 1 task dựa theo Id của task
router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const user = req.user;
  const deletedTask = await taskProvider.deleteOneTask({
    _id: taskId,
    author: user.data._id,
  });
  if (deletedTask.exit !== 0) {
    return res.status(501).json({ message: deletedTask.message });
  }
  res.json(deletedTask);
});

module.exports = router;
