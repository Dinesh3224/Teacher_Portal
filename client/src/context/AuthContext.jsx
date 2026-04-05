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

  const login = async (email, password) => {
    // Simulated API Call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "john@svyasa.edu.in" && password === "svyasa123") {
          const authUser = {
            id: "T-001",
            name: "Professor John",
            department: "Computer Science",
            role: "teacher"
          };
          const authToken = "mock-jwt-token-12345";
          
          setUser(authUser);
          localStorage.setItem("user", JSON.stringify(authUser));
          localStorage.setItem("token", authToken);
          
          resolve(authUser);
        } else {
          reject(new Error("Invalid credentials. Use john@svyasa.edu.in / svyasa123"));
        }
      }, 1000); // Simulate network latency
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
