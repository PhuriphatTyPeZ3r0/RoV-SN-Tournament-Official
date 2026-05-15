const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL=postgresql:\/\/([^:]+):(.+)@([^:]+):(\d+)\/(.+)/);

const user = dbUrlMatch[1];
// The password might have literal brackets or they might just be placeholders
const rawPass = dbUrlMatch[2];
const passWithoutBrackets = rawPass.replace(/^\[/, '').replace(/\]$/, '');
const host = dbUrlMatch[3];
const port = dbUrlMatch[4];
const db = dbUrlMatch[5];

async function runMigrations() {
  // Try without brackets first
  let sql = postgres({
    host,
    port,
    user,
    pass: passWithoutBrackets,
    database: db,
    ssl: 'require'
  });

  const migrationsDir = path.join(__dirname, 'supabase', 'migrations');
  // Include 005 and 006 since the errors appeared
  const files = [
    '005_student_registrations.sql',
    '006_team_management.sql',
    '009_rbac_foundation.sql',
    '010_state_driven_locks.sql',
    '011_system_audit_trail.sql',
    '012_auto_profile_trigger.sql',
    '013_expand_profile_fields.sql'
  ];

  try {
    // Just a test connection
    await sql`SELECT 1`;
  } catch(e) {
    console.log("Failed with password without brackets, trying with brackets...");
    sql.end();
    sql = postgres({
      host, port, user, pass: rawPass, database: db, ssl: 'require'
    });
  }

  for (const file of files) {
    console.log(`Running ${file}...`);
    const filePath = path.join(migrationsDir, file);
    const query = fs.readFileSync(filePath, 'utf8');
    try {
      await sql.unsafe(query);
      console.log(`Successfully ran ${file}`);
    } catch (e) {
      console.error(`Error running ${file}:`, e);
      // Don't exit on error so it can try the rest (like if 006 was already applied but partially)
    }
  }

  await sql.end();
}

runMigrations();