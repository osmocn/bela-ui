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
        "relative not-prose bg-neutral-50 dark:bg-neutral-950/75 border ring-0",
        className,
      )}
    >
      <CardContent className="flex min-h-50 items-center justify-center p-6">
        {children}
      </CardContent>
    </Card>
  );
}
