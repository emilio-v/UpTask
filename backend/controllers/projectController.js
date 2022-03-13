import mongoose from "mongoose";
import Project from "../models/Project.js";

const newProject = async (req, res) => {
  const project = new Project(req.body);
  project.creator = req.user._id;

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    console.log(error);
  }
};

const getProjects = async (req, res) => {
  const projects = await Project.find().where("creator").equals(req.user);
  res.json(projects);
};

const getProject = async (req, res) => {
  const { id } = req.params;

  const checkId = mongoose.Types.ObjectId.isValid(id);

  if (!checkId) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid action");
    return res.status(401).json({ msg: error.message });
  }

  res.json(project);
};

const editProject = async (req, res) => {
  const { id } = req.params;

  const checkId = mongoose.Types.ObjectId.isValid(id);

  if (!checkId) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    return res.status(404).json({ msg: error.message });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error("Invalid action");
    return res.status(401).json({ msg: error.message });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.deliveryDate = req.body.deliveryDate || project.deliveryDate;
  project.client = req.body.client || project.client;

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (req, res) => {};

const addCollaborator = async (req, res) => {};

const deleteCollaborator = async (req, res) => {};

const getTasks = async (req, res) => {};

export {
  newProject,
  getProjects,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getTasks,
};
