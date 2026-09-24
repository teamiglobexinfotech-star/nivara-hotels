export interface ApiListResponse<T> {
  data: T[];
  message?: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ListResponse<T> {
  data: T;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type ApiMessageResponse = { message: string };

export type KpiStat = {
  id: string;
  iconKey: string;
  title: string;
  value: string | number;
  details: string;
};
