"use client";

import { getBreadcrumbItemsFromPath } from "fumadocs-core/breadcrumb";
import { useTreeContext, useTreePath } from "fumadocs-ui/contexts/tree";
import type { BreadcrumbProps } from "fumadocs-ui/layouts/docs/page";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment, useMemo } from "react";

export function Breadcrumb({
  includePage,
  includeRoot,
  includeSeparator,
  className,
  ...props
}: BreadcrumbProps) {
  const path = useTreePath();
  const { root } = useTreeContext();
  const breadcrumbRoot = root as Parameters<typeof getBreadcrumbItemsFromPath>[0];
  const items = useMemo(
    () =>
      getBreadcrumbItemsFromPath(breadcrumbRoot, path, {
        includePage,
        includeRoot,
        includeSeparator,
      }).map((item) => ({
        ...item,
        name: typeof item.name === "string" ? item.name.trim() : item.name,
      })),
    [root, includePage, includeRoot, includeSeparator, path],
  );

  if (items.length === 0) return null;

  return (
    <div
      className={[
        "-mb-3 flex flex-row items-center gap-1 text-sm font-medium text-fd-muted-foreground",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {items.map((item, i) => (
        <Fragment key={i}>
          {i !== 0 && (
            <ChevronRight className="size-4 shrink-0 rtl:rotate-180" />
          )}
          {item.url ? (
            <Link
              href={item.url}
              className="truncate hover:text-fd-accent-foreground last:font-semibold last:text-neutral-900 dark:last:text-neutral-300"
            >
              {item.name}
            </Link>
          ) : (
            <span className="truncate">{item.name}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
