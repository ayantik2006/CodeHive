import express from "express";
import {
  createProject,
  getProjects,
  deleteProject,
  getProjectDetails,
  createFile,
  deleteFile,
  renameFile,
  runCode,
  saveFile
} from "../controllers/projectControllers.js";
const router = express.Router();

router.post("/create-project", createProject);
router.post("/get-projects", getProjects);
router.post("/delete-project", deleteProject);
router.post("/get-projects", getProjects);
router.post("/get-project-details", getProjectDetails);
router.post("/create-file", createFile);
router.post("/delete-file", deleteFile);
router.post("/rename-file", renameFile);
router.post("/run-code", runCode);
router.post("/save-file", saveFile);

export default router;
