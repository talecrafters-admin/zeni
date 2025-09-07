import { useEffect, useState } from "react";
import { Button, Text, View, Alert } from "react-native";
import { auth, fx } from "../src/services/firebase";
import { signInAnonymously, onAuthStateChanged, User } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

export default function Home() {
  const [status, setStatus] = useState("Initializing...");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
      if (user) {
        setStatus(`Signed in as: ${user.uid}`);
      } else {
        setStatus("Not signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setIsLoading(true);
      setStatus("Signing in...");
      await signInAnonymously(auth);
    } catch (error: any) {
      setStatus("Sign in error: " + error.message);
      Alert.alert("Sign In Error", error.message);
      setIsLoading(false);
    }
  };

  const callPing = async () => {
    try {
      const ping = httpsCallable(fx, "ping");
      const res = await ping({});
      setStatus("Function OK: " + JSON.stringify(res.data));
    } catch (e: any) {
      setStatus("Function error: " + e?.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Zeni - Mental Wellness
      </Text>

      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 20 }}>
        Status: {status}
      </Text>

      {!user && (
        <Button
          title={isLoading ? "Signing in..." : "Sign In Anonymously"}
          onPress={signIn}
          disabled={isLoading}
        />
      )}

      {user && (
        <>
          <Text style={{ fontSize: 14, color: "green", marginBottom: 10 }}>
            ✅ Authenticated
          </Text>
          <Button title="Test Ping Function" onPress={callPing} />
        </>
      )}
    </View>
  );
}
