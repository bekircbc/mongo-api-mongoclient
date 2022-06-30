# Loading databases to Mongodb

      mongoimport --db northwind --collection employees --type json --file employees.json --jsonArray

# connecting Mongodb to get data

      npm i mongodb

      import { MongoClient } from 'mongodb';

      const conn = 'mongodb://localhost:27017';
      const client = new MongoClient(conn);

      await client.connect();
      const db = client.db('northwind');
      const employees = await db.collection('employees').find().toArray();
      console.log(employees);

# creating route for getting data

      const getData = async (done) => {
      await client.connect();
      const db = client.db('northwind');
     done(db);
      };

      app.get('/', (req, res) => {
      res.send('<h1>MongoDB Test</h1>');
      });

      app.get('/employees', (req, res) => {
      getData(async (db) => {
        const users = await db
            .collection('employees')
            .find()
            .toArray();
        res.json(users);
      });
      });
