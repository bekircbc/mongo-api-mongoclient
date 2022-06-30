# Loading databases to Mongodb

- create dataImport folder, whereever you want to work..

- in this folder add some ..json datei. [{...}]

            mongoimport --db northwind --collection employees --type json --file employees.json --jsonArray

- if you want to add, more database or collection

            change northwind for database
            change employees for collection and employees.json

             mongoimport --db { northwind } --collection [ employees ] --type json --file [ employees.json ] --jsonArray

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
