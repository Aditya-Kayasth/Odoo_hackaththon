"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button onClick={toggleTheme}>
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </button>
  );
}

export default ThemeToggle;
