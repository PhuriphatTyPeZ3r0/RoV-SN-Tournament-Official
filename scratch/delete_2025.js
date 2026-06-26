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

    // Let's find any tournament with season = 2025 or name containing '2025'
    const toDelete = tournaments.filter(t => t.season === 2025 || t.name.includes("2025"));
    if (toDelete.length > 0) {
      console.log(`Deleting ${toDelete.length} tournaments from 2025...`);
      for (const t of toDelete) {
        // This will cascade delete schedules, matches, match_games, etc. due to ON DELETE CASCADE
        await sql`DELETE FROM public.tournaments WHERE id = ${t.id}`;
        console.log(`Deleted tournament ${t.name} (ID: ${t.id})`);
      }
    } else {
      console.log("No 2025 tournaments found.");
    }

    // Check if there is an active 2026 tournament, if not let's make sure it exists
    const has2026 = tournaments.some(t => t.season === 2026 || t.name.includes("2026"));
    if (!has2026) {
      console.log("Creating 2026 tournament...");
      const [newT] = await sql`
        INSERT INTO public.tournaments (name, season, status, theme_style)
        VALUES ('RoV SN Tournament 2026', 2026, 'active', 'echo')
        RETURNING *
      `;
      console.log("Created 2026 tournament:", newT);
    } else {
      console.log("2026 tournament already exists.");
    }

    const finalTs = await sql`SELECT * FROM public.tournaments`;
    console.log("Final tournaments in DB:", finalTs);

  } catch (err) {
    console.error("Error during cleansing:", err);
  } finally {
    await sql.end();
  }
}

run().catch(console.error);
