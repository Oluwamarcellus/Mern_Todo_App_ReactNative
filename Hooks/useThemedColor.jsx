import { useState } from "react";
import { lightTheme, darkTheme } from "../constants/color";

const useThemedColor = () => {
  const [color, setColor] = useState("dark");

    const toggleTheme = () => {
        setColor(color === "dark" ? "light" : "dark");
    };

  const Color = color === "dark" ? darkTheme : lightTheme;
  return [Color, toggleTheme];
};

export default useThemedColor;