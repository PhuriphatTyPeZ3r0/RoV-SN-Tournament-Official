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
    const matches = await sql`
      SELECT match_day, count(*) as count, string_agg(team_blue_name || ' vs ' || team_red_name, ', ') as pairings
      FROM public.matches 
      GROUP BY match_day 
      ORDER BY match_day ASC
    `;
    console.log(matches);
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

run();
