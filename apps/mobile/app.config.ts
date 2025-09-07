// apps/mobile/app.config.ts
import "dotenv/config";
export default {
  expo: {
    name: "Zeni",
    slug: "zeni",
    scheme: "zeni",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    ios: { bundleIdentifier: "com.zeni.app", buildNumber: "1.0.0" },
    android: { package: "com.zeni.app", versionCode: 1 },
    plugins: ["expo-notifications"],
    extra: {
      ENV: process.env.APP_ENV ?? "test",
      API_BASE: process.env.API_BASE,
      FIREBASE_WEB_API_KEY: process.env.FB_API_KEY,
    },
  },
};
