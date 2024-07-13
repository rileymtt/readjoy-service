const { default: axios } = require("axios");

const url = "http://localhost:3007/api/v1/configuration"; // Replace this with the actual API endpoint

let count = 0;
let errorCount = 0;

const makeFetchRequest = async () => {
  try {
    await axios(url);
    count++;
    // return result.data;
  } catch (error) {
    // console.log("error", error.response.data);
    // throw error;
    errorCount++;
  }
};

const allRequests = [];
for (let i = 0; i < 1000; i++) {
  allRequests.push(makeFetchRequest());
}

Promise.all(allRequests).then(() => console.log({ count, errorCount }));
