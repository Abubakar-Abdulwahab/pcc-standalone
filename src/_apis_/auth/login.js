import axios from "axios";
import { authEndpoints, serviceEndpoint } from "../../config/endpoints";
import { computeCBSBody } from "../../utils/globalService";

export default async function loginUser(data) {
  const body = computeCBSBody("post", authEndpoints.login, {}, "", "", data);
  let tdata = JSON.stringify({
    UserName: "admin",
    Password: "password",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: authEndpoints.login,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  const response = await axios.request(config);

  // const response = await axios.post(authEndpoints.login, data);
  return response;
}
