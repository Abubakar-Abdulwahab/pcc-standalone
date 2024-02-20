import axios from "axios";

import { serviceEndpoint } from "../../config/endpoints";

export default async function getPCCFormData() {
  try {
    const response = await axios.get(`${serviceEndpoint.pccFormData}`);

    return response;
  } catch (error) {
    return error;
  }
}
