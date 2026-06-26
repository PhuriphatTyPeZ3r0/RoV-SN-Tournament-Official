const postgres = require('postgres');

async function run() {
  console.log("Connecting directly using new password...");
  const sql = postgres({
    host: "db.loofwjhwinbqsjmjhaep.supabase.co",
    port: 5432,
    user: "postgres",
    pass: "KDB_AssistKing23",
    database: "postgres",
    ssl: "require"
  });

  try {
    const result = await sql`SELECT 1 as connected`;
    console.log("Connected successfully! Result:", result);
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await sql.end();
  }
}

run().catch(console.error);
