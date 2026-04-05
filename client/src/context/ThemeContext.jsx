import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("themeApp") || "theme-light";
  });

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem("themeAccent") || "orange";
  });

  useEffect(() => {
    localStorage.setItem("themeApp", theme);
    localStorage.setItem("themeAccent", accent);
  }, [theme, accent]);

  const changeTheme = (newTheme) => setTheme(newTheme);
  const changeAccent = (newAccent) => setAccent(newAccent);

  // Derive the CSS class name to apply to the root Layout div.
  // "theme-light" maps to "" (no extra class needed — default :root vars apply).
  const themeClass = theme === "theme-light" ? "" : theme;

  return (
    <ThemeContext.Provider value={{ theme, themeClass, accent, changeTheme, changeAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
