import { Router } from "express";
// import { uploadController } from "../controllers/upload.controller.js";
import { uploadImageController } from "../controllers/uploadImages.controller.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";
const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  auth,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  uploadImageController
);

export default uploadRouter;
