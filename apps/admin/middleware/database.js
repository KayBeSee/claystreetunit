import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

import { data } from '@ontour/data';

const mongodbPasswordEncoded = encodeURIComponent(process.env.MONGODB_PASSWORD);

const CONNECTION_STRING = `mongodb+srv://admin:${mongodbPasswordEncoded}@serverlessinstance0.jgqu5.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db(data.dbName);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
