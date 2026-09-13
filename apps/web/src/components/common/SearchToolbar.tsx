import * as React from "react";
import { Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type FilterOption = {
  value: string;
  label: string;
};

export type SearchFilter = {
  key: string;
  title: string;
  options: FilterOption[];
};

export type SearchbarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  filters?: SearchFilter[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;

  placeholder?: string;
  className?: string;
};

function getLabel(options: FilterOption[], value?: string) {
  return options.find((option) => option.value === value)?.label;
}

export function SearchToolbar({
  search,
  onSearchChange,

  filters = [],
  filterValues = {},
  onFilterChange,

  placeholder = "Search...",
  className,
}: SearchbarProps) {
  const [open, setOpen] = React.useState(false);

  const hasActiveFilter = filters.some((filter) => {
    const value = filterValues[filter.key];

    return value && value !== "all";
  });

  const activeFilterCount = filters.reduce((count, filter) => {
    const value = filterValues[filter.key];

    return count + (value && value !== "all" ? 1 : 0);
  }, 0);

  const clearFilters = () => {
    filters.forEach((filter) => {
      onFilterChange?.(filter.key, "all");
    });
  };

  const getFilterButtonLabel = () => {
    const activeFilters = filters
      .map((filter) => {
        const value = filterValues[filter.key];

        if (!value || value === "all") {
          return null;
        }

        return getLabel(filter.options, value);
      })
      .filter(Boolean);

    if (activeFilters.length === 0) {
      return filters.length > 0
        ? filters.map((filter) => filter.title).join(" · ")
        : "Filters";
    }

    return activeFilters.join(" · ");
  };

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3",
        "rounded-xl border border-border/70",
        "bg-card p-2",
        "shadow-sm",
        className
      )}
    >
      {/* Search */}
      <div className="relative min-w-0 flex-1">
        <Search
          className={cn(
            "pointer-events-none absolute top-1/2 left-3",
            "size-4 -translate-y-1/2",
            "text-muted-foreground"
          )}
        />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-10 border-0 bg-transparent",
            "pr-9 pl-9 shadow-none",
            "focus-visible:ring-0",
            "focus-visible:ring-offset-0"
          )}
        />

        {search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange("")}
            className={cn(
              "absolute top-1/2 right-1",
              "size-7 -translate-y-1/2",
              "text-muted-foreground"
            )}
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <Button
              variant="outline"
              className={cn(
                "h-10 shrink-0 gap-2",
                "rounded-lg px-3",
                "font-normal",
                "bg-background",
                hasActiveFilter && "border-primary/40 bg-primary/5"
              )}
            >
              <SlidersHorizontal
                className={cn(
                  "size-3.5",
                  hasActiveFilter ? "text-primary" : "text-muted-foreground"
                )}
              />

              <span className="hidden text-sm sm:inline">
                {getFilterButtonLabel()}
              </span>

              <span className="text-sm sm:hidden">Filters</span>

              {hasActiveFilter && (
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}

              <ChevronDown className="size-3.5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={8}
            className="w-75 space-y-0 rounded-xl p-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">Filters</p>

                <p className="text-xs text-muted-foreground">Refine the list</p>
              </div>

              {hasActiveFilter && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-7 px-2 text-xs"
                >
                  Clear
                </Button>
              )}
            </div>

            <Separator />

            {/* Dynamic Filters */}
            {filters.map((filter, index) => (
              <React.Fragment key={filter.key}>
                <FilterSection
                  title={filter.title}
                  options={filter.options}
                  value={filterValues[filter.key] ?? "all"}
                  onChange={(value) => onFilterChange?.(filter.key, value)}
                />

                {index < filters.length - 1 && <Separator />}
              </React.Fragment>
            ))}

            <Separator />

            <div className="p-2">
              <Button
                type="button"
                className="h-9 w-full"
                onClick={() => setOpen(false)}
              >
                Apply filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

function FilterSection({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="px-2">
      <p className="px-2 pt-1 pb-1.5 text-xs font-medium text-muted-foreground">
        {title}
      </p>

      <div className="space-y-0.5">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "flex w-full items-center justify-between",
                "rounded-md px-2.5 py-2",
                "text-left text-sm",
                "transition-colors",
                "hover:bg-muted",
                selected && "bg-muted"
              )}
            >
              <span
                className={cn(
                  selected
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {option.label}
              </span>

              {selected && <Check className="size-4 text-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
