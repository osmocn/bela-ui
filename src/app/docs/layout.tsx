import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      containerProps={{ className: "[--fd-banner-height:4rem]" }}
      sidebar={{ collapsible: false }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
