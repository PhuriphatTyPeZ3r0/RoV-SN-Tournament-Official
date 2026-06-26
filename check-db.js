const postgres = require('postgres');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
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

async function checkDb() {
    let sql;
    try {
        sql = postgres({ host, port, user, pass: passWithoutBrackets, database: db, ssl: 'require' });
        await sql`SELECT 1`;
    } catch (e) {
        sql = postgres({ host, port, user, pass: rawPass, database: db, ssl: 'require' });
    }

    try {
        const users = await sql`SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 5`;
        console.log("Recent Auth Users:");
        console.log(users);

        const profiles = await sql`SELECT id, username, role, is_profile_complete, full_name FROM public.profiles ORDER BY created_at DESC LIMIT 5`;
        console.log("\nRecent Profiles:");
        console.log(profiles);

        // check trigger definition
        const triggers = await sql`SELECT pg_get_functiondef(oid) FROM pg_proc WHERE proname = 'handle_new_user'`;
        console.log("\nTrigger Function Definition:");
        console.log(triggers[0]?.pg_get_functiondef);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await sql.end();
    }
}

checkDb();