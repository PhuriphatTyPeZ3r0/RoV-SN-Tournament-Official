const fs = require('fs');
const path = require('path');

const token = "NjE5OTU2MTcyNjk0MjI0OTU3.GI8E_r.hlj45qunwcbnoqDq2vDfcZQjzF10sCpI9OSSNA";
const channelId = "1326849174377070643"; // #🕐｜นัดเวลาแข่ง

async function run() {
  console.log(`Fetching messages from #นัดเวลาแข่ง (ID: ${channelId})...`);
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
  fs.writeFileSync(path.join(outputDir, "raw_schedule_messages.json"), JSON.stringify(messages, null, 2));
  console.log(`Saved raw schedule messages to client/migration-data/raw_schedule_messages.json`);

  // Analyze messages
  messages.forEach((m, idx) => {
    console.log(`[${m.timestamp}] ${m.author.username}: ${m.content}`);
  });
}

run().catch(console.error);
