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

  const items = response?.items;
  const meta = response?.meta || response?.pagination;

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    if (onSearchChange) onSearchChange(val);
  };

  const handleFilterSelect = (key: string, val: string) => {
    const updated = { ...filterValues, [key]: val };
    setFilterValues(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handlePage = (newPage: number) => {
    setLocalPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  // Client-side fallback filtering if server callbacks aren't provided
  const filteredItems = React.useMemo(() => {
    return items.filter((row) => {
      if (searchKey && searchQuery && !onSearchChange) {
        const val = String(row[searchKey] || "").toLowerCase();
        if (!val.includes(searchQuery.toLowerCase())) return false;
      }

      for (const filter of filters) {
        const selectedVal = filterValues[filter.key];
        if (
          selectedVal &&
          selectedVal.toLowerCase() !== "all" &&
          !onFilterChange
        ) {
          if (
            String(row[filter.key] ?? "").toLowerCase() !==
            selectedVal.toLowerCase()
          ) {
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
  const totalPages =
    meta?.totalPages || Math.ceil(filteredItems.length / (meta?.limit || 5));

  return (
    <div className="w-full space-y-4">
      {/* Search and Filters Bar */}
      {(searchKey || filters.length > 0) && (
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border bg-muted p-4 sm:flex-row">
          {searchKey && (
            <div className="relative w-full sm:w-72">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="border-input bg-background pl-9 text-foreground"
              />
            </div>
          )}

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            {filters.map((filter) => (
              <Select
                key={filter.key}
                value={filterValues[filter.key] || "ALL"}
                onValueChange={(val) => handleFilterSelect(filter.key, val)}
              >
                <SelectTrigger className="w-35 border-input bg-background text-foreground">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover text-popover-foreground">
                  {filter.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt?.label[0].toUpperCase() +
                        opt?.label.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-b border-border hover:bg-transparent">
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={`font-semibold text-muted-foreground ${col.className || ""}`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading data...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-destructive">
                    <AlertCircle className="h-6 w-6" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Inbox className="h-6 w-6" />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredItems.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="border-b border-border/65 transition-colors hover:bg-muted/50"
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className={col.className}>
                      {col.render
                        ? col.render(row)
                        : String(
                            (row as Record<string, unknown>)[col.key] ?? ""
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {enablePagination && !isLoading && !isError && (
        <div className="flex items-center justify-between rounded-2xl border bg-muted p-4">
          <div className="text-xs text-muted-foreground">
            {meta ? (
              <>
                Page{" "}
                <span className="font-medium text-foreground">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {totalPages}
                </span>{" "}
                ({meta.total} total items)
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredItems.length}
                </span>{" "}
                results
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePage(Math.max(currentPage - 1, 1))}
              disabled={currentPage <= 1}
              className="border-input text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <span className="text-xs font-medium text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="border-input text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
