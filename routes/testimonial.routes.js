import express from "express";
import upload from "../configs/multer.js";
import { createTestimonial, getAllTestimonials } from "../controllers/testimonial.controller.js";


const testimonialRouter = express.Router();

testimonialRouter.post("/create", upload.single("image"), createTestimonial);
testimonialRouter.get("/all", getAllTestimonials);

export default testimonialRouter;
