import {
  RecentActivity,
  type ActivityItem,
} from "@/components/common/RecentActivity";

const recentActivities: ActivityItem[] = [
  {
    id: "ACT-1001",
    title: "Payment received · ₹14,200",
    description: "Room 204 (Rahul Sharma)",
    time: "10 min ago",
    type: "payment",
  },
  {
    id: "ACT-1002",
    title: "Booking confirmed · Room 405",
    description: "Direct online reservation",
    time: "25 min ago",
    type: "booking",
  },
  {
    id: "ACT-1003",
    title: "Room 208 cleaned · Housekeeping",
    description: "Staff: Sunita Devi",
    time: "40 min ago",
    type: "housekeeping",
  },
  {
    id: "ACT-1004",
    title: "Keycard issued · Room 204",
    description: "Front desk terminal 1",
    time: "1 hr ago",
    type: "keycard",
  },
  {
    id: "ACT-1005",
    title: "Maintenance ticket raised · Room 304",
    description: "AC Malfunction logged",
    time: "1.5 hr ago",
    type: "maintenance",
  },
];

export function DashboardRecentActivity() {
  return <RecentActivity activities={recentActivities} />;
}
