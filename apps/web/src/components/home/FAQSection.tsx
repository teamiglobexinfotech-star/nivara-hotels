import React from 'react';
import { SectionHeading } from '../shared/SectionHeading';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { FAQ_DATA } from '../../data';

export const FAQSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-border">
      <div className="text-center mb-16 space-y-3">
        <SectionHeading
          eyebrow="Hotel Information"
          title="Questions,"
          italicWord="answered."
          align="center"
          subtitle="Everything you need to know about reserving your stay, arrival protocols, and hotel services."
        />
      </div>

      <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
        {FAQ_DATA.map((faq, index) => (
          <AccordionItem key={faq.id} value={`item-${index}`}>
            <AccordionTrigger>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
