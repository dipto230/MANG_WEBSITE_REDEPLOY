import express from "express";
import { createOrder, getAdminOrders } from "../controllers/orderController.js";
import { protectAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/admin", protectAdmin, getAdminOrders);

export default router;
