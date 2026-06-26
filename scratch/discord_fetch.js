const fs = require('fs');
const path = require('path');

const token = "NjE5OTU2MTcyNjk0MjI0OTU3.GI8E_r.hlj45qunwcbnoqDq2vDfcZQjzF10sCpI9OSSNA";

async function run() {
  console.log("Fetching guilds...");
  const guildsRes = await fetch("https://discord.com/api/v9/users/@me/guilds", {
    headers: {
      "Authorization": token
    }
  });

  if (!guildsRes.ok) {
    console.error("Failed to fetch guilds:", guildsRes.status, await guildsRes.text());
    return;
  }

  const guilds = await guildsRes.json();
  console.log(`Found ${guilds.length} guilds:`);
  guilds.forEach(g => console.log(`- ${g.name} (ID: ${g.id})`));
  
  // Find ROV SN Tournament guild
  const targetGuild = guilds.find(g => g.name.toLowerCase().includes("rov") || g.name.toLowerCase().includes("tournament"));
  if (!targetGuild) {
    console.log("Could not find a guild with 'rov' or 'tournament' in the name. Guilds found:");
    guilds.forEach(g => console.log(`- ${g.name} (ID: ${g.id})`));
    return;
  }

  console.log(`Target Guild: ${targetGuild.name} (ID: ${targetGuild.id})`);

  console.log("Fetching channels...");
  const channelsRes = await fetch(`https://discord.com/api/v9/guilds/${targetGuild.id}/channels`, {
    headers: {
      "Authorization": token
    }
  });

  if (!channelsRes.ok) {
    console.error("Failed to fetch channels:", channelsRes.status, await channelsRes.text());
    return;
  }

  const channels = await channelsRes.json();
  console.log(`Found ${channels.length} channels.`);
  
  // Create a map of categories for context
  const categoryMap = {};
  channels.filter(c => c.type === 4).forEach(c => {
    categoryMap[c.id] = c.name;
  });

  const allChannelsInfo = channels.map(c => {
    return {
      id: c.id,
      name: c.name,
      type: c.type === 0 ? "Text" : c.type === 2 ? "Voice" : c.type === 4 ? "Category" : `Other (${c.type})`,
      category: c.parent_id ? categoryMap[c.parent_id] : "None"
    };
  });

  console.log("\nAll Channels Info:");
  allChannelsInfo.forEach(c => {
    console.log(`- [${c.type}] #${c.name} (ID: ${c.id}, Category: ${c.category})`);
  });

  // Save the channels list
  const outputDir = path.join(__dirname, "..", "migration-data");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputDir, "channels.json"), JSON.stringify(allChannelsInfo, null, 2));
  console.log(`\nSaved channels list to client/migration-data/channels.json`);
}

run().catch(console.error);
