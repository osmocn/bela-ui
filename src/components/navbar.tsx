"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ThemeSelector } from "@/components/theme-selector";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "CLI", href: "/docs/cli" },
  { label: "GitHub", href: siteConfig.repoUrl, external: true },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer noopener" : undefined}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          <ThemeSelector />
        </nav>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader className="sr-only">
              <DrawerTitle>Menu</DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col gap-4 px-4 pb-6 pt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer noopener" : undefined}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}

              <ThemeSelector className="mt-2 w-full justify-start" showLabel />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
