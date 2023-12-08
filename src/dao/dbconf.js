import { MongoClient } from 'mongodb';
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
const filter = {
  'mongoose': 'cartSchema', 
  'import': 'const', 
  'from': '=', 
  '\'mongoose\';': 'new'
};
const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('desafio').collection('carts');
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();