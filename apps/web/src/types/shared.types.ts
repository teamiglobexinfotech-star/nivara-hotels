import type { LucideIcon } from "lucide-react";

import type { UserProfile } from "./user.types";

export type AuthCTX = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
};

export type HousekeepingStatus = "CLEAN" | "DIRTY" | "CLEANING";
export type OccupancyStatus =
  "VACANT" | "RESERVED" | "OCCUPIED" | "OUT_OF_ORDER";

export type UserRole = "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER";
export type StaffCategory =
  "RECEPTIONIST" | "HOUSEKEEPER" | "SECURITY_GUARD" | "WAITER";
// ============== KPI CARD START  ==============
export interface KpiItem {
  id: string | number;
  iconKey: LucideIcon;
  title: string;
  value: string | number;
  details: string;
}

export interface KpiCard {
  item: KpiItem;
  className?: string;
}
// ============== KPI CARD END  ==============

// ============== DATA TABLE START  ==============

export interface Column<T> {
  header: string;
  key: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  placeholder: string;
  options: FilterOption[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type ListParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export interface ApiResponse<T> {
  items: T[] | [];
  meta?: PaginationMeta;
  pagination?: PaginationMeta;
}

export interface DataTable<T> {
  response: ApiResponse<T>;
  columns: Column<T>[];

  // Optional features
  searchKey?: string;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  enablePagination?: boolean;

  // Callbacks for server-side operations
  onPageChange?: (page: number) => void;
  onSearchChange?: (query: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;

  // States
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
}
// ============== DATA TABLE END  ==============
