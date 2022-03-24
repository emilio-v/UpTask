import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

const addTask = async (req, res) => {
  const { project } = req.body;

  const validProject = await Project.findById(project);

  if (!validProject) {
    const error = new Error("The project doesn't exists");
    return res.status(404).json({ msg: error.message });
  }

  if (validProject.creator.toString() !== req.user._id.toString()) {
    const error = new Error(
      "You don't have the permissions to create a new task"
    );
    return res.status(403).json({ msg: error.message });
  }

  try {
    const savedTask = await Task.create(req.body);
    return res.json(savedTask);
  } catch (error) {
    console.log(error);
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);

  if (!checkId) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  // "Populate" merge the data from Task and Project. This is possible since we're using a ref to Project model in the project column
  // of the Task model. For more information you can see https://mongoosejs.com/docs/populate.html
  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid action");
    return res.status(403).json({ msg: error.message });
  }

  res.json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const checkId = mongoose.Types.ObjectId.isValid(id);

  if (!checkId) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  // "Populate" merge the data from Task and Project. This is possible since we're using a ref to Project model in the project column
  // of the Task model. For more information you can see https://mongoosejs.com/docs/populate.html
  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("Task not found");
    return res.status(404).json({ msg: error.message });
  }

  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid action");
    return res.status(403).json({ msg: error.message });
  }

  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.deliveryDate = req.body.deliveryDate || task.deliveryDate;

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {};

const changeState = async (req, res) => {};

export { addTask, getTask, updateTask, deleteTask, changeState };
