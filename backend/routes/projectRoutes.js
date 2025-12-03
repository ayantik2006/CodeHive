import express from "express";
import {createProject, getProjects,deleteProject} from "../controllers/projectControllers.js"
const router = express.Router();

router.post("/create-project",createProject);
router.post("/get-projects",getProjects);
router.post("/delete-project",deleteProject);
router.post("/get-projects",getProjects);

export default router;
