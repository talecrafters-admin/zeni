export interface AuthError {
  title: string;
  message: string;
  action?: string;
}

export const getAuthErrorMessage = (error: any): AuthError => {
  const errorCode = error?.code || error?.message || "";

  switch (errorCode) {
    case "auth/user-not-found":
      return {
        title: "Account Not Found",
        message:
          "No account found with this email address. Please check your email or create a new account.",
        action: "Sign Up",
      };

    case "auth/wrong-password":
      return {
        title: "Incorrect Password",
        message:
          "The password you entered is incorrect. Please try again or reset your password.",
        action: "Try Again",
      };

    case "auth/invalid-email":
      return {
        title: "Invalid Email",
        message: "Please enter a valid email address.",
        action: "Try Again",
      };

    case "auth/user-disabled":
      return {
        title: "Account Disabled",
        message:
          "This account has been disabled. Please contact support for assistance.",
        action: "Contact Support",
      };

    case "auth/email-already-in-use":
      return {
        title: "Email Already in Use",
        message:
          "An account with this email already exists. Please sign in instead or use a different email.",
        action: "Sign In",
      };

    case "auth/weak-password":
      return {
        title: "Weak Password",
        message:
          "Password should be at least 6 characters long. Please choose a stronger password.",
        action: "Try Again",
      };

    case "auth/too-many-requests":
      return {
        title: "Too Many Attempts",
        message:
          "Too many failed attempts. Please wait a moment before trying again.",
        action: "Try Again Later",
      };

    case "auth/network-request-failed":
      return {
        title: "Network Error",
        message: "Please check your internet connection and try again.",
        action: "Retry",
      };

    case "auth/operation-not-allowed":
      return {
        title: "Sign-in Method Not Allowed",
        message: "This sign-in method is not enabled. Please contact support.",
        action: "Contact Support",
      };

    case "auth/invalid-credential":
      return {
        title: "Invalid Credentials",
        message:
          "The email or password you entered is incorrect. Please check your credentials and try again.",
        action: "Try Again",
      };

    default:
      return {
        title: "Authentication Error",
        message: error?.message || "Something went wrong. Please try again.",
        action: "Try Again",
      };
  }
};
