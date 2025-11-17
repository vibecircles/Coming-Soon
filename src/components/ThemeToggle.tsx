"use client";

import { useState, useEffect } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get initial theme from document
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme") as "light" | "dark" | null;
    if (currentTheme && (currentTheme === "light" || currentTheme === "dark")) {
      setTheme(currentTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Update document attribute
    document.documentElement.setAttribute("data-theme", newTheme);
    
    // Save to localStorage
    localStorage.setItem("data-theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 1000,
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        border: "none",
        background: "var(--neutral-alpha-medium)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        color: "var(--neutral-on-background-strong)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        transition: "all 0.3s ease",
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--neutral-alpha-strong)";
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--neutral-alpha-medium)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
    </button>
  );
}
