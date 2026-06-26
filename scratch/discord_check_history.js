const fs = require('fs');
const path = require('path');

const token = "NjE5OTU2MTcyNjk0MjI0OTU3.GI8E_r.hlj45qunwcbnoqDq2vDfcZQjzF10sCpI9OSSNA";
const guildId = "1273323395655794688";

const channels = [
  { id: "1273323396125687823", name: "พูดคุยทั่วไป" },
  { id: "1273326405966364682", name: "กฏการใช้เซิร์ฟเวอร์" },
  { id: "1273326546936922202", name: "แอดมิน" },
  { id: "1273543428290117674", name: "สอบถาม-ปัญหาต่างๆ" },
  { id: "1273543799234236416", name: "กฎกติกาการแข่งขัน" },
  { id: "1273568607896338453", name: "𝗗𝗜𝗦𝗖𝗢𝗥𝗗" },
  { id: "1273587146594324551", name: "ระบบการแข่งขัน" },
  { id: "1273668793583013918", name: "ยินดีต้อนรับ" },
  { id: "1326849174377070643", name: "นัดเวลาแข่ง" },
  { id: "1327566076791226388", name: "หาทีมซ้อม" },
  { id: "1330213566955130903", name: "ส่งผลการแข่งขัน" },
  { id: "1436679305462550659", name: "กดรับตำแหน่ง" }
];

async function checkChannel(c) {
  // Get messages around 2025
  const res = await fetch(`https://discord.com/api/v9/channels/${c.id}/messages?limit=50`, {
    headers: {
      "Authorization": token
    }
  });

  if (!res.ok) {
    console.log(`Failed to fetch #${c.name}: ${res.status}`);
    return;
  }

  const msgs = await res.json();
  if (msgs.length === 0) {
    console.log(`Channel #${c.name} has 0 messages.`);
    return;
  }

  console.log(`Channel #${c.name} (ID: ${c.id}) has ${msgs.length} recent messages.`);
  console.log(`  - Latest message: ${msgs[0].timestamp} by ${msgs[0].author.username}`);
  console.log(`  - Earliest in batch: ${msgs[msgs.length-1].timestamp}`);
  
  // Look for 2025 keywords or team registrations
  const keywords = ["ทีม", "สมัคร", "2025", "แข่ง", "vs", "ชนะ"];
  const matches = msgs.filter(m => keywords.some(k => m.content.toLowerCase().includes(k)));
  console.log(`  - Found ${matches.length} messages matching keywords.`);
  if (matches.length > 0) {
    console.log(`    Sample match: "${matches[0].content.substring(0, 100)}..."`);
  }
}

async function run() {
  for (const c of channels) {
    await checkChannel(c);
  }
}

run().catch(console.error);
