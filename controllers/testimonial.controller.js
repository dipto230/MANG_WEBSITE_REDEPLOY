import Testimonial from "../models/testimonial.model.js";
import { v2 as cloudinary } from "cloudinary";

// 🔹 Create Testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, designation, message, rating } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(imageFile.path);

    const testimonial = await Testimonial.create({
      name,
      designation,
      message,
      rating,
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      testimonial,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 🔹 Get All Testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      testimonials,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
