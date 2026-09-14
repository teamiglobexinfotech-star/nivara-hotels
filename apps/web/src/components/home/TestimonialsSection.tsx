import React from 'react';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '../shared/SectionHeading';
import { TESTIMONIALS_DATA } from '../../data';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <SectionHeading
          eyebrow="Guest Stories"
          title="Guests remember"
          italicWord="how we made them feel."
        />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="uppercase tracking-widest text-[10px] font-semibold">
            Verified Hotel Guest Reviews
          </span>
        </div>
      </div>

      {/* 3 Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS_DATA.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative p-8 rounded-3xl bg-card border border-border flex flex-col justify-between space-y-6"
          >
            {/* Oversized Quote Mark & 5 Stars */}
            <div className="flex items-center justify-between">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-primary/20" />
            </div>

            {/* Quote */}
            <blockquote className="font-light text-sm sm:text-base leading-relaxed text-foreground/90 italic">
              "{testimonial.quote}"
            </blockquote>

            {/* Author & Suite */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base text-card-foreground">
                  {testimonial.guestName}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {testimonial.title} · {testimonial.location}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider bg-background border border-border text-primary">
                {testimonial.suite}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
