import { Marquee } from "@/registry/spell-ui/marquee";

const notifications = [
  { text: "New message received", time: "2 min ago", type: "info" },
  { text: "Upload completed", time: "5 min ago", type: "success" },
  { text: "Meeting starting soon", time: "10 min ago", type: "warning" },
  { text: "Task completed", time: "15 min ago", type: "success" },
  { text: "New follower", time: "20 min ago", type: "info" },
  { text: "System update available", time: "30 min ago", type: "warning" },
];

export function Demo() {
  return (
    <div className="h-[300px]">
      <Marquee direction="up" className="h-full">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="mx-4 my-2 flex items-center gap-3 rounded-md border bg-card p-3"
          >
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                notification.type === "success" && "bg-green-500",
                notification.type === "warning" && "bg-yellow-500",
                notification.type === "info" && "bg-blue-500",
              )}
            >
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.text}</p>
              <p className="text-xs text-muted-foreground">
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
