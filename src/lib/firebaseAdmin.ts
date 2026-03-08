import * as admin from "firebase-admin";

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: (() => {
    let key = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    if (!key) return undefined;
    key = key.replace(/\\n/g, "\n");
    if (key.startsWith('"')) key = key.substring(1);
    if (key.endsWith('"')) key = key.substring(0, key.length - 1);
    return key.trim();
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
