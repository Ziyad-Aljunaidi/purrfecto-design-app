"use client";

import { Toggle } from "@/components/ui/toggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const {theme,setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by not rendering anything until after client hydration
    return null;
  }
  // to avoid system theme flicker on first load
  // if(theme === "system") {
  //   setTheme("light");
  // }

  return (
    <div>
      <Toggle
        variant="outline"
        className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-transparent"
        pressed={theme === "dark"}
        onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <SunIcon
        size={16}
        className="shrink-0 transition-all"
        aria-hidden="true"
          />
        ) : (
          <MoonIcon
        size={16}
        className="shrink-0 transition-all"
        aria-hidden="true"
          />
        )}
      </Toggle>
    </div>
  );
}
