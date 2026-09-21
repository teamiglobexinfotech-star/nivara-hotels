import React from "react";

import { SectionHeading } from "../../../components/shared/SectionHeading";
import { WHY_NIVARA_BENEFITS } from "../../../data";

export const WhyNivara: React.FC = () => {
  return (
    <section className="mx-auto max-w-7xl border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Why Stay With Nivara"
          title="The details make"
          italicWord="the difference."
        />
        <p className="max-w-md text-xs leading-relaxed font-light text-muted-foreground sm:text-sm md:text-right">
          Every corner of Nivara is arranged to make your time in Jaipur feel
          restorative, intuitive, and intimately memorable.
        </p>
      </div>

      {/* 4 Benefits Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {WHY_NIVARA_BENEFITS.map((benefit) => (
          <div
            key={benefit.number}
            className="flex flex-col justify-between space-y-8 rounded-3xl border border-border bg-card p-8 transition-colors duration-300 hover:border-primary/40"
          >
            <div className="space-y-4">
              <span className="block font-serif text-3xl font-normal text-primary sm:text-4xl">
                {benefit.number}
              </span>
              <h3 className="font-serif text-xl text-card-foreground">
                {benefit.title}
              </h3>
              <p className="text-xs leading-relaxed font-light text-muted-foreground sm:text-sm">
                {benefit.description}
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">
                {benefit.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
