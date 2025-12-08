import Project from "../models/Project.js";
import jwt from "jsonwebtoken";
import axios from "axios";
export async function createProject(req, res) {
  const { projectName, language, visibility } = req.body;
  let user;
  try {
    user = jwt.verify(req.cookies.user, process.env.JWT_SECRET).user;
  } catch (e) {
    return res.status(404).json({});
  }
  await Project.create({
    name: projectName,
    language: language,
    visibility: visibility,
    owner: user,
    collaborators: [user],
    creationTime: new Date().getTime(),
  });
  return res.status(200).json({ msg: "project created" });
}

export async function getProjects(req, res) {
  let user;
  try {
    user = jwt.verify(req.cookies.user, process.env.JWT_SECRET).user;
  } catch (e) {
    return res.status(404).json({});
  }
  const projects = await Project.find({ owner: user });
  return res.status(200).json({ projects: projects });
}

export async function deleteProject(req, res) {
  const projectId = req.body.id;
  await Project.deleteOne({ _id: projectId });
  return res.status(200).json({ msg: "project deleted" });
}

export async function getProjectDetails(req, res) {
  const projectId = req.body.id;
  const projectDetails = await Project.findOne({ _id: projectId });
  return res.status(200).json({ projectDetails: projectDetails });
}

export async function createFile(req, res) {
  const { projectId, fileName } = req.body;
  // console.log(req.body);
  const projectData = await Project.findOne({ _id: projectId });
  const files = projectData.files;
  files.push({
    name: fileName,
    content: "",
  });
  await Project.updateOne({ _id: projectId }, { files: files });
  res
    .status(200)
    .json({ msg: "new file created", projectDetails: projectData });
}

export async function deleteFile(req, res) {
  const { id, fileName } = req.body;
  let projectData = await Project.findOne({ _id: id });
  let files = projectData.files;
  let newFiles = [];
  for (let file of files) {
    if (file.name !== fileName) {
      newFiles.push(file);
    }
  }
  await Project.updateOne({ _id: id }, { files: newFiles });
  projectData = await Project.findOne({ _id: id });
  return res
    .status(200)
    .json({ msg: "file deleted", projectDetails: projectData });
}

export async function renameFile(req, res) {
  const { projectId, newFileName, oldFileName } = req.body;
  let projectData = await Project.findOne({ _id: projectId });
  let files = projectData.files;
  for (let file of files) {
    if (file.name === oldFileName) {
      file.name = newFileName;
      break;
    }
  }
  await Project.updateOne({ _id: projectId }, { files: files });
  projectData = await Project.findOne({ _id: projectId });
  return res
    .status(200)
    .json({ msg: "file deleted", projectDetails: projectData });
}

export async function runCode(req, res) {
  const code = req.body.code;
  const language = req.body.language;

  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language,
        version: "*",
        files: [{ content: code }],
      }
    );

    res.json({ data: response.data });
  } catch (error) {
    res.json({ output: "Error executing code" });
  }
}

export async function saveFile(req, res) {
  const { code, projectId, fileName } = req.body;
  let projectData = await Project.findOne({ _id: projectId });
  const files = projectData.files;
  for (let file of files) {
    if (file.name === fileName) {
      file.content = code;
      break;
    }
  }
  await Project.updateOne({ _id: projectId }, { files: files });
  projectData = await Project.findOne({ _id: projectId });
  return res
    .status(200)
    .json({ msg: "file saved", files:files.reverse() });
}
