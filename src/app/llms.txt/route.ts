import { toRawDocPath } from "@/lib/docs-markdown";
import { absoluteUrl, humanizeSlugSegment, siteConfig } from "@/lib/site";
import { source } from "@/lib/source";

function getDocTitle(page: {
  url: string;
  data: {
    title?: string | null;
  };
}) {
  return (
    page.data.title?.trim() ||
    (page.url === "/docs"
      ? "Introduction"
      : humanizeSlugSegment(
          page.url.split("/").filter(Boolean).at(-1) ?? "Docs",
        ))
  );
}

function formatDocEntry(page: {
  url: string;
  data: {
    title?: string | null;
    description?: string | null;
  };
}) {
  const title = getDocTitle(page);
  const description = page.data.description?.trim();

  return description
    ? `- [${title}](${absoluteUrl(page.url)}): ${description}`
    : `- [${title}](${absoluteUrl(page.url)})`;
}

function formatRawDocEntry(page: {
  url: string;
  data: {
    title?: string | null;
    description?: string | null;
  };
}) {
  const title = getDocTitle(page);
  const description = page.data.description?.trim();

  return description
    ? `- [${title}](${absoluteUrl(toRawDocPath(page.url))}): ${description}`
    : `- [${title}](${absoluteUrl(toRawDocPath(page.url))})`;
}

export function GET() {
  const docsPages = source
    .getPages()
    .sort((a, b) => a.url.localeCompare(b.url));

  const componentPages = docsPages.filter((page) =>
    page.url.startsWith("/docs/components/"),
  );
  const guidePages = docsPages.filter(
    (page) =>
      page.url === "/docs" ||
      page.url === "/docs/prerequisites" ||
      page.url === "/docs/ai-usage" ||
      page.url === "/docs/cli" ||
      page.url === "/docs/components",
  );

  const lines = [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} is a source-available notification UI library for React, Next.js, shadcn/ui, and Tailwind CSS.`,
    "Use the docs below as the canonical reference for installation, component usage, and customization guidance.",
    "",
    "## Project",
    `- Site: ${absoluteUrl("/")}`,
    `- Docs: ${absoluteUrl("/docs")}`,
    `- Repository: ${siteConfig.repoUrl}`,
    "",
    "## Guidance for Language Models",
    "- Bela UI focuses on notification-related product UI such as notification items, inboxes, notification centers, preferences, and toasts.",
    "- Components are distributed as source code that is meant to be copied into an application and customized there.",
    "- Preserve existing component APIs when extending components.",
    "- Follow shadcn/ui conventions and prefer TypeScript-first examples.",
    "- Raw markdown versions of the docs are available by appending .md to docs URLs, for example /docs/components/notification-item.md.",
    "",
    "## Key Docs",
    ...guidePages.map(formatDocEntry),
    "",
    "## Component Docs",
    ...componentPages.map(formatDocEntry),
    "",
    "## Raw Markdown Docs",
    ...guidePages.map(formatRawDocEntry),
    ...componentPages.map(formatRawDocEntry),
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
