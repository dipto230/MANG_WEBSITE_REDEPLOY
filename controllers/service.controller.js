import Service from "../models/service.model.js";
import { v2 as cloudinary } from "cloudinary";

// 🔹 Create Service
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(imageFile.path);

    const service = await Service.create({
      title,
      description,
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get All Services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      services,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
