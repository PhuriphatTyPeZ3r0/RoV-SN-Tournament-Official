const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const dbUrlMatch = envContent.match(/DATABASE_URL=postgresql:\/\/([^:]+):(.+)@([^:]+):(\d+)\/(.+)/);

if (!dbUrlMatch) {
    console.error("Could not find DATABASE_URL in .env");
    process.exit(1);
}

const user = dbUrlMatch[1];
const rawPass = dbUrlMatch[2];
const passWithoutBrackets = rawPass.replace(/^\[/, '').replace(/\]$/, '');
const host = dbUrlMatch[3];
const port = dbUrlMatch[4];
const db = dbUrlMatch[5];

async function runMigration() {
    let sql;
    try {
        sql = postgres({ host, port, user, pass: passWithoutBrackets, database: db, ssl: 'require' });
        await sql`SELECT 1`;
    } catch (e) {
        sql = postgres({ host, port, user, pass: rawPass, database: db, ssl: 'require' });
    }

    try {
        console.log("Running migration 026_add_contact_and_player_inputs.sql...");
        const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '026_add_contact_and_player_inputs.sql');
        const sqlQuery = fs.readFileSync(migrationPath, 'utf8');
        await sql.unsafe(sqlQuery);
        console.log("Successfully ran 026_add_contact_and_player_inputs.sql!");
        
        // Verify columns in teams
        const teamCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'teams' AND column_name IN ('contact_phone', 'contact_line', 'contact_discord')
        `;
        console.log("Teams columns verification:", teamCols);
        
        // Verify columns in players
        const playerCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'players' AND column_name IN ('nickname', 'phone', 'favorite_heroes')
        `;
        console.log("Players columns verification:", playerCols);

    } catch (err) {
        console.error("Error during migration:", err);
    } finally {
        await sql.end();
    }
}

runMigration();
