import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = source.generateParams();
  const seen = new Set<string>();

  const entries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/docs"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  seen.add("/");
  seen.add("/docs");

  for (const page of pages) {
    const slug = page.slug ?? [];
    const pathname = slug.length > 0 ? `/docs/${slug.join("/")}` : "/docs";

    if (seen.has(pathname)) continue;

    seen.add(pathname);
    entries.push({
      url: absoluteUrl(pathname),
      lastModified: now,
      changeFrequency: "weekly",
      priority: pathname.includes("/components/") ? 0.85 : 0.8,
    });
  }

  return entries;
}
