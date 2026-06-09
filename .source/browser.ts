// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"ai-usage.mdx": () => import("../content/docs/ai-usage.mdx?collection=docs"), "cli.mdx": () => import("../content/docs/cli.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "prerequisites.mdx": () => import("../content/docs/prerequisites.mdx?collection=docs"), "components/index.mdx": () => import("../content/docs/components/index.mdx?collection=docs"), "components/notification-item.mdx": () => import("../content/docs/components/notification-item.mdx?collection=docs"), }),
};
export default browserCollections;