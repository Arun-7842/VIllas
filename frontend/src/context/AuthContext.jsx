import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    const userData = localStorage.getItem("userData");

    if (token && userRole) {
      setUser({
        token,
        role: userRole,
        ...JSON.parse(userData || "{}"),
      });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("userRole", userData.role);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    setUser(null);
  };

  const isAdmin = () => {
    return user && user.role === "Admin";
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
