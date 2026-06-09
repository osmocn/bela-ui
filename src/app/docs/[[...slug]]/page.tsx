import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Breadcrumb } from "@/components/breadcrumb";
import DocAIOpener from "@/components/doc-ai-opener";
import { getMDXComponents } from "@/components/mdx";
import { toRawDocPath } from "@/lib/docs-markdown";
import { absoluteUrl, humanizeSlugSegment, siteConfig } from "@/lib/site";
import { source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const slug = params.slug ?? [];
  const pathname = slug.length > 0 ? `/docs/${slug.join("/")}` : "/docs";
  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: siteConfig.name,
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Docs",
      item: absoluteUrl("/docs"),
    },
    ...slug.slice(0, -1).map((segment, index) => ({
      "@type": "ListItem",
      position: index + 3,
      name: humanizeSlugSegment(segment),
      item: absoluteUrl(`/docs/${slug.slice(0, index + 1).join("/")}`),
    })),
    {
      "@type": "ListItem",
      position: slug.length + 2,
      name: page.data.title,
      item: absoluteUrl(pathname),
    },
  ];
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    },
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: page.data.title,
      description: page.data.description,
      url: absoluteUrl(pathname),
      about: [
        siteConfig.name,
        "notification UI library",
        "React UI components",
        "shadcn/ui",
      ],
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: absoluteUrl("/"),
      },
    },
  ];

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ includeRoot: true, includePage: true }}
      footer={{
        className:
          "my-8 [&_a>p:last-child]:hidden [&_a]:bg-muted/50 [&_a]:py-2 [&_a]:w-fit text-sm flex justify-between",
      }}
      slots={{ breadcrumb: Breadcrumb }}
    >
      <Script
        id={`docs-structured-data-${slug.join("-") || "index"}`}
        type="application/ld+json"
      >
        {JSON.stringify(structuredData)}
      </Script>
      <div className="flex items-center justify-between">
        <DocsTitle className="text-4xl font-bold tracking-tight mt-4">
          {page.data.title}
        </DocsTitle>
        <div className="relative top-1 hidden md:inline-flex">
          <DocAIOpener
            markdownPath={toRawDocPath(pathname)}
            pagePath={pathname}
          />
        </div>
      </div>
      <DocsDescription className="text-base">
        {page.data.description}
      </DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const slug = params.slug ?? [];
  const pathname = slug.length > 0 ? `/docs/${slug.join("/")}` : "/docs";

  return {
    title: page.data.title,
    description: page.data.description,
    keywords: [
      ...siteConfig.keywords,
      page.data.title,
      ...(slug.length > 0 ? slug : ["docs"]),
    ],
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: `${page.data.title} | Bela UI`,
      description: page.data.description,
      url: pathname,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.data.title} | Bela UI`,
      description: page.data.description,
    },
  };
}
