const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, "..", "migration-data", "raw_messages.json");
if (!fs.existsSync(filePath)) {
  console.error("File not found!");
  process.exit(1);
}

const messages = JSON.parse(fs.readFileSync(filePath, 'utf8'));
console.log(`Analyzing ${messages.length} messages in #ส่งผลการแข่งขัน:\n`);

messages.forEach((m, idx) => {
  console.log(`[Message ${idx + 1}] Date: ${m.timestamp} | User: ${m.author.username}`);
  console.log(`Content: "${m.content}"`);
  if (m.attachments && m.attachments.length > 0) {
    console.log(`Attachments: ${m.attachments.map(a => a.filename).join(', ')}`);
  }
  if (m.embeds && m.embeds.length > 0) {
    console.log(`Embeds count: ${m.embeds.length}`);
    m.embeds.forEach(emb => {
      console.log(`  Embed Title: ${emb.title}`);
      console.log(`  Embed Description: ${emb.description}`);
    });
  }
  console.log("-".repeat(50));
});
