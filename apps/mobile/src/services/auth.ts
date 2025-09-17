import { supabase } from "./supabase";

export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  phoneNumber?: string | null;
}

let cachedUser: User | null = null;

function mapSupabaseUser(sessionUser: any | null): User | null {
  if (!sessionUser) return null;
  return {
    uid: sessionUser.id,
    email: sessionUser.email,
    displayName: sessionUser.user_metadata?.full_name ?? null,
    photoURL: sessionUser.user_metadata?.avatar_url ?? null,
    phoneNumber: sessionUser.phone ?? null,
  } as User;
}

export const auth = {
  get currentUser(): User | null {
    return cachedUser;
  },

  async initializeAuth(): Promise<User | null> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = mapSupabaseUser(session?.user ?? null);
      cachedUser = user;
      return user;
    } catch (error) {
      console.warn("Auth initialization error:", error);
      cachedUser = null;
      return null;
    }
  },

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    const user = mapSupabaseUser(data.user);
    if (!user) throw new Error("Authentication failed");
    cachedUser = user;
    return user;
  },

  async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    const user = mapSupabaseUser(data.user);
    if (!user) throw new Error("Sign up failed");
    cachedUser = user;
    return user;
  },

  async signOut(): Promise<void> {
    try {
      // Check if there's an active session first
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      }

      // Always clear cached user regardless of session state
      cachedUser = null;
    } catch (error) {
      // If there's any error, still clear the cached user
      cachedUser = null;
      console.warn("Sign out error (non-blocking):", error);
    }
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const user = mapSupabaseUser(session?.user ?? null);
        cachedUser = user;
        callback(user);
      }
    );
    return () => {
      subscription.subscription.unsubscribe();
    };
  },

  async updateProfile(_updates: Partial<User>): Promise<void> {
    // Profiles table can be managed separately; left intentionally minimal for now.
    return;
  },
};

// Convenience functions used by screens
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  return auth.signInWithEmailAndPassword(email, password);
}

export async function createUserWithEmail(
  email: string,
  password: string
): Promise<User> {
  return auth.createUserWithEmailAndPassword(email, password);
}

export async function signInWithGoogle(): Promise<User> {
  throw new Error("Google sign-in not implemented yet");
}

export async function signInWithApple(): Promise<User> {
  throw new Error("Apple sign-in not implemented yet");
}

export {};

// Password reset
export async function sendPasswordReset(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}
