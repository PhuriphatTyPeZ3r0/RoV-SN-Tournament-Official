const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
let connectionString = "";

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/DATABASE_URL=(.+)/);
  if (match) {
    connectionString = match[1].trim();
  }
}

async function run() {
  if (!connectionString) {
    console.error("No connection string!");
    return;
  }
  const sql = postgres(connectionString);
  try {
    console.log("Querying check constraints on profiles...");
    const profilesConstraints = await sql`
      SELECT conname, pg_get_constraintdef(c.oid) 
      FROM pg_constraint c 
      JOIN pg_namespace n ON n.oid = c.connamespace 
      WHERE c.conrelid = 'public.profiles'::regclass;
    `;
    console.log(profilesConstraints);

    console.log("\nQuerying check constraints on registrations...");
    const regConstraints = await sql`
      SELECT conname, pg_get_constraintdef(c.oid) 
      FROM pg_constraint c 
      WHERE c.conrelid = 'public.registrations'::regclass;
    `;
    console.log(regConstraints);

  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

run().catch(console.error);
