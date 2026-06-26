const fs = require('fs');
const path = require('path');

const token = "NjE5OTU2MTcyNjk0MjI0OTU3.GI8E_r.hlj45qunwcbnoqDq2vDfcZQjzF10sCpI9OSSNA";
const channelId = "1330213566955130903"; // #📨｜ส่งผลการแข่งขัน

async function run() {
  console.log(`Fetching messages from channel ${channelId}...`);
  const res = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages?limit=100`, {
    headers: {
      "Authorization": token
    }
  });

  if (!res.ok) {
    console.error("Failed to fetch messages:", res.status, await res.text());
    return;
  }

  const messages = await res.json();
  console.log(`Fetched ${messages.length} messages.`);

  const outputDir = path.join(__dirname, "..", "migration-data");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputDir, "raw_messages.json"), JSON.stringify(messages, null, 2));
  console.log(`Saved raw messages to client/migration-data/raw_messages.json`);

  // Print first 5 messages for inspection
  console.log("\nSample Messages:");
  messages.slice(0, 5).forEach(m => {
    console.log(`- [${m.author.username} at ${m.timestamp}]: ${m.content}`);
    if (m.embeds && m.embeds.length > 0) {
      console.log(`  Embeds: ${JSON.stringify(m.embeds)}`);
    }
    if (m.attachments && m.attachments.length > 0) {
      console.log(`  Attachments: ${JSON.stringify(m.attachments.map(a => a.url))}`);
    }
  });
}

run().catch(console.error);
