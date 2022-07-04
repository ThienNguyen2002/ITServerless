const querystring = require("qs");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  databaseId: "SecretStorer",
  containerId: "secrets",
  partitionKey: { kind: "Hash", paths: ["/secrets"] },
};

//Now, we want to write an asynchronous create function that takes in the parameter of client (this will be our CosmosClient), databaseId, and containerId.
//The function will use the client to create a database with an id of databaseId if it does not exist.
//The function will use the client to create a container inside the database of ID databaseId. This container will have an ID of containerId and a key of partitionKey.
//The function will should be async because within it we are accessing CosmosDB.
// The create function does not need to have a return value.
async function create(client, databaseId, containerId) {
  const partitionKey = config.partitionKey;

  /**
   * Create the database if it does not exist
   */
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });
  console.log(`Created database:\n${database.id}\n`);

  /**
   * Create the container if it does not exist
   */
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists(
      { id: containerId, partitionKey },
      { offerThroughput: 400 }
    );

  console.log(`Created container:\n${container.id}\n`);
}

//The createDocument async function will create a new document within the database container that contains the newItem data. newItem should be a parameter that is passed into the createDocument function. return your items object from the function which contains the most recent message.
async function createDocument(newItem) {
  const { endpoint, key, databaseId, containerId } = config;

  // connect to CosmosDB database
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await create(client, databaseId, containerId);

  // get the most recent
  console.log(`Querying container: Items`);

  // query to return top items, organized by time stamp column (c._ts)
  const querySpec = {
    query: "SELECT * FROM c",
  };

  // read all items in the Items container
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  /** Create new item
   * newItem is defined at the top of this file
   */
  const { resource: createdItem } = await container.items.create(newItem);

  console.log(
    `\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`
  );

  return items;
}

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  const queryObject = querystring.parse(req.body);
  let message = queryObject.Body; // user's input
  let document = { message: message }; // now in json form
  let items = await createDocument(document);
  let random_value = Math.floor(items.length * Math.random());
  const responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(
    items[random_value].message
  )}`;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};
