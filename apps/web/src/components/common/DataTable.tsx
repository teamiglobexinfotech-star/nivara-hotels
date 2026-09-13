import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type TableColumn<T> = {
  key: string;
  header: string;

  render?: (value: unknown, row: T) => ReactNode;

  className?: string;
  headerClassName?: string;
};

export interface DataTableProps<T> {
  title: string;
  description?: string;

  data: T[];
  columns: TableColumn<T>[];

  getRowKey: (row: T, index: number) => string;
  onViewAll?: () => void;

  emptyMessage?: string;

  page?: number;
  totalPages?: number;

  onPreviousPage?: () => void;
  onNextPage?: () => void;

  footerText?: string;
}

export function DataTable<T>({
  title,
  description,
  data,
  columns,
  getRowKey,
  onViewAll,
  emptyMessage = "No records found.",
  page = 1,
  totalPages = 1,
  onPreviousPage,
  onNextPage,
  footerText,
}: DataTableProps<T>) {
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <Card className="overflow-hidden border-border/60 py-0 shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b bg-muted/30 px-5 py-4">
        <div className="min-w-0">
          <CardTitle className="text-lg font-semibold tracking-tight">
            {title}
          </CardTitle>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {onViewAll && (
          <Button
            type="button"
            variant="link"
            onClick={onViewAll}
            className="shrink-0 px-0 text-sm font-semibold"
          >
            View All
            <span aria-hidden="true">→</span>
          </Button>
        )}
      </CardHeader>

      {/* Table */}
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={[
                      "text-xs font-semibold tracking-wider whitespace-nowrap text-muted-foreground uppercase",
                      column.headerClassName,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="pt-0">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow
                    key={getRowKey(row, index)}
                    className="transition-colors"
                  >
                    {columns.map((column) => {
                      const value = (row as Record<string, unknown>)[
                        column.key
                      ];

                      return (
                        <TableCell
                          key={column.key}
                          className={column.className}
                        >
                          {column.render
                            ? column.render(value, row)
                            : String(value ?? "—")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Footer / Pagination */}
      {(footerText || totalPages > 1) && (
        <CardFooter className="flex flex-col items-center justify-between gap-3 border-t bg-muted/30 px-5 py-3 sm:flex-row">
          {footerText && (
            <p className="text-center text-xs text-muted-foreground sm:text-left">
              {footerText}
            </p>
          )}

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={!hasPreviousPage}
                onClick={onPreviousPage}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="px-2 text-xs font-medium text-muted-foreground">
                {page} / {totalPages}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={!hasNextPage}
                onClick={onNextPage}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
