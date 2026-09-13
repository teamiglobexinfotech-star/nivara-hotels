import type { MaintenanceTicket } from "@/types/maintenance.types";

export const recentMaintenance: MaintenanceTicket[] = [
  {
    id: "MN-108",
    room: {
      number: "304",
      type: "Suite",
    },
    issue: {
      name: "Air Conditioner Malfunction",
    },
    reportedBy: {
      name: "Rahul S.",
      role: "Guest",
      reportedAt: "18m ago",
    },
    priority: "urgent",
    status: "pending",
  },

  {
    id: "MN-107",
    room: {
      number: "212",
      type: "Deluxe",
    },
    issue: {
      name: "Bathroom Pipe Leakage",
    },
    reportedBy: {
      name: "Sunita",
      role: "Housekeeping",
      reportedAt: "45m ago",
    },
    priority: "urgent",
    status: "in-progress",
  },

  {
    id: "MN-106",
    room: {
      number: "118",
      type: "Standard",
    },
    issue: {
      name: "Hot Water Pressure Low",
    },
    reportedBy: {
      name: "David K.",
      role: "Guest",
      reportedAt: "2h ago",
    },
    priority: "high",
    status: "assigned",
  },

  {
    id: "MN-105",
    room: {
      number: "108",
      type: "Deluxe",
    },
    issue: {
      name: "Balcony Door Lock Stiff",
    },
    reportedBy: {
      name: "Front Desk",
      role: "Front Desk",
      reportedAt: "2h ago",
    },
    priority: "medium",
    status: "in-progress",
  },

  {
    id: "MN-104",
    room: {
      number: "Lobby",
      type: "Public Area",
    },
    issue: {
      name: "Main Chandelier Dimmer Flickering",
    },
    reportedBy: {
      name: "Manager",
      role: "Manager",
      reportedAt: "4h ago",
    },
    priority: "low",
    status: "assigned",
  },
];
