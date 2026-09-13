import * as React from "react";
import { Button } from "@/components/ui/button";

export interface HeaderAction {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  disabled?: boolean;
}

export interface HeaderProps {
  title: string;
  highlight?: string;
  description?: string;
  actions?: HeaderAction[];
  className?: string;
  children?: React.ReactNode;
}

export function Header({
  title,
  highlight,
  description,
  actions = [],
  className,
  children,
}: HeaderProps) {
  return (
    <header
      className={["w-full space-y-4", className].filter(Boolean).join(" ")}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Page information */}
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
            {highlight}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {(actions.length > 0 || children) && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions.map((action, index) => (
              <Button
                key={`${action.label}-${index}`}
                type="button"
                variant={action.variant ?? "default"}
                size={action.size ?? "default"}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}

            {children}
          </div>
        )}
      </div>
    </header>
  );
}
