import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadVillaImages = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "villaImages", maxCount: 10 }, // adjust maxCount as needed
]);

export default upload;
