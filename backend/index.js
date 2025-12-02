import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import connectMongodb from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.listen(8080, function () {
  console.log("server live!!");
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET"],
    credentials:true
  })
);
app.set("view engine", "ejs");
connectMongodb();

app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);

