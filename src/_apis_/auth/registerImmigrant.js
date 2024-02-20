import axios from "axios";
import { immigrantEndpoints, officerEndpoints } from "../../config/endpoints";
import { computeCBSBody } from "../../utils/globalService";

export default async function RegisterImmigrant(data) {
  try {
    const response = await axios.post(immigrantEndpoints.createImmigrant, data);
    return response;
  } catch (error) {
    return error.code
  }
}
