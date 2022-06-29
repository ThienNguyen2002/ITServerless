const querystring = require("qs");
const fetch = require("node-fetch");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const queryObject = querystring.parse(req.body);

  const url = queryObject.MediaUrl0;
  //context.log(url);

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.arrayBuffer();

  const result = await analyzeImage(data, context);

  //context.log(result);

  const age = result[0].faceAttributes.age;

  let id = "";

  if (age > 5 && age < 25) {
    id = "GenZ";
  } else if (age > 24 && age < 41) {
    id = "GenY";
  } else if (age > 40 && age < 57) {
    id = "GenX";
  } else if (age > 56 && age < 76) {
    id = "BabyBoomers";
  } else {
    id = "Unknown";
  }

  context.log(id);

  context.res = {
    body: id,
  };
};

async function analyzeImage(img, context) {
  const subscriptionKey = process.env["FACE_API_KEY"];
  const uriBase = process.env["FACE_API_URL"] + "/face/v1.0/detect";
  // env variables (similar to .gitignore/.env file) to not expose personal info

  const params = new URLSearchParams({
    returnFaceId: "true",
    returnFaceAttributes: "age",
  });
  context.log(uriBase + "?" + params.toString());
  // making the post request
  const resp = await fetch(uriBase + "?" + params.toString(), {
    method: "POST",
    body: img,
    // img is the parameter inputted
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    },
  });

  // receive the response
  let data = await resp.json();

  return data;
}
