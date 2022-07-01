const multipart = require("parse-multipart");
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const boundary = multipart.getBoundary(req.headers["content-type"]);
  const body = req.body;

  var result = "";
  try {
    // use parse-multipart to parse the body
    const parsedBody = multipart.Parse(body, boundary);
    context.log(parsedBody);

    // determine the file-type here!
    var filetype = parsedBody[0].type;
    if (filetype == "image/png") {
      ext = "png";
    } else if (filetype == "image/jpeg") {
      ext = "jpeg";
    } else if (filetype == "image/jpg") {
      ext = "jpg";
    } else {
      username = "invalidimage";
      ext = "";
    }
    let fileName = req.headers["insert_header_name"];

    result = await uploadFile(parsedBody, ext, fileName);
    // fill the parameters in!
  } catch (err) {
    context.log(err);
    context.log("Undefined body image");
    responseMessage = "Sorry! No image attached.";
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: result,
  };
};
async function uploadFile(parsedBody, ext, fileName) {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerName = "images";
  const containerClient = blobServiceClient.getContainerClient(containerName); // Get a reference to a container
  const blobName = fileName + "." + ext; // Create the container
  const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client
  const uploadBlobResponse = await blockBlobClient.upload(
    parsedBody[0].data,
    parsedBody[0].data.length
  );
  return "File Saved";
}
