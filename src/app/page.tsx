import Link from "next/link";
import Script from "next/script";
import { absoluteUrl, siteConfig } from "@/lib/site";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/bela/bela-ui.svg"),
    sameAs: [siteConfig.repoUrl],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: siteConfig.name,
    codeRepository: siteConfig.repoUrl,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    programmingLanguage: "TypeScript",
    runtimePlatform: "Node.js",
    keywords: siteConfig.keywords.join(", "),
  },
];

const focusAreas = [
  "Notification items for alerts, comments, and activity updates.",
  "Source-available components you can copy and customize.",
  "Built for React, Next.js, shadcn/ui, and Tailwind CSS.",
];

const docsLinks = [
  {
    title: "Notification Item",
    href: "/docs/components/notification-item",
    description:
      "A polished notification card for activity feeds, alerts, and inbox experiences.",
  },
  {
    title: "CLI",
    href: "/docs/cli",
    description:
      "Install Bela UI components with the CLI and bring the source directly into your app.",
  },
  {
    title: "AI Usage",
    href: "/docs/ai-usage",
    description:
      "Use Bela UI with AI coding tools while preserving component APIs and shadcn/ui conventions.",
  },
];

export default function HomePage() {
  return (
    <>
      <Script id="home-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <main className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(24,24,27,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 pb-20 pt-16 sm:px-10 lg:px-12 lg:pt-24">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-amber-300/70 bg-amber-50 px-4 py-2 text-sm text-amber-900 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
              Work in progress: Bela UI is early, with more components and
              examples on the way.
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                Bela UI is a notification UI library for React and shadcn/ui.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Build notification items, inbox patterns, notification center
                views, and toast-driven product experiences with
                source-available components for React, Next.js, and Tailwind
                CSS.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                Open docs
              </Link>
              <Link
                href="/docs/components/notification-item"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:bg-accent"
              >
                See Notification Item
              </Link>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            {focusAreas.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-border/80 bg-card/90 p-6 text-base leading-7 text-card-foreground shadow-sm"
              >
                {item}
              </div>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-border/80 bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight">
                Focused on notification-heavy product UI
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                <p>
                  Bela UI stays intentionally narrow: notification items,
                  inboxes, notification centers, and related product patterns.
                </p>
                <p>
                  That focus helps search engines and AI tools understand what
                  Bela UI is without turning the site into a pile of thin SEO
                  pages.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-8 text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Quick start
              </p>
              <pre className="mt-5 overflow-x-auto rounded-2xl border border-zinc-200 bg-white/80 p-5 text-sm leading-7 text-zinc-800 dark:border-white/10 dark:bg-black/30 dark:text-zinc-200">
                <code>{`pnpm dlx bela-ui add notification-item`}</code>
              </pre>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Start with these pages
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {docsLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/20"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
