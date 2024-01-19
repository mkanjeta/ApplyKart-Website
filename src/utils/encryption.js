var CryptoJS = require("crypto-js");

const secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
export const encryptData = (data) => {
  if (data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
  } else {
    return data;
  }
};
export const decryptData = (data) => {
  if (data) {
    var bytes = CryptoJS.AES.decrypt(data, secret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    return data;
  }
};
