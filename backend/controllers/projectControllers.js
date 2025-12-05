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

export async function getProjectDetails(req,res){
  const projectId=req.body.id;
  const projectDetails=await Project.findOne({_id:projectId});
  return res.status(200).json({projectDetails:projectDetails});
}

export async function createFile(req,res){
  const {projectId,fileName}=req.body;
  // console.log(req.body);
  const projectData=await Project.findOne({_id:projectId});
  const files=projectData.files;
  files.push({
    name:fileName,
    content:""
  });
  await Project.updateOne({_id:projectId},{files:files});
  res.status(200).json({msg:"new file created",projectDetails:projectData});
}

export async function deleteFile(req,res){
  const {id,fileName}=req.body;
  let projectData=await Project.findOne({_id:id});
  let files=projectData.files;
  let newFiles=[];
  for(let file of files){
    if(file.name!==fileName){
      newFiles.push(file);
    }
  }
  await Project.updateOne({_id:id},{files:newFiles});
  projectData=await Project.findOne({_id:id});
  return res.status(200).json({msg:"file deleted",projectDetails:projectData})
}

export async function renameFile(req,res){
  const {id,fileName}=req.body;
  let projectData=await Project.findOne({_id:id});
  let files=projectData.files;
  let newFiles=[];
}