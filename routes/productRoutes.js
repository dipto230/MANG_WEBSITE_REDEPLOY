import express from "express";
import upload from "../configs/multer.js";
import { protectAdmin } from "../middlewares/adminMiddleware.js";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);

router.post(
  "/admin/add",
  upload.single("image"),
  protectAdmin,
  addProduct
);

router.put("/admin/:id", protectAdmin, updateProduct);
router.delete("/admin/:id", protectAdmin, deleteProduct);

export default router;
