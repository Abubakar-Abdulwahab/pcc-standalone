import { environments } from "../config";
import * as crypto from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
export const computeCBSBody = (
  method,
  url,
  headers,
  hashField = "",
  hashmessage = "",
  body = null
) => {
  return {
    requestObject: {
      body,
      headers: {
        ...headers,
      },
      helpers: {
        method,
        url,
        hashField,
        hashmessage,
        clientSecret: environments.clientSecret,
      },
    },
  };
};

export const computeHash =(value) => {
  const hmac = crypto.algo.HMAC.create(
    crypto.algo.SHA256,
    environments.clientSecret
  );
  hmac.update(value);
  return Base64.stringify(hmac.finalize());
}
