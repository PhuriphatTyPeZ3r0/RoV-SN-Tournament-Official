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
    console.log("Listing tournaments...");
    const tournaments = await sql`SELECT * FROM public.tournaments`;
    console.log("Current tournaments:", tournaments);

    const echoOfDestiny = tournaments.find(t => t.id === '7b40925f-0379-46ff-90af-bd1b8cb99356');
    const empty2026 = tournaments.find(t => t.id === 'fb62cb3f-ec40-450b-ab4b-b1c14489de48');

    if (echoOfDestiny) {
      console.log("Updating 'Echo of Destiny' to 'RoV SN Tournament 2026' with season 2026...");
      await sql`
        UPDATE public.tournaments
        SET name = 'RoV SN Tournament 2026', season = 2026
        WHERE id = ${echoOfDestiny.id}
      `;
      console.log("Updated Echo of Destiny successfully!");
    }

    if (empty2026) {
      console.log("Deleting empty duplicate 2026 tournament...");
      await sql`
        DELETE FROM public.tournaments WHERE id = ${empty2026.id}
      `;
      console.log("Deleted empty duplicate successfully!");
    }

    const finalTs = await sql`SELECT * FROM public.tournaments`;
    console.log("Final tournaments in DB:", finalTs);

  } catch (err) {
    console.error("Error during fixing association:", err);
  } finally {
    await sql.end();
  }
}

run().catch(console.error);
