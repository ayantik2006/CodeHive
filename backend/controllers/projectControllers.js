import Project from "../models/Project.js";
import Account from "../models/Account.js";
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
  const user = await jwt.verify(req.cookies.user, process.env.JWT_SECRET).user;
  const projectId = req.body.id;
  const projectDetails = await Project.findOne({ _id: projectId });
  return res.status(200).json({ projectDetails: projectDetails, user: user });
}

export async function createFile(req, res) {
  const { projectId, fileName } = req.body;
  // console.log(req.body);
  let projectData = await Project.findOne({ _id: projectId });
  const files = projectData.files;
  files.push({
    name: fileName,
    content: "",
  });
  await Project.updateOne({ _id: projectId }, { files: files });
  projectData = await Project.findOne({ _id: projectId });
  const io = req.app.get("io");
  io.emit("updated files", { projectDetails: projectData });
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
  const io = req.app.get("io");
  io.emit("updated files", {
    projectDetails: projectData,
    deletedFile: fileName,
  });
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
  const io = req.app.get("io");
  io.emit("updated files", { projectDetails: projectData });
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
  const io = req.app.get("io");
  io.emit("updated files", { projectDetails: projectData, newContent: code });
  return res.status(200).json({ msg: "file saved", files: files.reverse() });
}

export async function aiExplain(req, res) {
  const { code, language } = req.body;
  const prompt = `
    Language: ${language}

Code snippet:
${code}

explain the above code's error.
Do NOT show reasoning, analysis, or search references.
Return only the final explanation, fix, and tip.
You are a programming error explainer.

Rules:
- Do NOT reveal your reasoning or analysis.
- Do NOT use <think> tags or explain your thought process.
- Do NOT mention searches or sources.
- Output ONLY the final answer.

Format STRICTLY as:
Cause:
Fix:
Prevention Tip:
Provide your answer in the above format only.
  `;

  try {
    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      {
        model: "sonar",
        messages: [
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({msg:response.data.choices[0].message.content});
  } catch (err) {
    res.status(404).json({ msg: "error in AI explanation" });
  }
}

export async function sharedWithMe(req, res) {
  const user = await jwt.verify(req.cookies.user, process.env.JWT_SECRET).user;

  const userData=await Account.findOne({email:user});
  const sharedProjectsId=userData.sharedWithMe;
  const sharedProjectsData=await Project.find({_id:{$in:sharedProjectsId}});
  
  return res.status(200).json({sharedProjects:sharedProjectsData});
}

export async function removeAccess(req, res) {
  const {projectId}=req.body;
  const user = await jwt.verify(req.cookies.user, process.env.JWT_SECRET).user;
  console.log(projectId);
  const projectData=await Project.findOne({_id:projectId});
  const collaborators=projectData.collaborators;
  const newCollaborators=[];
  for(let collaborator of collaborators){
    if(collaborator!==user){
      newCollaborators.push(collaborator);
    }
  }
  await Project.updateOne({_id:projectId},{collaborators:newCollaborators});
  const accessRequests=projectData.accessRequests;
  const newAccessRequests=[];
  for(let request of accessRequests){
    if(request!==user){
      newAccessRequests.push(request);
    } 
  }
  await Project.updateOne({_id:projectId},{accessRequests:newAccessRequests});
  const userData=await Account.findOne({email:user});
  const sharedWithMe=userData.sharedWithMe;
  const newSharedWithMe=[];
  for(let sharedProject of sharedWithMe){
    if(sharedProject.toString()!==projectId.toString()){
      newSharedWithMe.push(sharedProject);
    }
  }
  await Account.updateOne({email:user},{sharedWithMe:newSharedWithMe});
  const sharedProjectsData=await Project.find({_id:{$in:newSharedWithMe}});

  return res.status(200).json({msg:"access removed",sharedProjects:sharedProjectsData});
}