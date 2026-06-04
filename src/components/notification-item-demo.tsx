import { NotificationItem } from "@/components/bela-ui/notification-item";

export default function NotificationItemDemo() {
  return (
    <div className="w-full max-w-md">
      <NotificationItem
        notification={{
          id: "1",
          title: "New comment",
          description: "Sarah commented on your post.",
          createdAt: new Date("2026-04-07T14:16:00"),
          read: false,
        }}
      />
    </div>
  );
}