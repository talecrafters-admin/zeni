// apps/mobile/app.config.ts
import { config } from "dotenv";

// Load .env.test file
config({ path: ".env.test" });
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
    icon: "./assets/brand/zeni.png",
    plugins: ["expo-notifications"],
    extra: {
      APP_ENV: process.env.APP_ENV ?? "development",
      SUPABASE_URL:
        process.env.SUPABASE_URL ?? "https://your-project.supabase.co",
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? "your-anon-key-here",
      SUPABASE_DB_SCHEMA: process.env.SUPABASE_DB_SCHEMA ?? "api",
    },
  },
};
