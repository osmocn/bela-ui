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
import { getMDXComponents } from "@/components/mdx";
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
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <Script
        id={`docs-structured-data-${slug.join("-") || "index"}`}
        type="application/ld+json"
      >
        {JSON.stringify(structuredData)}
      </Script>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
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
