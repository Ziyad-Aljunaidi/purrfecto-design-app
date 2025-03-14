"use client";

import { Toggle } from "@/components/ui/toggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { setThemeCookie } from "@/actions/themeActions";
import debounce from "debounce";
import { useState, useEffect, useCallback } from "react";

export default function ThemeToggle({
  currentTheme,
}: Readonly<{ currentTheme: string }>) {
  const [theme, setTheme] = useState<string>(() => currentTheme || "dark");

  const debouncedSetTheme = debounce(async (newTheme: string) => {
    await setThemeCookie(newTheme);
  }, 1000);

  useEffect(() => {
    if (theme !== currentTheme) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        // currentTheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        // currentTheme = "light";
      }
      debouncedSetTheme(theme);
    }
  }, [theme]);

  const themeToggler = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <div>
      <Toggle
        variant="outline"
        className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent"
        pressed={theme === "dark"}
        onPressedChange={themeToggler}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
        <MoonIcon
          size={16}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <SunIcon
          size={16}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}
