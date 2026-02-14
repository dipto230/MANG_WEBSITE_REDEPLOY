import express from "express";

import upload from "../configs/multer.js";
import { createProject, getAllProjects } from './../controllers/project.controller.js';
console.log("✅ Project routes loaded");

const projectRouter = express.Router();

projectRouter.post("/create", upload.single("image"), createProject);   
projectRouter.get("/all", getAllProjects);      
export default projectRouter;
