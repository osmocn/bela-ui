import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  className?: string;
}

export function NotificationItem({
  notification,
  className,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        "relative flex gap-3 rounded-lg border p-4",
        !notification.read && "bg-muted/50",
        className
      )}
    >
      {!notification.read && (
        <span className="bg-primary absolute right-4 top-4 h-2 w-2 rounded-full" />
      )}

      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
        <Bell className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-medium">{notification.title}</p>

        {notification.description && (
          <p className="text-muted-foreground mt-1 text-sm">
            {notification.description}
          </p>
        )}

        <p className="text-muted-foreground mt-2 text-xs">
          {notification.createdAt.toLocaleString()}
        </p>
      </div>
    </div>
  );
}