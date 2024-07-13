import CryptoJS from "crypto-js";

export default {
  encrypt: (message: string, key: string) => {
    return CryptoJS.AES.encrypt(message, key).toString();
  },
  decrypt: (message: string, key: string) => {
    var bytes = CryptoJS.AES.decrypt(message, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
};
