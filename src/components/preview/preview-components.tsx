"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PreviewProps {
  className?: string;
  children: React.ReactNode;
}

export function PreviewComponents({ className, children }: PreviewProps) {
  return (
    <Card
      className={cn(
        "relative not-prose bg-transparent border ring-0",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#221f1f_1px,transparent_1px)] bg-size-[16px_16px]" />
      <CardContent className="flex min-h-50 items-center justify-center p-6">
        {children}
      </CardContent>
    </Card>
  );
}
