import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = 3022;

const conn = "mongodb://localhost:27017";
const client = new MongoClient(conn);

await client.connect();
const db = client.db("northwind");
const employees = await db.collection("employees").find().toArray();
console.log(employees);

app.get("/", (req, res) => {
  res.send("<h1>MongoDB Test</h1>");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
