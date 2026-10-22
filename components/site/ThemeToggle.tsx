"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "./Icons";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = document.documentElement.getAttribute("data-theme");
    setTheme(saved === "light" ? "light" : "dark");
  }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("tutorialdev.theme", next);
    } catch {
      /* noop */
    }
  };

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={flip}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={theme === "light"}
    >
      {theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );
}
