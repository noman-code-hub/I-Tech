const fs = require("fs/promises");
const path = require("path");

async function saveFallbackSubmission(type, payload) {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const dir = path.join(__dirname, "..", "data");
  const file = path.join(dir, `${type}.jsonl`);

  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(
    file,
    `${JSON.stringify({ id, type, createdAt: new Date().toISOString(), ...payload })}\n`,
    "utf8"
  );

  return id;
}

module.exports = { saveFallbackSubmission };
