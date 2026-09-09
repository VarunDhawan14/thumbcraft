import { createContext, useContext } from "react";
import type { IUser } from "../assets/assets";
import { useState, useEffect } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  user: IUser | null;
  setUser: (user: IUser | null) => void;

  login: (user: { email: string; password: string }) => Promise<void>;

  signUp: (user: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;

  verifyEmail: (email: string, code: string) => Promise<void>;

  resendVerificationCode: (email: string) => Promise<void>;

  forgotPassword: (email: string) => Promise<void>;

  resetPassword: (
    email: string,
    code: string,
    password: string,
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},

  user: null,
  setUser: () => {},

  login: async () => {},
  signUp: async () => {},

  verifyEmail: async () => {},
  resendVerificationCode: async () => {},

  forgotPassword: async () => {},
  resetPassword: async () => {},

  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // =====================================================
  // SIGN UP
  // =====================================================

  const signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      toast.success(data.message || "Verification code sent to your email");
    } catch (error: any) {
      console.log("Signup error:", error);

      const message = error?.response?.data?.message || "Registration failed";

      toast.error(message);

      throw new Error(message);
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await api.post("/api/auth/login", {
        email,
        password,
      });

      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }

      toast.success(data.message || "Login successful");
    } catch (error: any) {
      console.log("Login error:", error);

      const message =
        error?.response?.data?.message || "Invalid email or password";

      toast.error(message);

      if (
        error?.response?.data?.requiresVerification &&
        error?.response?.data?.email
      ) {
        throw {
          requiresVerification: true,
          email: error.response.data.email,
        };
      }

      throw new Error(message);
    }
  };

  // =====================================================
  // VERIFY EMAIL
  // =====================================================

  const verifyEmail = async (email: string, code: string) => {
    try {
      const { data } = await api.post("/api/auth/verify-email", {
        email,
        code,
      });

      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }

      toast.success(data.message || "Email verified successfully");
    } catch (error: any) {
      console.log("Email verification error:", error);

      const message =
        error?.response?.data?.message ||
        "Invalid or expired verification code";

      toast.error(message);

      throw new Error(message);
    }
  };

  // =====================================================
  // RESEND VERIFICATION CODE
  // =====================================================

  const resendVerificationCode = async (email: string) => {
    try {
      const { data } = await api.post("/api/auth/resend-verification", {
        email,
      });

      toast.success(data.message || "Verification code sent successfully");
    } catch (error: any) {
      console.log("Resend verification error:", error);

      const message =
        error?.response?.data?.message || "Unable to resend verification code";

      toast.error(message);

      throw new Error(message);
    }
  };

  // =====================================================
  // FORGOT PASSWORD
  // =====================================================

  const forgotPassword = async (email: string) => {
    try {
      const { data } = await api.post("/api/auth/forgot-password", {
        email,
      });

      toast.success(data.message || "Reset code sent to your email");
    } catch (error: any) {
      console.log("Forgot password error:", error);

      const message =
        error?.response?.data?.message || "Unable to send reset code";

      toast.error(message);

      throw new Error(message);
    }
  };

  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const resetPassword = async (
    email: string,
    code: string,
    password: string,
  ) => {
    try {
      const { data } = await api.post("/api/auth/reset-password", {
        email,
        code,
        password,
      });

      toast.success(data.message || "Password reset successfully");
    } catch (error: any) {
      console.log("Reset password error:", error);

      const message =
        error?.response?.data?.message || "Unable to reset password";

      toast.error(message);

      throw new Error(message);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");

      setUser(null);
      setIsLoggedIn(false);

      toast.success(data.message || "Logout successful");
    } catch (error: any) {
      console.log("Logout error:", error);

      const message = error?.response?.data?.message || "Logout failed";

      toast.error(message);
    }
  };

  // =====================================================
  // FETCH CURRENT USER
  // =====================================================

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/api/auth/verify");

      if (data.user) {
        setUser(data.user as IUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,

    isLoggedIn,
    setIsLoggedIn,

    signUp,
    login,

    verifyEmail,
    resendVerificationCode,

    forgotPassword,
    resetPassword,

    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
