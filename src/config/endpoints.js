/* eslint-disable @typescript-eslint/naming-convention */

/** Middle ware proxy url */
export const middleWareBaseUrl = 'https://possapbackend-development.ogtlprojects.com/api/v1';
// export const middleWareBaseUrl = 'http://localhost:5000/api/v1';

/** CBS BASE URL */
// export const serverBaseUrl = 'http://pss.cbs/api/v1/pss';
// export const serverBaseUrl = 'https://admin.possap.ng/api/v1/pss';
export const serverBaseUrl = 'https://test.possap.ng/api/v1/pss';

export const DownloadUrl =
  'https://possap.gov.ng/Admin/Police/Request/Details';


export const baseEndpoints = {
  auth: serverBaseUrl + '/proxyauthentication',
  officer: serverBaseUrl + '/officers',
  user: serverBaseUrl + '/user',
  services: serverBaseUrl + '/possap-services',
  cbsRoutes: middleWareBaseUrl + '/cbs-routes',
  pccRoute: serverBaseUrl + '/charactercertificate',
  immigrantRoute: serverBaseUrl + '/diasporacharactercertificate',
  utitlity: serverBaseUrl + '/utility'
};
export const immigrantEndpoints = {
  createImmigrant: baseEndpoints.user + '/create-immigrant',
  getImmigrant: baseEndpoints.user + '/get-immigrant-profile/',
};

export const officerEndpoints = {
  login: baseEndpoints.officer + '/login',
  signup: baseEndpoints.officer + '/signup',
  createImmigrant: baseEndpoints.officer + '/create-immigrant',
  validate: baseEndpoints.officer + '/validate-otp',
};

export const authEndpoints = {
  login: baseEndpoints.auth + '/admin/signin',
  signup: baseEndpoints.officer + '/signup',
};

export const serviceEndpoint = {
  fetchData: baseEndpoints.cbsRoutes + '/fetch-data',
  pccFormData: baseEndpoints.pccRoute + '/pcc-formdata',
  postPCCData: baseEndpoints.immigrantRoute + '/submit-immigrant-pcc',
  statelga: baseEndpoints.utitlity + '/get-states-lgas'
};
