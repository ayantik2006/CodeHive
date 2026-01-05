// index.js
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import connectMongodb from "./config/db.js";
import cookieParser from "cookie-parser";
import Project from "./models/Project.js";
import Account from "./models/Account.js";
import { stat } from "fs";

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.set("view engine", "ejs");
connectMongodb();

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/project", projectRoutes);

app.get("/health",(req,res)=>{
  res.status(200).json({msg:"200 OK"});
});

server.listen(8080, () => {
  console.log(`server live`);
});

//socket io part gulo

io.on("connection", (socket) => {
  socket.on("request access", async (data) => {
    const projectId = data.projectId;
    const requestedBy = data.requestedBy;
    const projectOwner = data.projectOwner;
    let projectData=await Project.findById(projectId);
    let accessRequests=projectData.accessRequests;
    accessRequests.push(requestedBy);
    await Project.updateOne({_id:projectId},{accessRequests:accessRequests});
    const projectAccessRequest={
      projectId:projectId,
      requestedBy:requestedBy,
      status:"pending"
    }
    const ownerData=await Account.findOne({email:projectOwner});
    let accessRequestsForOwner=ownerData.accessManagementProjects || [];
    accessRequestsForOwner.push(projectAccessRequest);
    await Account.updateOne({email:projectOwner},{accessManagementProjects:accessRequestsForOwner});

    io.emit(`${projectOwner}:access requested`, {
      projectId,
      requestedBy,
      projectName: projectData.name,
    });
  });

  socket.on("grant project access", async (data) => {
    const { projectId, requestedBy } = data;
    const projectData = await Project.findById(projectId);
    let collaborators = projectData.collaborators;
    collaborators.push(requestedBy); 
    await Project.updateOne(
      { _id: projectId },
      { collaborators: collaborators }
    );
    let requestedByData=await Account.findOne({email:requestedBy});
    let sharedWithMe=requestedByData.sharedWithMe;
    sharedWithMe.push(projectId);
    await Account.updateOne({email:requestedBy},{sharedWithMe:sharedWithMe});

    const ownerData=await Account.findOne({email:projectData.owner});
    let accessRequestsForOwner=ownerData.accessManagementProjects || [];
    for(let projectRequest of accessRequestsForOwner){
      if(projectRequest.projectId.toString()===projectId.toString() && projectRequest.requestedBy===requestedBy){
        projectRequest.status="granted";
      }
    }
    await Account.updateOne({email:projectData.owner},{accessManagementProjects:accessRequestsForOwner});

    io.emit(`${requestedBy}:access granted`,{projectName:projectData.name});
  });

});
