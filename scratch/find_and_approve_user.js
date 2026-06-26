const postgres = require('postgres');
const fs = require('fs');
const path = require('path');
const dns = require('dns');

if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv6first');
}

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

async function run() {
    let sql;
    try {
        sql = postgres({ host, port, user, pass: passWithoutBrackets, database: db, ssl: 'require' });
        await sql`SELECT 1`;
    } catch (e) {
        sql = postgres({ host, port, user, pass: rawPass, database: db, ssl: 'require' });
    }

    try {
        console.log("Searching for Phuriphat Hemakul (ภูริพัฒน์ เหมกุล)...");
        const name = 'ภูริพัฒน์ เหมกุล';
        const profiles = await sql`SELECT id, username, full_name, registration_status, role FROM public.profiles WHERE full_name LIKE ${'%' + name + '%'}`;
        console.log("Profiles matching:", profiles);

        const registrations = await sql`SELECT id, user_id, full_name, status, target_role FROM public.registrations WHERE full_name LIKE ${'%' + name + '%'}`;
        console.log("Registrations matching:", registrations);

        if (profiles.length > 0) {
            const profile = profiles[0];
            const userId = profile.id;
            console.log(`Found profile: ID ${userId}. Setting profile to verified and registration to approved.`);

            // Update profile
            await sql`UPDATE public.profiles SET registration_status = 'verified', role = 'student' WHERE id = ${userId}`;
            
            // Update registration if exists
            if (registrations.length > 0) {
                await sql`UPDATE public.registrations SET status = 'approved' WHERE user_id = ${userId}`;
            } else {
                console.log("No registration record found, creating one as approved.");
                await sql`INSERT INTO public.registrations (user_id, full_name, status, target_role, grade, student_id, in_game_name) VALUES (${userId}, ${profile.full_name}, 'approved', 'student', 'M.6', '12345', 'MockIGN')`;
            }

            // Check if player row exists
            const players = await sql`SELECT * FROM public.players WHERE profile_id = ${userId}`;
            console.log("Player records:", players);
            if (players.length === 0) {
                console.log("Creating player record for self-healing.");
                await sql`INSERT INTO public.players (profile_id, name, grade, in_game_name) VALUES (${userId}, ${profile.full_name}, 'M.6', 'MockIGN')`;
                const newPlayers = await sql`SELECT * FROM public.players WHERE profile_id = ${userId}`;
                console.log("Created player:", newPlayers);
            }
            console.log("Successfully approved and healed!");
        } else {
            console.log("No profile found with that name.");
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await sql.end();
    }
}

run();
