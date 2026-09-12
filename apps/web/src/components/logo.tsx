import { Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 select-none",
        collapsed && "justify-center",
        className
      )}
    >
      {/* Mark */}
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl",
          "bg-primary text-primary-foreground",
          "shadow-sm ring-1 ring-border/50"
        )}
      >
        <Building className="size-4.75" strokeWidth={1.8} />
      </div>

      {/* Wordmark */}
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
            Nivara
          </span>

          <span className="mt-1 text-[9px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
            Hotels
          </span>
        </div>
      )}
    </div>
  );
}
