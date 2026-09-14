import React from 'react';
import { SectionHeading } from '../shared/SectionHeading';
import { WHY_NIVARA_BENEFITS } from '../../data';

export const WhyNivara: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <SectionHeading
          eyebrow="Why Stay With Nivara"
          title="The details make"
          italicWord="the difference."
        />
        <p className="text-xs sm:text-sm font-light text-muted-foreground max-w-md leading-relaxed md:text-right">
          Every corner of Nivara is arranged to make your time in Jaipur feel restorative, intuitive, and intimately memorable.
        </p>
      </div>

      {/* 4 Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_NIVARA_BENEFITS.map((benefit) => (
          <div
            key={benefit.number}
            className="p-8 rounded-3xl bg-card border border-border flex flex-col justify-between space-y-8 hover:border-primary/40 transition-colors duration-300"
          >
            <div className="space-y-4">
              <span className="font-serif text-3xl sm:text-4xl text-primary font-normal block">
                {benefit.number}
              </span>
              <h3 className="font-serif text-xl text-card-foreground">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary">
                {benefit.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
