const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://phuriphatizamu_db_user:j12WqjOUu6R67Oou@cluster.bi2ornw.mongodb.net/?appName=Cluster";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // Assuming the database name is "test" or something default, let's get all DBs or the primary one.
    // Let's connect and get the database. If not specified in URI, we might need to list databases.
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log("Databases:");
    for (let dbInfo of dbs.databases) {
      if (dbInfo.name === 'admin' || dbInfo.name === 'local') continue;
      console.log(`- ${dbInfo.name}`);
      const db = client.db(dbInfo.name);
      const collections = await db.listCollections().toArray();
      for (let colInfo of collections) {
        console.log(`  Collection: ${colInfo.name}`);
        const sample = await db.collection(colInfo.name).findOne();
        console.log(`  Sample:`, JSON.stringify(sample, null, 2));
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();