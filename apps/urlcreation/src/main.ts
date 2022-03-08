/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { Request, Response} from "express";
import * as randomstring from "randomstring";
import { MongoClient } from "mongodb";

const app = express();

// const url = ``;
// const client = new MongoClient(url);
// const dbName = "urlcreation";


// const connectToDb = async() => {
//   await client.connect();
//   console.log("Connected to DB");
//   const db = client.db(dbName);
//   const collections = db.collection("urls");
// }

// connectToDb()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close())

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to this new app!' });
});

app.get("/api/shorturl", (req: Request, res: Response) => {
  const generateRandomString = randomstring.generate(6);
  return res.json({ url: `https://localhost:3333/api/${generateRandomString}`})
})

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
