import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ThemeContext from "@/contexts/themContext.js";

const THEME_KEY = "app-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");
  useEffect(() => {
    setTimeout(() => {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) setTheme(savedTheme);
    }, 0);
  }, []);

  // Update localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);

    // Apply theme class to <html> or <body>
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      root.classList.add(systemPrefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = (newTheme) => setTheme(newTheme);

  const value = useMemo(() => ({ theme, setTheme: toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = { children: PropTypes.node };
