"use client";

import { ChevronDown, Copy } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DocContext = {
  markdownUrl: string;
  pageUrl: string;
};

type DocAIOpenerProps = {
  markdownPath: string;
  pagePath: string;
};

type AIOpener = {
  label: string;
  baseUrl: string;
  buildPrompt: (context: DocContext) => string;
  buildUrl: (prompt: string) => string;
};

const createDocPrompt = ({
  markdownUrl,
  pageUrl,
}: DocContext) => `Use these documentation URLs as the source of truth.

Page URL: ${pageUrl}
Raw Markdown URL: ${markdownUrl}

Prefer the raw Markdown URL when you need the original content.
If you cannot access URLs directly, ask me to paste the Markdown.

Please help me understand, improve, summarize, or transform this document.`;

const createV0Prompt = ({
  markdownUrl,
  pageUrl,
}: DocContext) => `Build a polished web UI from this documentation source.

Requirements:
- Use Next.js, React, TypeScript, Tailwind, and shadcn/ui.
- Preserve the content structure from the source.
- Create a clean responsive layout.
- Include good typography and spacing.
- Make it feel production-ready.

Reference URLs:
- Page: ${pageUrl}
- Raw Markdown: ${markdownUrl}
- Use the raw Markdown URL as the source of truth when possible.
- If you cannot access URLs directly, ask me to paste the Markdown.`;

const aiOpeners: AIOpener[] = [
  {
    label: "Open in ChatGPT",
    baseUrl: "https://chatgpt.com",
    buildPrompt: createDocPrompt,
    buildUrl: (prompt) =>
      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    label: "Open in Claude",
    baseUrl: "https://claude.ai/new",
    buildPrompt: createDocPrompt,
    buildUrl: (prompt) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    label: "Open in v0",
    baseUrl: "https://v0.app",
    buildPrompt: createV0Prompt,
    buildUrl: (prompt) => `https://v0.app/?q=${encodeURIComponent(prompt)}`,
  },
  {
    label: "Open in Scira!!",
    baseUrl: "https://scira.ai",
    buildPrompt: createDocPrompt,
    buildUrl: (prompt) =>
      `https://scira.ai/?q=${encodeURIComponent(prompt)}&group=web`,
  },
];

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const toAbsoluteClientUrl = (path: string) =>
  new URL(path, window.location.origin).toString();

const DocAIOpener = ({ markdownPath, pagePath }: DocAIOpenerProps) => {
  const markdownPromiseRef = useRef<Promise<string> | null>(null);

  const showMarkdownLoadError = () => {
    toast("Could not load markdown", {
      description: "Please try again in a moment.",
    });
  };

  const loadMarkdown = async () => {
    if (!markdownPromiseRef.current) {
      markdownPromiseRef.current = fetch(markdownPath).then(
        async (response) => {
          if (!response.ok) {
            markdownPromiseRef.current = null;
            throw new Error("Failed to load markdown");
          }

          return response.text();
        },
      );
    }

    return markdownPromiseRef.current;
  };

  const getDocContext = (): DocContext => ({
    markdownUrl: toAbsoluteClientUrl(markdownPath),
    pageUrl: toAbsoluteClientUrl(pagePath),
  });

  const copyMarkdown = async () => {
    try {
      const markdown = await loadMarkdown();

      await navigator.clipboard.writeText(markdown);

      toast("Markdown copied to clipboard!", {
        description: "You can now paste it into your AI of choice.",
      });
    } catch {
      showMarkdownLoadError();
    }
  };

  const openMarkdown = () => {
    openInNewTab(markdownPath);
  };

  const openWithPrompt = (opener: AIOpener) => {
    const prompt = opener.buildPrompt(getDocContext());
    const url = opener.buildUrl(prompt);

    openInNewTab(url);

    toast(opener.label, {
      description: "Opening with the documentation URLs included.",
    });
  };

  const popoverActions = [
    {
      label: "View as Markdown",
      onClick: openMarkdown,
    },
    ...aiOpeners.map((item) => ({
      label: item.label,
      onClick: () => openWithPrompt(item),
    })),
  ];

  return (
    <div className="relative top-1 flex items-center">
      <div className="inline-flex">
        <Button
          type="button"
          variant="secondary"
          className="gap-2 px-3 cursor-pointer"
          onClick={copyMarkdown}
        >
          <Copy className="h-4 w-4" />
          Copy Markdown
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
              size="icon"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-[190px] p-1">
            <div className="flex flex-col">
              {popoverActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DocAIOpener;
