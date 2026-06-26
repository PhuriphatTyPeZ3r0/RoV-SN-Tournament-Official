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

async function checkThemes() {
    let sql;
    try {
        sql = postgres({ host, port, user, pass: passWithoutBrackets, database: db, ssl: 'require' });
        await sql`SELECT 1`;
    } catch (e) {
        sql = postgres({ host, port, user, pass: rawPass, database: db, ssl: 'require' });
    }

    try {
        const tournaments = await sql`SELECT id, name, season, status, theme_style FROM public.tournaments`;
        console.log("Tournaments and Themes:");
        console.log(tournaments);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await sql.end();
    }
}

checkThemes();
