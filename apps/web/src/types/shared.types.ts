import type { LucideIcon } from "lucide-react";

// ============== KPI CARD START  ==============
export interface KpiItem {
  id: string | number;
  icon: LucideIcon;
  title: string;
  value: string | number;
  detail: string;
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

export interface ApiResponse<T> {
  items: T[];
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
