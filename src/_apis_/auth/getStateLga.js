import axios from 'axios';

import { authEndpoints, officerEndpoints, serviceEndpoint } from '../../config/endpoints';
import { computeCBSBody } from '../../utils/globalService';

export default async function GetStateLGA() {


  const response = await axios.get(serviceEndpoint.statelga);



  return response;
}
