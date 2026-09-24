import type { MaintenanceList } from "./maintenance.types";

export const dummyMaintenanceKpiData = [
  {
    id: "total-reports",
    iconKey: "ClipboardList",
    title: "Total Reports",
    value: 0,
    details: "All maintenance reports",
  },
  {
    id: "in-progress",
    iconKey: "Wrench",
    title: "In Progress",
    value: 0,
    details: "Currently being worked on",
  },
  {
    id: "completed",
    iconKey: "CheckCircle",
    title: "Completed",
    value: 0,
    details: "Successfully completed",
  },
  {
    id: "high-priority",
    iconKey: "AlertTriangle",
    title: "High Priority",
    value: 0,
    details: "Reports requiring attention",
  },
];

export const dummyMaintenanceReportsData: MaintenanceList[] = [
  {
    id: "mnt_001",
    reportReference: "MR-2026-001",
    room: {
      id: "room_204",
      name: "Deluxe King Room",
      roomNumber: "204",
    },
    category: "PLUMBING",
    priority: "HIGH",
    reporter: {
      id: "usr_101",
      fullName: "Rahul Sharma",
    },
    reportedAt: new Date("2026-09-24T09:15:00"),
    assignedTo: {
      id: "usr_201",
      fullName: "Amit Kumar",
    },
    status: "IN_PROGRESS",
  },
  {
    id: "mnt_002",
    reportReference: "MR-2026-002",
    room: {
      id: "room_108",
      name: "Standard Twin Room",
      roomNumber: "108",
    },
    category: "ELECTRICAL",
    priority: "MEDIUM",
    reporter: {
      id: "usr_102",
      fullName: "Priya Verma",
    },
    reportedAt: new Date("2026-09-24T08:40:00"),
    assignedTo: {
      id: "usr_202",
      fullName: "Vikash Singh",
    },
    status: "ASSIGNED",
  },
  {
    id: "mnt_003",
    reportReference: "MR-2026-003",
    room: {
      id: "room_315",
      name: "Executive Suite",
      roomNumber: "315",
    },
    category: "HVAC",
    priority: "URGENT",
    reporter: {
      id: "usr_103",
      fullName: "Arjun Mehta",
    },
    reportedAt: new Date("2026-09-24T07:55:00"),
    assignedTo: {
      id: "usr_203",
      fullName: "Ravi Yadav",
    },
    status: "IN_PROGRESS",
  },
  {
    id: "mnt_004",
    reportReference: "MR-2026-004",
    room: {
      id: "room_412",
      name: "Deluxe Twin Room",
      roomNumber: "412",
    },
    category: "FURNITURE",
    priority: "LOW",
    reporter: {
      id: "usr_104",
      fullName: "Neha Gupta",
    },
    reportedAt: new Date("2026-09-23T17:20:00"),
    assignedTo: {
      id: "usr_204",
      fullName: "Suresh Patel",
    },
    status: "COMPLETED",
  },
  {
    id: "mnt_005",
    reportReference: "MR-2026-005",
    room: {
      id: "room_221",
      name: "Premium King Room",
      roomNumber: "221",
    },
    category: "APPLIANCE",
    priority: "HIGH",
    reporter: {
      id: "usr_105",
      fullName: "Ananya Singh",
    },
    reportedAt: new Date("2026-09-23T15:45:00"),
    assignedTo: {
      id: "usr_205",
      fullName: "Manoj Kumar",
    },
    status: "ASSIGNED",
  },
  {
    id: "mnt_006",
    reportReference: "MR-2026-006",
    room: {
      id: "room_106",
      name: "Standard King Room",
      roomNumber: "106",
    },
    category: "ELECTRICAL",
    priority: "URGENT",
    reporter: {
      id: "usr_106",
      fullName: "Rohit Mishra",
    },
    reportedAt: new Date("2026-09-23T12:10:00"),
    assignedTo: {
      id: "usr_206",
      fullName: "Deepak Sharma",
    },
    status: "RESOLVED",
  },
  {
    id: "mnt_007",
    reportReference: "MR-2026-007",
    room: {
      id: "room_307",
      name: "Executive King Room",
      roomNumber: "307",
    },
    category: "PLUMBING",
    priority: "MEDIUM",
    reporter: {
      id: "usr_107",
      fullName: "Kavita Joshi",
    },
    reportedAt: new Date("2026-09-22T18:30:00"),
    assignedTo: {
      id: "usr_207",
      fullName: "Rajesh Verma",
    },
    status: "COMPLETED",
  },
  {
    id: "mnt_008",
    reportReference: "MR-2026-008",
    room: {
      id: "room_509",
      name: "Presidential Suite",
      roomNumber: "509",
    },
    category: "HVAC",
    priority: "HIGH",
    reporter: {
      id: "usr_108",
      fullName: "Aditya Rao",
    },
    reportedAt: new Date("2026-09-22T14:05:00"),
    assignedTo: {
      id: "usr_208",
      fullName: "Nitin Kumar",
    },
    status: "IN_PROGRESS",
  },
  {
    id: "mnt_009",
    reportReference: "MR-2026-009",
    room: {
      id: "room_118",
      name: "Standard Twin Room",
      roomNumber: "118",
    },
    category: "FURNITURE",
    priority: "LOW",
    reporter: {
      id: "usr_109",
      fullName: "Sneha Patel",
    },
    reportedAt: new Date("2026-09-21T11:25:00"),
    assignedTo: {
      id: "usr_209",
      fullName: "Mohan Singh",
    },
    status: "RESOLVED",
  },
  {
    id: "mnt_010",
    reportReference: "MR-2026-010",
    room: {
      id: "room_403",
      name: "Deluxe King Room",
      roomNumber: "403",
    },
    category: "OTHER",
    priority: "MEDIUM",
    reporter: {
      id: "usr_110",
      fullName: "Pooja Agarwal",
    },
    reportedAt: new Date("2026-09-20T16:50:00"),
    assignedTo: {
      id: "usr_210",
      fullName: "Sanjay Yadav",
    },
    status: "REPORTED",
  },
];
