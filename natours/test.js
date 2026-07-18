const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();