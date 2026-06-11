import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { DocsComponentsGallery } from "@/components/docs-components-gallery";

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

export default function HomePage() {
  return (
    <>
      <Script id="home-structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <main className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.14),transparent_32%),radial-gradient(circle_at_bottom,rgba(24,24,27,0.08),transparent_42%)] dark:bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_34%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_40%)]" />

        <section className="mx-auto flex-col flex items-center justify-center w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
          <div className="mt-8 space-y-6">
            <h1 className="max-w-5xl text-center text-balance text-5xl font-semibold tracking-[-0.05em] text-zinc-950 sm:text-5xl lg:text-6xl dark:text-white">
              Open-source <strong className="font-bold">notification</strong> components for React
            </h1>
            <p className="mx-auto max-w-3xl text-center text-lg leading-8 text-zinc-600 sm:text-xl dark:text-zinc-300">
              Build inboxes, notification centers, activity feeds, and toasts
              with source-available React components that you can fully
              customize
            </p>
          </div>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="text-[17px] px-4 py-2 h-fit" asChild>
              <Link href="/docs">
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="text-[17px] px-4 py-2 h-fit"
              variant="outline"
              asChild
            >
              <Link
                href={siteConfig.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/github.svg"
                  alt="GitHub"
                  className="size-[18px] invert-100 mr-0.5"
                />
                Github  
              </Link>
            </Button>
          </div>
        </section>
        <section className="max-w-5xl mx-auto">
        <DocsComponentsGallery />
        </section>
      </main>
    </>
  );
}
