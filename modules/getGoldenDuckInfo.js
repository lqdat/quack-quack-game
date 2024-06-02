const getAction = require("../actions/get");
const sleep = require("./sleep");

async function getGoldenDuckInfo(token, ua) {
  try {
    const { data } = await getAction(token, "golden-duck/info", ua);
    // console.log(data);
    return data.data;
  } catch (error) {
    console.log("getGoldenDuckInfo error");
    if (error.response) {
      // console.log(error.response.data);
      console.log("status", error.response.status);
      console.log("data", error.response.data);
      const status = error.response.status;
      // console.log(error.response.headers);
      if (status === 503 || status === 502) {
        console.log("Mat ket noi, tu dong ket noi sau 30s");
        await sleep(30);
        getGoldenDuckInfo(token, ua);
      } else if (status === 401) {
        console.log(`\nToken loi hoac het han roi\n`);
      } else if (status === 400) {
        // await sleep(10);
        // getGoldenDuckInfo(token, ua);
      } else {
        await sleep(5);
        getGoldenDuckInfo(token, ua);
      }
    } else if (error.request) {
      console.log("request", error.request);
    } else {
      console.log("error", error.message);
    }
  }
}

module.exports = getGoldenDuckInfo;