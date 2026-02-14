import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;
    const imageFile = req.file;
    const adminId = req.auth.userId;

    if (!imageFile)
      return res.json({ success: false, message: "Image Required" });

    const upload = await cloudinary.uploader.upload(imageFile.path);

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      image: upload.secure_url,
      createdBy: adminId,
    });

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price, stock },
      { new: true }
    );

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
