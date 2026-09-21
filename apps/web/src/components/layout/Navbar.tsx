import { Menu, PhoneCall, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HOTEL_CONTACT } from "@/mock/app.mock";

import { Logo } from "../shared/Logo";

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rooms", path: "/rooms" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/90 py-3.5 shadow-xl shadow-background/50 backdrop-blur-md"
          : "bg-linear-to-b from-background/80 via-background/40 to-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                  isActive
                    ? "font-semibold text-primary"
                    : "font-medium text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute right-0 bottom-0 left-0 h-[1.5px] rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="luxury" size="luxurySm" onClick={onOpenBooking}>
            Book a Stay
          </Button>

          {/* Profile / Concierge quick access */}
          {/* <NavLink
            to="/contact"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary sm:flex"
            title="Concierge Portal"
          >
            <User className="h-4 w-4" />
          </NavLink> */}

          <NavLink
            to="/signup"
            id="navbar-signup-btn"
            className={({ isActive }) =>
              `hidden items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs tracking-[0.16em] uppercase transition-all duration-300 sm:flex ${
                isActive
                  ? "border-primary bg-primary font-semibold text-primary-foreground shadow-xs"
                  : "border-border bg-card text-foreground hover:border-primary/60 hover:text-primary"
              }`
            }
            title="Customer Registration & Patron Circle"
          >
            <User className="h-3.5 w-3.5" />
            <span className="text-[11px] font-medium">Sign up</span>
          </NavLink>

          {/* Mobile Sheet Menu using shadcn Sheet */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-border bg-card text-foreground hover:text-primary"
                  aria-label="Toggle Navigation Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex flex-col justify-between p-6 sm:p-8"
              >
                <div className="space-y-8 pt-8">
                  <SheetHeader className="space-y-1 text-left">
                    <span className="text-[10px] font-semibold tracking-[0.24em] text-primary uppercase">
                      Sanctuary Navigation
                    </span>
                  </SheetHeader>

                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `font-serif text-3xl transition-colors ${
                            isActive
                              ? "text-primary italic"
                              : "text-foreground hover:text-primary"
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-border pt-8">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <PhoneCall className="h-3.5 w-3.5 text-primary" />
                    <span>Direct: {HOTEL_CONTACT.phone}</span>
                  </div>
                  <Button
                    variant="luxury"
                    size="luxuryMd"
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                  >
                    Reserve Accommodation
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
