const morse = require("morse-code-converter");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  var plaintext = req.query.plaintext;
  code = "";
  if (typeof plaintext === "undefined" || plaintext === "") {
    code = "Please enter some text to convert!";
  } else {
    code = morse.textToMorse(plaintext);
  }
  //added comment
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: code,
  };
};
