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
    return res.status(404).json({ msg: error.message });
  }

  try {
    const savedTask = await Task.create(req.body);
    return res.json(savedTask);
  } catch (error) {
    console.log(error);
  }
};

const getTask = async (req, res) => {};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

const changeState = async (req, res) => {};

export { addTask, getTask, updateTask, deleteTask, changeState };
