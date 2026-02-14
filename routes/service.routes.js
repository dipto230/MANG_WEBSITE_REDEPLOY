import express from "express";
import upload from "../configs/multer.js";
import { createService, getAllServices } from "../controllers/service.controller.js";


const serviceRouter = express.Router();

serviceRouter.post("/create", upload.single("image"), createService);
serviceRouter.get("/all", getAllServices);

export default serviceRouter;
