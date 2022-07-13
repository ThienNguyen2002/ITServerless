const fetch = require("node-fetch");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  async function generateCatInBase64() {
    let resp = await fetch(
      "https://bit-cat.azurewebsites.net/cat/says/Bitcamp",
      {
        method: "GET",
      }
    );

    let data = await resp.arrayBuffer();
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob
    var base64data = Buffer.from(data).toString("base64");
    //put what you want to turn into base64 inside "originaldata"
    //"originaldata" will be encoded in base64.

    return base64data;
  }

  var catOne = await generateCatInBase64();
  var catTwo = await generateCatInBase64();
  var catThree = await generateCatInBase64();
  var catFour = await generateCatInBase64();
  var array = [
    "Shreya",
    "Emily",
    "Fifi",
    "Beau",
    "Evelyn",
    "Julia",
    "Daniel",
    "Fardeen",
  ];
  // Shuffle array
  const shuffled = array.sort(() => 0.5 - Math.random());

  // Get sub-array of first n elements after shuffled
  let names = shuffled.slice(0, 2);

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      cat1: catOne,
      cat2: catTwo,
      cat3: catThree,
      cat4: catFour,
      names: names,
    },
  };
};
