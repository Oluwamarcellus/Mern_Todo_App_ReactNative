// context/useThemedColor.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../constants/color";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [Colors, setColors] = useState({});

  // Load theme from AsyncStorage once
  useEffect(() => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem("app-theme");
      if (storedTheme) setTheme(storedTheme);
    })();
  }, []);

  // Update Colors whenever theme changes
  useEffect(() => {
    setColors(theme === "dark" ? darkTheme : lightTheme);
    AsyncStorage.setItem("app-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, Colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easier access
export const useThemedColor = () => useContext(ThemeContext);
