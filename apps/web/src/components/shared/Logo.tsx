import { NavLink } from "react-router-dom";

export function Logo() {
  return (
    <NavLink
      to="/"
      className="group flex cursor-pointer items-center gap-2 text-left"
    >
      <span className="font-serif text-xs text-muted-foreground/60 transition-colors group-hover:text-primary">
        —
      </span>
      <span className="font-serif text-xl font-normal tracking-[0.08em] text-foreground sm:text-2xl">
        Nivara
      </span>
      <span className="font-serif text-xs text-muted-foreground/60 transition-colors group-hover:text-primary">
        —
      </span>
    </NavLink>
  );
}
