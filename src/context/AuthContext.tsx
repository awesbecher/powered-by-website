
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("omegaAuth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === "info@omegapediatrics.com" && password === "Nwaneri32625") {
      localStorage.setItem("omegaAuth", "authenticated");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("omegaAuth");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
