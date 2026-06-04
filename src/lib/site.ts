const fallbackSiteUrl = "https://ui.bela.run";

function normalizeSiteUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  return normalizeSiteUrl(envUrl ?? fallbackSiteUrl);
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export const siteConfig = {
  name: "Bela UI",
  shortName: "Bela",
  description:
    "Bela UI is a notification UI library for React, Next.js, shadcn/ui, and Tailwind CSS.",
  repoUrl: "https://github.com/osmocn/bela-ui",
  keywords: [
    "Bela UI",
    "Bela",
    "notification UI library",
    "React notification components",
    "shadcn/ui notification components",
    "Tailwind CSS notification components",
    "notification center UI",
    "inbox UI component",
    "toast UI component",
    "AI-friendly UI library",
  ],
} as const;

export function humanizeSlugSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
