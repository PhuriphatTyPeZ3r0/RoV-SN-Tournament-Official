const fs = require('fs');
const path = require('path');

const token = "NjE5OTU2MTcyNjk0MjI0OTU3.GI8E_r.hlj45qunwcbnoqDq2vDfcZQjzF10sCpI9OSSNA";

async function dumpChannel(channelId, name) {
  console.log(`Dumping messages from #${name} (${channelId})...`);
  const res = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages?limit=100`, {
    headers: {
      "Authorization": token
    }
  });

  if (!res.ok) {
    console.error(`Failed to fetch #${name}: ${res.status}`);
    return;
  }

  const msgs = await res.json();
  console.log(`Fetched ${msgs.length} messages.`);
  
  const outputDir = path.join(__dirname, "..", "migration-data");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputDir, `${name}_messages.json`), JSON.stringify(msgs, null, 2));

  console.log("Sample contents:");
  msgs.slice(0, 10).forEach(m => {
    console.log(`- [${m.timestamp}] ${m.author.username}: ${m.content}`);
    if (m.attachments.length > 0) {
      console.log(`  Attachments: ${m.attachments.map(a => a.url).join(', ')}`);
    }
  });
}

async function run() {
  await dumpChannel("1273326546936922202", "admin");
}

run().catch(console.error);
