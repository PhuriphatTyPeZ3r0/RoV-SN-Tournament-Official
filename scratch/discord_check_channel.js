const token = "NjE5OTU2MTcyNjk0MjI0OTU3.GI8E_r.hlj45qunwcbnoqDq2vDfcZQjzF10sCpI9OSSNA";
const channelId = "1273979618390573089";

async function run() {
  console.log(`Checking channel ${channelId}...`);
  const res = await fetch(`https://discord.com/api/v9/channels/${channelId}`, {
    headers: {
      "Authorization": token
    }
  });

  if (!res.ok) {
    console.error(`Failed to fetch channel: ${res.status} ${await res.text()}`);
    return;
  }

  const channel = await res.json();
  console.log("Channel info:", JSON.stringify(channel, null, 2));

  console.log("Fetching channel messages...");
  const msgsRes = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages?limit=100`, {
    headers: {
      "Authorization": token
    }
  });

  if (!msgsRes.ok) {
    console.error(`Failed to fetch messages: ${msgsRes.status} ${await msgsRes.text()}`);
    return;
  }

  const msgs = await msgsRes.json();
  console.log(`Fetched ${msgs.length} messages from this channel.`);
  
  // Dump messages
  fs.writeFileSync("../migration-data/raw_roster_messages.json", JSON.stringify(msgs, null, 2));
  console.log("Saved raw roster messages.");
}

const fs = require('fs');
run().catch(console.error);
