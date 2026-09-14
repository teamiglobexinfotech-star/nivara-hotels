import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HOTEL_CONTACT } from "../../data";
import { Logo } from "../shared/Logo";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 5000);
    }
  };

  return (
    <footer className="border-t border-border bg-background pt-20 pb-12 text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-border pb-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed font-light text-muted-foreground">
              Refined stays, thoughtfully designed. Boutique hospitality rooted
              in quiet comfort and memorable experiences.
            </p>
            <div className="pt-2">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                Hotel Location
              </p>
              <p className="mt-1 text-xs text-muted-foreground/80">
                {HOTEL_CONTACT.address}
              </p>
              <p className="mt-1 text-xs text-muted-foreground/80">
                Direct: {HOTEL_CONTACT.phone} · {HOTEL_CONTACT.email}
              </p>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-foreground uppercase">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <NavLink
                  to="/"
                  className="transition-colors hover:text-primary"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="transition-colors hover:text-primary"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rooms"
                  className="transition-colors hover:text-primary"
                >
                  Rooms
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="transition-colors hover:text-primary"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Stay Links */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-foreground uppercase">
              Stay
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <NavLink
                  to="/rooms"
                  className="transition-colors hover:text-primary"
                >
                  Rooms & Suites
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/rooms"
                  className="transition-colors hover:text-primary"
                >
                  Residences
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="transition-colors hover:text-primary"
                >
                  Amenities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="transition-colors hover:text-primary"
                >
                  Reservations
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-foreground uppercase">
              Hotel Notes & Dispatches
            </h4>
            <p className="text-xs leading-relaxed font-light text-muted-foreground">
              Receive occasional notes from Nivara, seasonal suite openings, and
              quiet travel inspirations.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-card p-3 text-xs text-primary">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Thank you. You are now subscribed to Nivara notes.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="relative flex items-center"
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="rounded-full bg-card py-5 pr-28 pl-4 text-xs"
                />
                <Button
                  type="submit"
                  variant="luxury"
                  size="luxurySm"
                  className="absolute right-1"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[11px] font-light text-muted-foreground/70 sm:flex-row">
          <p>© 2026 Nivara Hotels. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <NavLink
              to="/about"
              className="transition-colors hover:text-primary"
            >
              Privacy
            </NavLink>
            <NavLink
              to="/about"
              className="transition-colors hover:text-primary"
            >
              Terms
            </NavLink>
            <NavLink
              to="/contact"
              className="transition-colors hover:text-primary"
            >
              Concierge Desk
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
