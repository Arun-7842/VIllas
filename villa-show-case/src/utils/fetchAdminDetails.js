import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchAdminDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.adminDetails,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchAdminDetails;
