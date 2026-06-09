import Image from "next/image";
import { cn } from "@/lib/utils";

interface ThemeAdaptiveImageProps {
  alt: string;
  className?: string;
  darkSrc?: string;
  lightSrc: string;
  sizes: string;
}

export function ThemeAdaptiveImage({
  alt,
  className,
  darkSrc,
  lightSrc,
  sizes,
}: ThemeAdaptiveImageProps) {
  return (
    <>
      <Image
        src={lightSrc}
        alt={alt}
        fill
        className={cn(className, darkSrc && "dark:hidden")}
        sizes={sizes}
      />
      {darkSrc ? (
        <Image
          src={darkSrc}
          alt={alt}
          fill
          className={cn("hidden dark:block", className)}
          sizes={sizes}
        />
      ) : null}
    </>
  );
}
