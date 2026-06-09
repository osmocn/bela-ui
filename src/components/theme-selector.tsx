"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "fumadocs-ui/provider/base";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeSelector({
  className,
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const nextTheme = activeTheme === "dark" ? "light" : "dark";
  const TriggerIcon = activeTheme === "dark" ? Sun : Moon;

  return (
    <Button
      variant="outline"
      size={showLabel ? "sm" : "icon"}
      className={`cursor-pointer ${className}`}
      aria-label={`Switch to ${nextTheme} mode`}
      onClick={() => setTheme(nextTheme)}
    >
      <TriggerIcon className="size-4" />
      {showLabel ? <span>Toggle theme</span> : null}
    </Button>
  );
}
