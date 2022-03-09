import * as express from 'express';
import { Request, Response} from "express";
import * as randomstring from "randomstring";
import { MongoClient } from "mongodb";

const app = express();

//? CONNECTION TO CLUSTER
const uri = "mongodb+srv://cluster1.qabkv.mongodb.net/urlcreation";
const client = new MongoClient(uri);
// const dbName = "urlcreation";

//? DB CONNECTION FUNCTION
const connectToDb = async() => {
  try {
    await client.connect();
    console.log("Connected to DB");
    // const db = client.db(dbName);
    // const collections = db.collection("urls");
  } 
  catch(err) {
      console.error(err)
  }
  finally {
    await client.close();
  }
}
//? DB CONNECTION FUNCTION --- END

connectToDb()
  .catch(console.error)



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
