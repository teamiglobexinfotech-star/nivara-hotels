import { Quote, Star } from "lucide-react";
import React from "react";

import { SectionHeading } from "../../../components/shared/SectionHeading";
import { TESTIMONIALS_DATA } from "../../../data";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Guest Stories"
          title="Guests remember"
          italicWord="how we made them feel."
        />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-[10px] font-semibold tracking-widest uppercase">
            Verified Hotel Guest Reviews
          </span>
        </div>
      </div>

      {/* 3 Testimonial Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {TESTIMONIALS_DATA.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative flex flex-col justify-between space-y-6 rounded-3xl border border-border bg-card p-8"
          >
            {/* Oversized Quote Mark & 5 Stars */}
            <div className="flex items-center justify-between">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-primary/20" />
            </div>

            {/* Quote */}
            <blockquote className="text-sm leading-relaxed font-light text-foreground/90 italic sm:text-base">
              "{testimonial.quote}"
            </blockquote>

            {/* Author & Suite */}
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <h4 className="font-serif text-base text-card-foreground">
                  {testimonial.guestName}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {testimonial.title} · {testimonial.location}
                </p>
              </div>
              <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[9px] tracking-wider text-primary uppercase">
                {testimonial.suite}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
