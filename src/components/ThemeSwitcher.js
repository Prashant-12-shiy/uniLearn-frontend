// components/ThemeSwitcher.js
"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check for saved theme in local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.classList.add(initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme); // Store theme in local storage
  };

  return (
    <button
      className="px-2  text-black dark:text-white rounded"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeSwitcher;
