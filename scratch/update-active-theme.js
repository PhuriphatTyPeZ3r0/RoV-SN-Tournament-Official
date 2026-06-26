const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const theme = process.argv[2];
if (!theme || !['echo', 'arena', 'cyberpunk', 'void'].includes(theme)) {
    console.error("Please specify a valid theme preset: 'echo', 'arena', 'cyberpunk', or 'void'.");
    console.error("Usage: node scratch/update-active-theme.js <theme>");
    process.exit(1);
}

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

async function updateTheme() {
    let sql;
    try {
        sql = postgres({ host, port, user, pass: passWithoutBrackets, database: db, ssl: 'require' });
        await sql`SELECT 1`;
    } catch (e) {
        sql = postgres({ host, port, user, pass: rawPass, database: db, ssl: 'require' });
    }

    try {
        const result = await sql`
            UPDATE public.tournaments 
            SET theme_style = ${theme} 
            WHERE status = 'active'
            RETURNING id, name, status, theme_style
        `;
        if (result.length > 0) {
            console.log("Successfully updated active tournament theme:");
            console.log(result[0]);
        } else {
            console.log("No active tournament found to update.");
        }
    } catch (err) {
        console.error("Error updating theme:", err);
    } finally {
        await sql.end();
    }
}

updateTheme();
