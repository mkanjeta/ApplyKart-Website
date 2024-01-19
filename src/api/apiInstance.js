import axios from "axios";
import { decryptData } from "utils/encryption";
import { clientSecret } from "./constant";
export const api = () =>
  axios.create({
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Headers": "*",
    },
  });

export const getAuthorizedApi = async (encryptedToken) => {
  const accessToken = await encryptedToken;
  const headers = {
    "content-type": "application/json",
    connection: "keep-alive",
    "X-Requested-With": "XMLHttpRequest",
    "client-secret": clientSecret,
  };
  if (accessToken) {
    headers.authorization = `${accessToken}`;
  }
  return axios.create({
    headers,
  });
};

export const getNonAuthorizedApi = async () => {
  const headers = {
    "content-type": "application/json",
    connection: "keep-alive",
    "X-Requested-With": "XMLHttpRequest",
    "client-secret": clientSecret,
  };
  // if (accessToken) {
  //   headers.authorization = `${accessToken}`;
  // }
  return axios.create({
    headers,
  });
};

export const getApi = () => axios.create();
