import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const uploadImage = async (images, fieldName = "image") => {
  try {
    const formData = new FormData();

    if (Array.isArray(images)) {
      images.forEach((img) => {
        formData.append(fieldName, img);
      });
    } else {
      formData.append(fieldName, images);
    }

    const response = await Axios({
      ...SummaryApi.uplodImage,
      data: formData,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export default uploadImage;
