import { Bus, CalendarX, Clock3, Croissant, KeyRound } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "check-in-check-out",
    icon: Clock3,
    question: "What are the standard check-in and check-out timings?",
    answer:
      "Check-in begins at 2:00 PM and check-out is at 11:00 AM. Early check-in or express late check-out can be requested subject to availability.",
  },
  {
    id: "breakfast",
    icon: Croissant,
    question: "Is complimentary breakfast included with room bookings?",
    answer:
      "Yes, daily artisanal buffet breakfast featuring local Awadhi and international cuisine is included in executive suites and available as an add-on for standard bookings.",
  },
  {
    id: "cancellation",
    icon: CalendarX,
    question: "What is the reservation cancellation and refund policy?",
    answer:
      "Free cancellation is available up to 48 hours prior to your scheduled check-in date. Cancellations made within 48 hours are subject to a one-night room charge.",
  },
  {
    id: "transfers",
    icon: Bus,
    question: "Do you provide airport and railway station transfers?",
    answer:
      "Private chauffeur transfers from Chaudhary Charan Singh International Airport and Lucknow Junction Railway Station can be pre-arranged with our 24/7 concierge.",
  },
  {
    id: "wifi-parking",
    icon: KeyRound,
    question: "Is high-speed Wi-Fi and valet parking available on-site?",
    answer:
      "Yes, we offer complimentary high-speed 500 Mbps Wi-Fi across all suites and public pavilions, alongside complimentary monitored valet parking with EV charging stations.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="w-full bg-card p-6 py-10 sm:p-8 md:p-12">
      {/* Section Header */}
      <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-2 text-center">
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          Guest Clarity & Transparency
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <p className="text-base leading-relaxed text-muted-foreground">
          Everything you need to know about your stay, privileges, and services
          at Nivara.
        </p>
      </div>

      {/* FAQ */}
      <Accordion className="mx-auto flex max-w-3xl flex-col gap-3">
        {faqs.map((faq) => {
          const Icon = faq.icon;

          return (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-xl border border-border bg-card px-5 shadow-sm transition-shadow data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="gap-4 py-5 text-left text-base font-semibold text-foreground hover:no-underline [&>svg]:size-5 [&>svg]:text-muted-foreground">
                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="size-5 shrink-0 text-primary" />

                  <span>{faq.question}</span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="border-t border-border pt-4 pb-5 pl-8 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
