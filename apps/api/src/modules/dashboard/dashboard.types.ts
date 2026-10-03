import {
  BookingStatus,
  KpiStat,
  MaintenanceReportCategory,
  MaintenanceReportPriority,
} from '../../types';

export type TodaysArrival = {
  id: string;
  booking: string;
  customer: string;
  room: string;
  checkIn: string;
  status: BookingStatus;
};

export type TodaysDeparture = {
  id: string;
  booking: string;
  customer: string;
  room: string;
  checkOut: string;
  status: BookingStatus;
};

export type TodaysSchedule = {
  arrivals: TodaysArrival[];
  departures: TodaysDeparture[];
};

export type AttentionItem = {
  id: string;
  item: string;
  type: MaintenanceReportCategory;
  room: string;
  priority: MaintenanceReportPriority;
  assignedTo: string;
};

export type ManagementDashboard = {
  stats: KpiStat[];
  schedule: TodaysSchedule;
  attentionItems: AttentionItem[];
};

export type CustomerDashboardBooking = {
  id: string;
  booking: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
};

export type CustomerDashboard = {
  stats: KpiStat[];
  recentBookings: CustomerDashboardBooking[];
  upcomingBookings: CustomerDashboardBooking[];
};
