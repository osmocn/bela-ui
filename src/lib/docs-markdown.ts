import { access, readFile } from "node:fs/promises";
import path from "node:path";

const docsRoot = path.join(process.cwd(), "content", "docs");

function getCandidatePaths(slug?: string[]) {
  if (!slug || slug.length === 0) {
    return ["index.mdx"];
  }

  const joined = slug.join("/");

  return [`${joined}.mdx`, path.join(joined, "index.mdx")];
}

async function resolveDocFilePath(slug?: string[]) {
  for (const candidate of getCandidatePaths(slug)) {
    const filePath = path.resolve(docsRoot, candidate);
    const relativePath = path.relative(docsRoot, filePath);

    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
      continue;
    }

    try {
      await access(filePath);
      return filePath;
    } catch {}
  }

  return null;
}

export async function getDocMarkdown(slug?: string[]) {
  const filePath = await resolveDocFilePath(slug);

  if (!filePath) {
    return null;
  }

  return readFile(filePath, "utf8");
}

export function toRawDocPath(pathname: string) {
  return pathname === "/docs" ? "/docs.md" : `${pathname}.md`;
}
