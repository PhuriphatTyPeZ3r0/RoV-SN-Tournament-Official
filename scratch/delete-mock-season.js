const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
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

async function run() {
    let sql;
    try {
        sql = postgres({ host, port, user, pass: passWithoutBrackets, database: db, ssl: 'require' });
        await sql`SELECT 1`;
    } catch (e) {
        sql = postgres({ host, port, user, pass: rawPass, database: db, ssl: 'require' });
    }

    try {
        const deleted = await sql`
            DELETE FROM public.tournaments
            WHERE season = 2027
            RETURNING *
        `;
        console.log("Deleted mock season(s):");
        console.log(deleted);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await sql.end();
    }
}

run();
