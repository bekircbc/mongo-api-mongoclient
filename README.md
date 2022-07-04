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

# Compass vs. NoSQLBooster

- NoSQLBooster - can be written SQL queries..

            Installing...

            [https://nosqlbooster.com/downloads]

            chmod a+x nosqlbooster4mongo-7.0.4.AppImage

# basic CRUd comments

## create

            db.todos.insertOne({title: "examine all collections"})
            db.todos.find()

            db.todos.insertMany([
            {title: "examine all collections"},
             {title: "try out all commands"}
            ])

## read

            db.employees.find().limit(2)

            db.employees.find().sort({lastName: 1}).projection({lastName: 1}) //{lastName:-1} for descendingorder


            db.employees.find({})
            .projection({ lastName: 1, "address.city": 1})
            .sort({"address.city": 1, lastName: -1})
            .limit(100)  // multiple sort fields

            db.employees.find({}, { lastName: 1}).skip(2)


            db.employees.find({title: "Sales Representative"}).projection({lastName: 1, firstName: 1, title: 1})

            db.employees.find({title: "Sales Representative"}, {lastName: 1, firstName: 1, title: 1})

            db.employees.countDocuments({title: "Sales Representative"})

            db.employees.findOne({_id: ObjectId("62c17670c7a008886a499e92")})

### filter options

- $eq / $ ne

            db.employees.find({title: "Sales Representative"}).projection({lastName: 1, firstName: 1, title: 1})

            db.employees.find({title: {$eq: "Sales Representative"}}).projection({lastName: 1, firstName: 1, title: 1}) //not equal to : $ne

- $gt / $lt / $gte / $ lte

            randomize

            db.customers.updateOne({_id: ObjectId('62c177fb446b309f5d602e2b')}, {$set: {age: Math.floor(Math.random() * 30) + 20}})

            db.customers.find({ age: {$gt: 35}}, {_id: 0, contactName: 1, age: 1}).sort({age: 1})

            db.customers.find({ age: {$gte: 36, $lte: 39}}, {_id: 0, contactName: 1, age: 1}).sort({age: 1})

- $in / %nin

            db.customers.find({"address.city": {$in: ["London"]}})

- $exists

            db.suppliers.find({}).forEach(function(doc) {
            if(Math.floor(Math.random() * 3) + 1 === 1) {
            db.suppliers.updateOne({_id: doc._id}, {
                $set: {coupon: "new"}
            })
            }
            })

            db.suppliers.find({ coupon: {$exists: true} }, { companyName: 1, coupon: 1, _id: 0 })  //exists true, not exists false

- $and / $or /

            db.customers.find({age: { $gt: 30, $lt: 35}})

            db.customers.find({$and: [{age: { $gt: 30, $lt: 35}}, {"address.country": "Brazil"}]})

            db.customers.find({$or: [
            {"address.region": null},
            {age: {$lt: 40}}
            ]}, {contactName: 1, "address.region": 1, _id:0, age: 1})

- $expr

            db.customers.find({}).forEach(function(doc) {
            db.customers.updateOne({_id: doc._id}, {
            $set: {managersAge: Math.floor(Math.random() * 30) + 20}
             })
            })

            db.customers.find({$expr: { $gt: ["$age", "$managersAge"]}}, {contactName: 1, age: 1, managersAge: 1})

## update

### updateOne

- $set

            db.employees.updateOne({_id: ObjectId('62c2ad8ad88d258a121366f3')}, {$set: {firstName: "Stephan"}})

- $inc

            db.customers.updateOne({_id: ObjectId('62c2b0c4886924d5d3d1da91')}, {$inc: {age: 1}})

- $push

            db.employees.updateOne({_id: ObjectId('62c17670c7a008886a499e96')}, {$push: {territoryIDs: 1111}})

- $pull

            db.employees.updateOne({_id: ObjectId('62c17670c7a008886a499e96')}, {$pull: {territoryIDs: 55439}})

            db.employees.updateOne({_id: ObjectId('62c17670c7a008886a499e96')}, {$pull: {territoryIDs: {$gt: 40000}}})

### updatemany

- $rename

            db.customers.updateMany({}, {$rename: { contactName: "customerName"}})

- $unset

            db.customers.find({}).forEach(function(doc) {
             db.customers.updateOne({_id: doc._id}, {
            $set: {vacationDayys: 29}
            })
            })

            db.customers.updateMany({}, {$unset: {vacationDayys: ''}})

### replaceOne

            db.todos.replaceOne({_id: ObjectId('62c1f66c8063a4efa228542a')},
            {
             "title": "examine all collections",
            "favorite": true,
            "deleted": false
            }
            )

## delete

### deleteOne

            db.todos.deleteOne({_id: ObjectId('62c1f66c8063a4efa228542a')})

### deleteMany

            db.employees.deleteMany({"address.city": "London"})

            db.employees.deleteMany({"address.city": {$ne: "London"}})
