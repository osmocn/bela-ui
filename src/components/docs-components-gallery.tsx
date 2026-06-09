import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { source } from "@/lib/source";
import { ArrowUpRight } from "lucide-react";
import { ThemeAdaptiveImage } from "@/components/theme-adaptive-image";

const imageBySlug: Record<
  string,
  {
    alt: string;
    darkSrc?: string;
    src: string;
  }
> = {
  "notification-item": {
    alt: "Bela UI Notification Item cover",
    darkSrc: "/images/components/notification-item-dark.png",
    src: "/images/components/notification-item.png",
  },
};

export function DocsComponentsGallery() {
  const componentPages = source
    .getPages()
    .filter(
      (page) =>
        page.url.startsWith("/docs/components/") &&
        page.url !== "/docs/components",
    )
    .sort((a, b) => a.data.title.localeCompare(b.data.title));

  if (componentPages.length === 0) {
    return (
      <div className="not-prose mt-8 rounded-3xl border border-dashed border-border p-6 text-sm text-muted-foreground">
        Component docs will show up here as they are added.
      </div>
    );
  }

  return (
    <div className="not-prose mt-8 grid gap-6 md:grid-cols-2">
      {componentPages.map((page) => {
        const componentSlug = page.slugs.at(-1) ?? "component";

        return (
          <Card
            key={page.url}
            className="h-full rounded-md border border-border/80 py-0 gap-0 shadow-sm group outline-0 ring-0"
          >
            <CardHeader className="gap-2 p-4">
              <Link href={page.url}>
                <CardTitle className="text-lg font-semibold inline-flex items-end">
                  {page.data.title} <ArrowUpRight size={20} className=" relative bottom-0.5 ml-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                </CardTitle>
              </Link>
              <Link href={page.url}>
                <CardDescription className="text-sm">
                  {page.data.description}
                </CardDescription>
              </Link>
            </CardHeader>

            <CardContent className="relative p-1">
            <div className="relative aspect-video rounded-md flex items-center justify-center overflow-hidden border border-border/70">
              <Link href={page.url}>
                <ThemeAdaptiveImage
                  lightSrc={
                    imageBySlug[componentSlug]?.src ??
                    `/images/components/${componentSlug}.png`
                  }
                  darkSrc={
                    imageBySlug[componentSlug]?.darkSrc ??
                    `/images/components/${componentSlug}-dark.png`
                  }
                  alt={
                    imageBySlug[componentSlug]?.alt ??
                    `${page.data.title} component cover`
                  }
                  className="object-cover object-center"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  />
              </Link>
                  </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
