import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const extra: any = Constants.expoConfig?.extra || {};
export const supabase = createClient(
  extra.SUPABASE_URL,
  extra.SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage, // persist sessions on device
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false, // RN: no URL parsing
    },
    db: {
      schema: extra.SUPABASE_DB_SCHEMA || "public",
    },
  }
);
