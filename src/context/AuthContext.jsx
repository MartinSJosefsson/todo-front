import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      // Normally decode the token to extract roles; for now we fake user object
      setUser({ name: "Logged User", email: "user@test.se", roles: ["USER"] });
    }
  }, []);

  const login = async (username, password) => {
    const token = await authService.login(username, password);

    // TODO: decode token for roles (jwt-decode can be used)
    setUser({
      name: username,
      email: username + "@test.se",
      roles: username === "admin" ? ["ADMIN"] : ["USER"],
    });

    return token;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const hasRole = (role) => {
    if (!user?.roles) return false;
    const normalizedRoles = user.roles.map((r) =>
      r.replace(/^ROLE_/, "").toUpperCase()
    );
    const normalizedCheck = role.replace(/^ROLE_/, "").toUpperCase();
    return normalizedRoles.includes(normalizedCheck);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
