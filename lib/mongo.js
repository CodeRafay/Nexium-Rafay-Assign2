const { MongoClient } = require('mongodb');

     let client;
     let clientPromise;

     if (!process.env.MONGO_URI) {
       throw new Error('Please add your MongoDB URI to .env.local');
     }

     if (process.env.NODE_ENV === 'development') {
       if (!global._mongoClientPromise) {
         client = new MongoClient(process.env.MONGO_URI);
         global._mongoClientPromise = client.connect();
       }
       clientPromise = global._mongoClientPromise;
     } else {
       client = new MongoClient(process.env.MONGO_URI);
       clientPromise = client.connect();
     }

     module.exports = clientPromise;