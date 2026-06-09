import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { DocsComponentsGallery } from "./docs-components-gallery";
import { PreviewComponents } from "./preview/preview-components";

import NotificationItemDemo from "./notification-item-demo";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    ...components,
    DocsComponentsGallery,
    PreviewComponents,
    NotificationItemDemo,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
