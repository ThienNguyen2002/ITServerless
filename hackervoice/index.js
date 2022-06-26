module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const name = req.query.name || (req.body && req.body.name);
  var password = req.query.password;
  var resp = "";
  if (password === "letmein") {
    resp = "Access granted.";
  } else {
    resp = "Access denied.";
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: resp,
  };
};
