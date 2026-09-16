interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  timeAgo: string;
  type: "payment" | "booking" | "housekeeping" | "maintenance" | "registration";
}

// Recent Activity Feed (5 items as specified)
const activities: ActivityItem[] = [
  {
    id: "act-1",
    title: "Payment received",
    detail: "Rahul Sharma · ₹14,200",
    timeAgo: "10 min ago",
    type: "payment",
  },
  {
    id: "act-2",
    title: "Booking confirmed",
    detail: "Priya Singh · Room 405",
    timeAgo: "25 min ago",
    type: "booking",
  },
  {
    id: "act-3",
    title: "Room cleaned",
    detail: "208 · Housekeeping",
    timeAgo: "40 min ago",
    type: "housekeeping",
  },
  {
    id: "act-4",
    title: "Maintenance completed",
    detail: "Room 118",
    timeAgo: "1 hr ago",
    type: "maintenance",
  },
  {
    id: "act-5",
    title: "Customer registered",
    detail: "Anika Patel",
    timeAgo: "2 hrs ago",
    type: "registration",
  },
];

export function RecentActivity() {
  return (
    <section
      id="recent-activity-section"
      className="flex flex-col justify-between space-y-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6"
    >
      <div className="space-y-3">
        <div>
          <h2 className="font-serif text-lg font-medium text-foreground sm:text-xl">
            Recent Activity
          </h2>
          <p className="text-xs font-light text-muted-foreground">
            Live audit trace across front desk, finance, and housekeeping.
          </p>
        </div>

        <div className="divide-y divide-border/60">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-xs transition-colors hover:bg-muted/30"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <div className="truncate">
                  <span className="font-medium text-foreground">
                    {act.title}
                  </span>
                  <span className="text-muted-foreground"> — </span>
                  <span className="text-muted-foreground">{act.detail}</span>
                </div>
              </div>
              <span className="shrink-0 text-[11px] font-light text-muted-foreground">
                {act.timeAgo}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
        Auto-refreshes every 60 seconds · All timestamps local IST.
      </p>
    </section>
  );
}
