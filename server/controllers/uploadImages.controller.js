import { response } from "express";
import uploadVillaImageCloadinary from "../utils/uploadVillaImg.js";

export const uploadImageController = async (req, res) => {
  try {
    // For single cover image
    let coverImageUrl = "";
    if (req.files?.coverImage?.length) {
      const coverUpload = await uploadVillaImageCloadinary(
        req.files.coverImage[0]
      );
      coverImageUrl = coverUpload.secure_url || "";
    } else if (req.file) {
      const coverUpload = await uploadVillaImageCloadinary(req.file);
      coverImageUrl = coverUpload.secure_url || "";
    }

    // For multiple villa images
    let villaImageUrls = [];
    if (req.files?.images && req.files.images.length > 0) {
      villaImageUrls = await Promise.all(
        req.files.images.map((file) =>
          uploadVillaImageCloadinary(file).then((res) => res.secure_url)
        )
      );
    }

    return res.json({
      message: "Images uploaded successfully",
      data: {
        coverImage: coverImageUrl,
        images: villaImageUrls,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// export default uploadImageController;
