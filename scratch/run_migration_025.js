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
        console.log("Running migration 025_extend_team_and_player_fields.sql...");
        const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '025_extend_team_and_player_fields.sql');
        const sqlQuery = fs.readFileSync(migrationPath, 'utf8');
        await sql.unsafe(sqlQuery);
        console.log("Successfully ran 025_extend_team_and_player_fields.sql!");
        
        // Verify columns
        const teamCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'teams' AND column_name = 'description'
        `;
        console.log("Teams description column verification:", teamCols);
        
        const playerCols = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'public' AND table_name = 'players' AND column_name = 'lineup_role'
        `;
        console.log("Players lineup_role column verification:", playerCols);

    } catch (err) {
        console.error("Error during migration:", err);
    } finally {
        await sql.end();
    }
}

runMigration();
