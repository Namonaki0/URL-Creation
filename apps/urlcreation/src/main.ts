import * as express from 'express';
import { Request, Response} from "express";
import * as randomstring from "randomstring";
import { MongoClient } from "mongodb";
import { credentials } from './credentials';

const app = express();

//? CONNECTION TO CLUSTER
const uri =  `${credentials}` ;
const client = new MongoClient(uri);
const dbName = "urlcreation";

let collection;

//? DB CONNECTION FUNCTION
const connectToDb = async() => {
  try {
    await client.connect();
    console.log("Connected to DB");
    await listDatabases(client);
    const db = client.db(dbName);
    collection = db.collection("urls");
  } 
  catch(err) {
      console.error(err)
  }
  // finally {
  //   await client.close();
  // }
}
//? DB CONNECTION FUNCTION --- END

connectToDb()
  .catch(console.error)

  let databasesList;

  //? LIST OF CURRENT DATABASES
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases avaliable:");

  databasesList.databases.forEach(database => console.log(` - ${database.name}`))
}
//? LIST OF CURRENT DATABASES --- END


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to this new app!' });
});

app.post("/api/shorturl", async (req: Request, res: Response) => {
  const generateRandomString = randomstring.generate(6);
  const newLink = {
    id: generateRandomString,
    url: `https://localhost:3333/api/${generateRandomString}`
  }
  const insertResultInDb = await collection.insertOne({newLink})
  return res.json({...insertResultInDb, result: newLink })
})

app.get("/api/:id", async(req: Request, res: Response) => {
  const id = req.params.id;
  const result = await collection.find({id});

  if(result) {
    return res.redirect("https://www.youtube.com/watch?v=ew04Md9YUvk&list=RDew04Md9YUvk&start_radio=1");
  }

  return res.send("Nothing available");
})

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
