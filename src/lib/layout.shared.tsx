import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="inline-flex items-end gap-2 leading-none">
          <Image
            src="/images/bela/bela-ui.svg"
            alt="Bela UI logo"
            className="h-4 w-auto"
            width={72}
            height={16}
            priority
          />
        </div>
      ),
    },
    searchToggle: {
      enabled: false,
    },
  };
}
