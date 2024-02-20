import axios from "axios";
import { serviceEndpoint } from "../../config/endpoints";
import { computeHash } from "../../utils/globalService";
import { environments } from "../../config";

export default async function postPCCData(data, PayerId) {

  const headerObject =  {
    Clientid: environments.clientId,
    // payerid: PayerId,
    Signature: computeHash(PayerId + environments.clientId)
}
  const config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: serviceEndpoint.postPCCData,
    data: data,
    headers: {
      'Authorization': JSON.stringify(headerObject),
    },
  };



//   const response = await instance.post('/submit-immigrant-pcc', data);
try {

    // const response = await axios.post(serviceEndpoint.postPCCData, data);
    // const response = await axios.post(serviceEndpoint.postPCCData, data, { headers: headerObject});
    const response = await axios.post(serviceEndpoint.postPCCData, data);
    console.log(response);
    return response
} catch (error) {
  console.log(error.code);
    if(error.code === 'ERR_NETWORK'){
      return error.code
    }else{
      return error.response.data

    }

}


}
