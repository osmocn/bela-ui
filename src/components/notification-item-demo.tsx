import {
  type Notification,
  NotificationItem,
} from "@/components/bela-ui/notification-item";

export default function NotificationItemDemo() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card divide-y divide-border">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

// sample data for demonstration purposes

export const notifications: Notification[] = [
  {
    id: "1",
    title: "New comment on your post",
    body: "Sarah commented: 'This design looks amazing!'",
    actionUrl: null,
    readAt: null,
    archivedAt: null,
    createdAt: "2026-06-09T09:12:00.000Z",
  },
  {
    id: "2",
    title: "Your deployment succeeded",
    body: "Production deployment completed successfully.",
    actionUrl: null,
    readAt: "2026-06-09T06:35:00.000Z",
    archivedAt: null,
    createdAt: "2026-06-09T05:48:00.000Z",
  },
  {
    id: "3",
    title: "New follower",
    body: "Alex started following you.",
    actionUrl: null,
    readAt: null,
    archivedAt: null,
    createdAt: "2026-06-08T18:20:00.000Z",
  },
];
