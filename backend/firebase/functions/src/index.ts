import { onCall } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

// Use onCall (NOT onRequest)
export const ping = onCall({ region: "asia-south1" }, (_request) => {
  return { ok: true, ts: Date.now() };
});
