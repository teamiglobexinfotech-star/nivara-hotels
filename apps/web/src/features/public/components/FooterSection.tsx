import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";

const footerLinks = [
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
];

export function FooterSection() {
  return (
    <footer className="flex w-full flex-col gap-6 border-t border-border bg-card p-6 shadow-sm sm:p-8">
      {/* Top Row */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        {/* Brand */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link to={"/"}>
            <Logo />
          </Link>
          <span
            aria-hidden="true"
            className="hidden size-1.5 rounded-full bg-muted-foreground/50 sm:inline-block"
          />

          <p className="text-sm text-muted-foreground">
            Where every stay feels like coming home. Lucknow, India.
          </p>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        >
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row">
        <span>
          © 2026 Nivara Hotels &amp; Resorts Ltd. All rights reserved.
        </span>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-secondary" />
            Official Luxury Portal
          </span>

          <span>Hazratganj, Lucknow</span>
        </div>
      </div>
    </footer>
  );
}
