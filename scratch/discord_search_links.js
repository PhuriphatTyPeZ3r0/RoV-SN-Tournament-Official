const fs = require('fs');
const path = require('path');

const token = "NjE5OTU2MTcyNjk0MjI0OTU3.GI8E_r.hlj45qunwcbnoqDq2vDfcZQjzF10sCpI9OSSNA";
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

async function run() {
  console.log("Searching channels for Google links or documents...");
  for (const c of channels) {
    const res = await fetch(`https://discord.com/api/v9/channels/${c.id}/messages?limit=100`, {
      headers: {
        "Authorization": token
      }
    });
    if (!res.ok) continue;
    const msgs = await res.json();
    msgs.forEach(m => {
      const content = m.content.toLowerCase();
      if (content.includes("google") || content.includes("sheet") || content.includes("docs") || content.includes("form") || content.includes("xlsx") || content.includes("drive")) {
        console.log(`[#${c.name}] [${m.timestamp}] ${m.author.username}: ${m.content}`);
      }
    });
  }
}

run().catch(console.error);
