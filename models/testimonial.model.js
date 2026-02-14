import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 }
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
