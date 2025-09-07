import { Platform } from "react-native";
import Constants from "expo-constants";
import { initializeApp, getApps, FirebaseOptions } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const extras = (Constants.expoConfig?.extra || {}) as any;
const ENV = extras.ENV ?? "test";

// match your project ids from .firebaserc
const PROJECT_ID =
  ENV === "test"
    ? "zeni-test-t1"
    : ENV === "uat"
    ? "zeni-uat-a1b2c3"
    : "zeni-prod-a1b2c3";

const firebaseConfig: FirebaseOptions = {
  apiKey:
    extras.FIREBASE_WEB_API_KEY || "AIzaSyCXS54W5qVWYT3WO41-udHNUHDDaB8X9Es", // public web key
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: "403938610144",
  appId: "1:403938610144:web:82ba5788e71465da0db985",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// SDK instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// match your functions region
export const fx = getFunctions(app, "asia-south1");

// point to emulators in TEST env
if (ENV === "test") {
  const host = Platform.OS === "android" ? "10.0.2.2" : "localhost";

  try {
    // Connect to emulators - Firebase handles duplicate connections gracefully
    connectAuthEmulator(auth, `http://${host}:9099`, {
      disableWarnings: true,
    });
    connectFirestoreEmulator(db, host, 8080);
    connectStorageEmulator(storage, host, 9199);
    connectFunctionsEmulator(fx, host, 5001);
  } catch (error) {
    console.warn("Emulator connection warning:", error);
  }
}
