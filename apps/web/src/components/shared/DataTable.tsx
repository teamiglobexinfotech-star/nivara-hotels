import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Search,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DataTable } from "@/types/shared.types";

export function DataTable<T extends Record<string, any>>({
  response,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  filters = [],
  enablePagination = true,
  onPageChange,
  onSearchChange,
  onFilterChange,
  isLoading = false,
  isError = false,
  errorMessage = "Failed to load data. Please try again.",
  emptyMessage = "No results found.",
}: DataTable<T>) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<
    Record<string, string>
  >({});
  const [localPage, setLocalPage] = React.useState(1);

  const items = response?.items ?? [];
  const meta = response?.meta || response?.pagination;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setLocalPage(1);
    onSearchChange?.(value);
  };

  const handleFilterSelect = (key: string, value: string) => {
    const updated = {
      ...filterValues,
      [key]: value,
    };

    setFilterValues(updated);
    setLocalPage(1);
    onFilterChange?.(updated);
  };

  const handlePage = (page: number) => {
    setLocalPage(page);
    onPageChange?.(page);
  };

  /**
   * Client-side fallback filtering.
   * Server-side filtering takes precedence when callbacks are provided.
   */
  const filteredItems = React.useMemo(() => {
    return items.filter((row) => {
      if (searchKey && searchQuery && !onSearchChange) {
        const value = String(row[searchKey] ?? "").toLowerCase();

        if (!value.includes(searchQuery.toLowerCase())) {
          return false;
        }
      }

      for (const filter of filters) {
        const selectedValue = filterValues[filter.key];

        if (
          selectedValue &&
          selectedValue.toLowerCase() !== "all" &&
          !onFilterChange
        ) {
          const rowValue = String(row[filter.key] ?? "").toLowerCase();

          if (rowValue !== selectedValue.toLowerCase()) {
            return false;
          }
        }
      }

      return true;
    });
  }, [
    items,
    searchKey,
    searchQuery,
    filters,
    filterValues,
    onSearchChange,
    onFilterChange,
  ]);

  const currentPage = meta?.page || localPage;

  const totalPages = meta?.totalPages
    ? meta.totalPages
    : Math.max(1, Math.ceil(filteredItems.length / (meta?.limit || 5)));

  return (
    <div className="w-full space-y-4">
      {/* ============================================================
          TOOLBAR
      ============================================================ */}
      {(searchKey || filters.length > 0) && (
        <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          {searchKey && (
            <div className="group relative w-full sm:max-w-sm">
              <Search className="absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground" />

              <Input
                value={searchQuery}
                placeholder={searchPlaceholder}
                onChange={(event) => handleSearch(event.target.value)}
                className="h-10 border-border/70 bg-background pl-9 shadow-none transition-all placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/10"
              />
            </div>
          )}

          {/* Filters */}
          {filters.length > 0 && (
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
              {filters.map((filter) => (
                <Select
                  key={filter.key}
                  value={filterValues[filter.key] || "ALL"}
                  onValueChange={(value) =>
                    handleFilterSelect(filter.key, value)
                  }
                >
                  <SelectTrigger className="h-10 min-w-35 border-border/70 bg-background shadow-none transition-colors hover:bg-muted/50">
                    <SelectValue placeholder={filter.placeholder} />
                  </SelectTrigger>

                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label.charAt(0).toUpperCase() +
                          option.label.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          TABLE
      ============================================================ */}
      <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_1px_2px_hsl(var(--foreground)/0.04)]">
        <Table>
          {/* Header */}
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`h-11 px-4 text-xs font-semibold tracking-wide whitespace-nowrap text-muted-foreground uppercase ${column.className || ""} `}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* ======================================================
                LOADING
            ====================================================== */}
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex} className="border-b border-border/50">
                  {columns.map((_, columnIndex) => (
                    <TableCell key={columnIndex} className="px-4 py-4">
                      <div
                        className="h-4 animate-pulse rounded-md bg-muted"
                        style={{
                          width:
                            columnIndex === 0
                              ? "70%"
                              : columnIndex === columns.length - 1
                                ? "40%"
                                : "55%",
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              /* ======================================================
                  ERROR
              ====================================================== */
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 px-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <AlertCircle className="h-5 w-5" />
                    </div>

                    <p className="text-sm font-medium">Something went wrong</p>

                    <p className="mt-1 max-w-sm text-center text-xs text-muted-foreground">
                      {errorMessage}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
              /* ======================================================
                  EMPTY
              ====================================================== */
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 px-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Inbox className="h-5 w-5" />
                    </div>

                    <p className="text-sm font-medium">{emptyMessage}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              /* ======================================================
                  DATA
              ====================================================== */
              filteredItems.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="group relative border-b border-border/50 transition-colors duration-150 last:border-b-0 hover:bg-muted/35"
                >
                  {columns.map((column, columnIndex) => (
                    <TableCell
                      key={columnIndex}
                      className={`px-4 py-4 align-middle text-sm ${column.className || ""} `}
                    >
                      {column.render
                        ? column.render(row)
                        : String(
                            (row as Record<string, unknown>)[column.key] ?? ""
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* ============================================================
            PAGINATION
        ============================================================ */}
        {enablePagination && !isLoading && !isError && (
          <div className="flex flex-col gap-3 border-t border-border/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Result information */}
            <p className="text-xs text-muted-foreground">
              {meta ? (
                <>
                  Page{" "}
                  <span className="font-medium text-foreground">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {totalPages}
                  </span>
                  <span className="mx-1.5 text-border">•</span>
                  {meta.total} total
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">
                    {filteredItems.length}
                  </span>{" "}
                  results
                </>
              )}
            </p>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePage(Math.max(currentPage - 1, 1))}
                disabled={currentPage <= 1}
                className="h-8 px-2.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft className="mr-1 h-3.5 w-3.5" />
                Previous
              </Button>

              <div className="flex h-8 min-w-8 items-center justify-center rounded-md bg-muted px-2 text-xs font-medium text-foreground">
                {currentPage}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handlePage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage >= totalPages}
                className="h-8 px-2.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Next
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
