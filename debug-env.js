const fs = require("fs");
const content = fs.readFileSync(".env.local", "utf8");

function parseEnv(src) {
  const result = {};
  const lines = src.split(/\r?\n/);
  for (let line of lines) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      result[match[1].trim()] = match[2];
    }
  }
  return result;
}

const env = parseEnv(content);
const raw = env.FIREBASE_ADMIN_PRIVATE_KEY;

if (!raw) {
  console.log("FAILURE: Private key not found");
  process.exit(1);
}

const cleaned = raw.replace(/\\n/g, "\n").trim();
console.log("CLEANED LENGTH:", cleaned.length);
console.log(
  "STARTS WITH HEADER:",
  cleaned.startsWith("-----BEGIN PRIVATE KEY-----"),
);
console.log("ENDS WITH FOOTER:", cleaned.endsWith("-----END PRIVATE KEY-----"));

try {
  const crypto = require("crypto");
  crypto.createPrivateKey(cleaned);
  console.log("SUCCESS: KEY IS VALID");
} catch (e) {
  console.log("FAILURE:", e.message);
}
