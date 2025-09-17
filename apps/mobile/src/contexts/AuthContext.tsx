import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth, User } from "../services/auth";
import { getProfile as getProfileSvc } from "../services/onboarding";

interface UserProfile {
  displayName?: string;
  email?: string;
  photoURL?: string;
  onboarding?: {
    step: string;
    completed: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isOnboardingComplete: boolean;
  refreshUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const refreshUserProfile = async () => {
    if (user) {
      try {
        const profile = (await getProfileSvc(
          user.uid
        )) as unknown as UserProfile;
        setUserProfile(profile);
        setIsOnboardingComplete(profile?.onboarding?.completed || false);
      } catch (error) {
        console.error("Error refreshing user profile:", error);
      }
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      // The onAuthStateChanged listener will handle clearing the state
    } catch (error) {
      console.error("Error signing out:", error);
      // Even if signOut fails, clear local state
      setUser(null);
      setUserProfile(null);
      setIsOnboardingComplete(false);
      // Don't throw the error to prevent UI blocking
    }
  };

  useEffect(() => {
    // Initialize auth state on mount
    const initializeAuth = async () => {
      try {
        const user = await auth.initializeAuth();
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.error("Auth initialization error:", error);
        setUser(null);
        setLoading(false);
      }
    };

    initializeAuth();

    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);

      if (u) {
        try {
          const profile = (await getProfileSvc(
            u.uid
          )) as unknown as UserProfile;
          setUserProfile(profile);
          setIsOnboardingComplete(profile?.onboarding?.completed || false);
        } catch (error) {
          console.error("Error loading user profile:", error);
          setUserProfile(null);
          setIsOnboardingComplete(false);
        }
      } else {
        setUserProfile(null);
        setIsOnboardingComplete(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    isOnboardingComplete,
    refreshUserProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
