import express from "express";
import { updateRoleToAdmin, getAdminStats } from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/make-admin", updateRoleToAdmin);
router.get("/stats", protectAdmin, getAdminStats);

export default router;
