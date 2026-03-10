import * as admin from "firebase-admin";

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: (() => {
    let key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    if (!key) {
      console.warn("FIREBASE_ADMIN_PRIVATE_KEY is not defined");
      return undefined;
    }

    // 1. Trim surrounding whitespace
    key = key.trim();

    // 2. Handle quoting (Vercel/Next.js sometimes adds or preserves these)
    if (key.startsWith('"') && key.endsWith('"')) {
      key = key.slice(1, -1).trim();
    }

    // 3. Handle escaped newlines (common in env vars)
    key = key.replace(/\\n/g, "\n");

    // 4. Ensure it looks like a PEM key
    if (!key.includes("-----BEGIN PRIVATE KEY-----")) {
      console.error("LOG: Private key is missing PEM header");
    }

    return key;
  })(),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
  });
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth };
