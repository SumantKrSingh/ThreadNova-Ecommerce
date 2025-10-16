import { useState, useEffect, createContext, Children } from "react";

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
    } catch (error) {
      console.log(error);
    }

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (err) {
      console.log(err);
    }
  }, [theme]);

  const toggleTheme = () => {
    document.body.classList.add("theme-fade");

    setTimeout(() => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
      document.body.classList.remove("theme-fade");
    }, 150);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
