import axios from 'axios';

import { immigrantEndpoints } from '../../config/endpoints';


export default async function getImmigrantData(id) {

  const response = await axios.get(`${immigrantEndpoints.getImmigrant}` + id);

  return response;
}
