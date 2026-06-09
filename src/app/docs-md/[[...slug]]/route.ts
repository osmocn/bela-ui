import { getDocMarkdown } from "@/lib/docs-markdown";
import { source } from "@/lib/source";

export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const markdown = await getDocMarkdown(slug);

  if (!markdown) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
