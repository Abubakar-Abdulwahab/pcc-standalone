import axios from 'axios';


export default async function Hello() {
 

  const response = await axios.get('http://pss.cbs/api/v1/pss/user/get-immigrant-profile/WX-40166');



  return response;
}
