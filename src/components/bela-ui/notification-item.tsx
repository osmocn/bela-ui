"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

export type Notification = {
  id: string;
  createdAt: string;
  title: string;
  body: string | null;
  actionUrl: string | null;
  readAt: string | null;
  archivedAt: string | null;
};

export interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem = React.memo(function NotificationItem({
  notification,
}: NotificationItemProps) {
  const unread = notification.readAt === null;

  const content = (
    <>
      <div className="mt-1 shrink-0">
        <div
          className={`size-2 rounded-full ${
            unread ? "bg-sky-600 dark:bg-sky-400" : "bg-border"
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={
              unread
                ? "truncate text-sm font-semibold text-foreground"
                : "truncate text-sm font-medium text-foreground/80"
            }
          >
            {notification.title}
          </h3>

          <time className="shrink-0 text-xs text-muted-foreground">
            {formatRelativeDate(notification.createdAt)}
          </time>
        </div>

        {notification.body && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {notification.body}
          </p>
        )}
      </div>
    </>
  );

  return (
    <div className="group p-3 transition-colors hover:bg-accent/60">
      {notification.actionUrl ? (
        <Link
          href={notification.actionUrl}
          className="flex w-full gap-3 text-left transition-colors"
        >
          {content}
        </Link>
      ) : (
        <div className="flex w-full gap-3 text-left transition-colors">
          {content}
        </div>
      )}

      <div className="ml-5 mt-2 flex items-center gap-1">
        {!notification.readAt && (
          <Button size="sm" variant="secondary" className="h-fit px-2 py-1">
            Mark as read
          </Button>
        )}

        {!notification.archivedAt && (
          <Button size="sm" variant="outline" className="h-fit px-2 py-1">
            Archive
          </Button>
        )}
      </div>
    </div>
  );
});

NotificationItem.displayName = "NotificationItem";

// ---

function formatRelativeDate(date: string | Date): string {
  const target = new Date(date);
  const targetTime = target.getTime();

  if (Number.isNaN(targetTime)) {
    return "unknown time";
  }

  const now = new Date();
  const diffMs = targetTime - now.getTime();
  const absDiffMs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (absDiffMs < minute) {
    return "just now";
  }

  if (absDiffMs < hour) {
    return rtf.format(Math.round(diffMs / minute), "minute");
  }

  if (absDiffMs < day) {
    return rtf.format(Math.round(diffMs / hour), "hour");
  }

  if (absDiffMs < week) {
    return rtf.format(Math.round(diffMs / day), "day");
  }

  if (absDiffMs < 26 * week) {
    return rtf.format(Math.round(diffMs / week), "week");
  }

  return rtf.format(Math.round(diffMs / month), "month");
}
