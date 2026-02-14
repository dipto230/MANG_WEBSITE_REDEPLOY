import Project from "../models/project.model.js";
import { v2 as cloudinary } from "cloudinary";


// 🔹 Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, tech, liveLink, githubLink } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageFile.path);

    const parsedTech = tech ? JSON.parse(tech) : [];

    const project = await Project.create({
      title,
      description,
      tech: parsedTech,
      liveLink,
      githubLink,
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// 🔹 Get All Projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
