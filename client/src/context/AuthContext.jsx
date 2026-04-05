import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    // Demo bypass: Accept any login and store mock session
    return new Promise((resolve) => {
      setTimeout(() => {
        const authUser = {
          id: "T-001",
          name: userData?.name || "Professor John",
          department: userData?.department || "Computer Science",
          role: "teacher"
        };
        const authToken = "demo-mock-jwt-token";
        
        setUser(authUser);
        localStorage.setItem("user", JSON.stringify(authUser));
        localStorage.setItem("token", authToken);
        
        resolve(authUser);
      }, 300); // Slight delay for UI loader feel
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token: localStorage.getItem("token"), login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
