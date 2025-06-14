import { v2 as cloudinary } from "cloudinary";

const uploadVillaTestimonialCloudinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadTestiImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "villaTestimonial" }, (error, uploadResult) => {
        return resolve(uploadResult);
      })
      .end(buffer);
  });
  return uploadTestiImage;
};

export default uploadVillaTestimonialCloudinary;
