import { ArrowRight } from "lucide-react";
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

const heroStack = [
  "Source-available",
  "React",
  "Next.js",
  "Tailwind CSS",
  "shadcn/ui",
];

const focusAreas = [
  "Notification items for alerts, comments, and activity updates.",
  "Copy-paste components you can own and customize.",
  "Built for React, Next.js, and shadcn/ui projects.",
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

      <main className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_32%),radial-gradient(circle_at_bottom,rgba(24,24,27,0.08),transparent_42%)] dark:bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_34%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_40%)]" />

        <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200/80 bg-white/85 px-6 py-14 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:px-10 sm:py-16 lg:px-16 lg:py-20 dark:border-white/10 dark:bg-zinc-950 dark:shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
            <div className="bela-hero-grid absolute inset-0 opacity-60 dark:opacity-70" />
            <div className="bela-hero-noise absolute inset-0 opacity-20 dark:opacity-60" />
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_70%)]" />
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-400/10" />

            <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
              <div className="rounded-full border border-black/8 bg-black/[0.03] px-4 py-2 text-sm font-medium text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                Copy-paste notification components for shadcn/ui teams
              </div>

              <div className="mt-8 space-y-6">
                <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-0.05em] text-zinc-950 sm:text-6xl lg:text-7xl lg:leading-[0.95] dark:text-white">
                  Build sharper notification UI with components you can own.
                </h1>
                <p className="mx-auto max-w-3xl text-lg leading-8 text-zinc-600 sm:text-xl sm:leading-9 dark:text-zinc-300">
                  Source-available React components for notification items,
                  inboxes, centers, and toasts. Bring the code into your app,
                  keep full control, and shape every detail to your product.
                </p>
              </div>

              <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/docs"
                  className="inline-flex min-w-44 items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Get started
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/docs/components/notification-item"
                  className="inline-flex min-w-44 items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-6 py-3.5 text-base font-semibold text-zinc-900 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  Explore components
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                {heroStack.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                  >
                    <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20 sm:px-6 lg:px-8">
          <section className="grid gap-4 md:grid-cols-3">
            {focusAreas.map((item) => (
              <div
                key={item}
                className="rounded-[1.75rem] border border-zinc-200/80 bg-white/80 p-6 text-base leading-7 text-zinc-700 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                {item}
              </div>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-zinc-200/80 bg-white/80 p-8 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Focused on notification-heavy product components
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-zinc-600 dark:text-zinc-300">
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

            <div className="rounded-[2rem] border border-zinc-200/80 bg-zinc-950 p-8 text-zinc-100 shadow-[0_20px_40px_rgba(15,23,42,0.16)] dark:border-white/10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Quick start
              </p>
              <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-zinc-200">
                <code>{`pnpm dlx bela-ui add notification-item`}</code>
              </pre>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              Start with these pages
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {docsLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[1.75rem] border border-zinc-200/80 bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:hover:border-white/20 dark:hover:bg-white/[0.05]"
                >
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
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
