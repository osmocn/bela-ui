import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="inline-flex items-end gap-2 leading-none">
          <img src="/images/bela/bela-ui.svg" alt="Bela" className="h-4" />
        </div>
      ),
    },
    searchToggle: {
      enabled: false,
    },
  };
}
