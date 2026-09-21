import React from "react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FAQ_MOCK } from "../mock/faq.mock";

export const FAQSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-4xl border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mb-16 space-y-3 text-center">
        <SectionHeading
          eyebrow="Hotel Information"
          title="Questions,"
          italicWord="answered."
          align="center"
          subtitle="Everything you need to know about reserving your stay, arrival protocols, and hotel services."
        />
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="w-full"
      >
        {FAQ_MOCK.map((faq, index) => (
          <AccordionItem key={faq.id} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
