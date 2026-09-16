import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../ui/button";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render?: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  title: string;
  description?: string;

  columns: DataTableColumn<T>[];
  data: T[];

  // Optional right-side action
  actionText?: string;
  onAction?: () => void;

  // Optional states
  error?: string | null;
  emptyText?: string;
  loading?: boolean;

  // Optional row configuration
  getRowKey?: (row: T, index: number) => string | number;
  maxRows?: number;
};

export function DataTable<T>({
  title,
  description,
  columns,
  data,
  actionText,
  onAction,
  error,
  emptyText = "No data available.",
  loading = false,
  getRowKey,
  maxRows,
}: DataTableProps<T>) {
  const rows = maxRows ? data.slice(0, maxRows) : data;

  return (
    <section className="space-y-4 rounded-2xl border border-border/80 bg-card p-5 shadow-xs sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-lg font-medium text-foreground sm:text-xl">
            {title}
          </h2>

          {description && (
            <p className="text-xs font-light text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {actionText && onAction && (
          <Button
            variant={"link"}
            onClick={onAction}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <span>{actionText}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Error */}
      {error ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-xs text-destructive">
          {error}
        </div>
      ) : loading ? (
        <div className="py-8 text-center text-xs text-muted-foreground">
          Loading...
        </div>
      ) : rows.length === 0 ? (
        <div className="py-8 text-center text-xs text-muted-foreground">
          {emptyText}
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-[10px] tracking-wider text-muted-foreground uppercase">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-3 py-2.5 font-medium whitespace-nowrap ${
                      column.className ?? ""
                    }`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border/50">
              {rows.map((row, index) => (
                <tr
                  key={getRowKey?.(row, index) ?? index}
                  className="transition-colors hover:bg-muted/40"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-3 py-3 ${column.className ?? ""}`}
                    >
                      {column.render
                        ? column.render(row)
                        : String(
                            (row as Record<string, unknown>)[column.key] ?? ""
                          )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
