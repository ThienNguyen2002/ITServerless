const multipart = require("parse-multipart");
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const boundary = multipart.getBoundary(req.headers["content-type"]);
  const body = req.body;
  const parsedBody = multipart.Parse(body, boundary);

  let filetype = parsedBody[0].type;
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
  const result = await uploadFile(parsedBody, ext);
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: result,
  };
};
async function uploadFile(parsedBody, ext) {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);
  const containerName = "bunnimage-upload";
  const containerClient = blobServiceClient.getContainerClient(containerName); // Get a reference to a container
  const blobName = "test." + ext; // Create the container
  const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client
  return "File Saved";
}
