const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

let mongo;

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
