const token = "NjE5OTU2MTcyNjk0MjI0OTU3.GI8E_r.hlj45qunwcbnoqDq2vDfcZQjzF10sCpI9OSSNA";

async function checkInvite(code) {
  console.log(`Checking invite code: ${code}...`);
  const res = await fetch(`https://discord.com/api/v9/invites/${code}?with_counts=true`, {
    headers: {
      "Authorization": token
    }
  });

  if (!res.ok) {
    console.error(`Failed to check invite ${code}:`, res.status, await res.text());
    return;
  }

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

async function run() {
  await checkInvite("6tNEgbcpK");
  await checkInvite("GqmHr9yKjZ");
}

run().catch(console.error);
