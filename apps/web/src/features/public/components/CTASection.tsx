import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section id="cta" className="w-full bg-card p-6 py-10 sm:p-8 md:p-12">
      <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-xl md:flex-row md:p-12">
        {/* Content */}
        <div className="z-10 flex max-w-xl flex-col gap-3">
          <span className="text-sm font-semibold tracking-widest text-primary-foreground/70 uppercase">
            Direct Reservation Privileges
          </span>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready for a stay you'll actually remember?
          </h2>

          <p className="text-base leading-relaxed text-primary-foreground/80">
            Instant confirmation guaranteed. Best rate guarantee when booking
            directly on our official portal with complimentary late check-out.
          </p>
        </div>

        {/* CTA */}
        <div className="z-10 flex w-full flex-col items-center gap-4 sm:flex-row md:w-auto">
          <Link to="#rooms">
            <Button
              variant="secondary"
              size="lg"
              className="w-full gap-3 rounded-xl px-8 py-6 text-base shadow-md sm:w-auto"
            >
              Browse Available Rooms
              <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -bottom-16 size-96 rounded-full bg-secondary/15 blur-3xl"
        />
      </div>
    </section>
  );
}
