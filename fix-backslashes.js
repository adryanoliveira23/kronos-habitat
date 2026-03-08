const fs = require("fs");
const content = fs.readFileSync(".env.local", "utf8");
const match = content.match(/FIREBASE_ADMIN_PRIVATE_KEY=(.*)/);
if (!match) {
  console.log("No key found");
  process.exit(1);
}
const key = match[1];
const backslashes = [];
for (let i = 0; i < key.length; i++) {
  if (key[i] === "\\") {
    // Check if it's \n
    if (key[i + 1] === "n") {
      // skip
      i++;
    } else {
      backslashes.push({ index: i, context: key.substring(i - 10, i + 10) });
    }
  }
}
console.log("INVALID BACKSLASHES:", backslashes);

if (backslashes.length > 0) {
  let fixed = key;
  // Replace all backslashes that are not followed by n
  fixed = fixed.replace(/\\([^n])/g, "$1");
  console.log("FIXED (first 200 chars):", fixed.substring(0, 200));
}
