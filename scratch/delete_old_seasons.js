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
    console.log("Listing tournaments in DB...");
    const tournaments = await sql`SELECT * FROM public.tournaments`;
    console.log("Current tournaments:", tournaments);

    // Identify tournaments from 2023, 2024, or 2025
    const toDelete = tournaments.filter(t => 
      t.season === 2023 || 
      t.season === 2024 || 
      t.season === 2025 || 
      t.name.includes("2023") || 
      t.name.includes("2024") || 
      t.name.includes("2025")
    );

    if (toDelete.length > 0) {
      console.log(`Deleting ${toDelete.length} old tournaments (2023, 2024, 2025)...`);
      for (const t of toDelete) {
        // This will cascade delete schedules, matches, match_games, etc. due to ON DELETE CASCADE
        await sql`DELETE FROM public.tournaments WHERE id = ${t.id}`;
        console.log(`Deleted tournament ${t.name} (ID: ${t.id}, Season: ${t.season})`);
      }
    } else {
      console.log("No 2023, 2024, or 2025 tournaments found in DB.");
    }

    const finalTs = await sql`SELECT * FROM public.tournaments`;
    console.log("Final tournaments in DB:", finalTs);

  } catch (err) {
    console.error("Error during deletion:", err);
  } finally {
    await sql.end();
  }
}

run().catch(console.error);
