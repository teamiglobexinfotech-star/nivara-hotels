import { type ReactNode, useId } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  rightContent?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  rightContent,
}: SectionHeaderProps) {
  const id = useId();

  return (
    <section id={id} className="space-y-2">
      {eyebrow && (
        <p className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-xs">
          {eyebrow}
        </p>
      )}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="mt-0.5 text-xs font-light text-muted-foreground sm:text-sm">
              {description}
            </p>
          )}
        </div>

        {rightContent && (
          <div className="flex items-center gap-2 sm:gap-3">{rightContent}</div>
        )}
      </div>
    </section>
  );
}
