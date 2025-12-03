import Project from "../models/Project.js";
import jwt from "jsonwebtoken";

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
    creationTime: new Date().getTime()
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
  const projects=await Project.find({owner:user});
  return res.status(200).json({projects:projects});
}

export async function deleteProject(req,res){
  const projectId=req.body.id;
  await Project.deleteOne({_id:projectId});
  return res.status(200).json({msg:"project deleted"});
}