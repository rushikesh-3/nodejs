const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://rushi:RushiMongo123@cluster0.y4rbybj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
