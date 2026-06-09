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
    "Bela UI is a source-available notification component library for React, Next.js, and shadcn/ui projects built with Tailwind CSS.",
  repoUrl: "https://github.com/osmocn/bela-ui",
  keywords: [
    "Bela UI",
    "Bela",
    "notification component library",
    "React notification components",
    "copy-paste React components",
    "shadcn/ui notification components",
    "Tailwind CSS notification components",
    "notification center component",
    "inbox component",
    "toast component",
    "AI-friendly component library",
  ],
} as const;

export function humanizeSlugSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
