import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    initials: "PK",
    name: "Priya Kapoor",
    location: "New Delhi · Executive Suite Stay",
    review:
      "An oasis in every sense. From the warm rose-water welcome to the immaculate silence in the courtyard, Nivara is easily the most serene property I've experienced in Uttar Pradesh. The attention to detail is remarkable.",
    avatarClassName: "bg-primary/10 text-primary",
  },
  {
    initials: "RI",
    name: "Rajesh Iyer",
    location: "Mumbai · Deluxe King Stay",
    review:
      "The culinary program alone warrants a visit. Authentic Awadhi flavours delivered with white-glove precision. My workspace in the Deluxe King was whisper-quiet for high-stakes calls, followed by blissful courtyard evenings.",
    avatarClassName: "bg-primary/10 text-primary",
  },
  {
    initials: "SR",
    name: "Sunita & Vikramaditya Rao",
    location: "Bangalore · Signature Suite Stay",
    review:
      "We celebrated our 20th anniversary here. The concierge arranged an unforgettable candlelit private dining experience under the palace arches. True Nawabi hospitality that feels warm, familial, and deeply genuine.",
    avatarClassName: "bg-primary/10 text-primary",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full bg-card p-6 py-10 sm:p-8 md:p-12"
    >
      {/* Section Header */}
      <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-2 text-center">
        <span className="text-xs font-semibold tracking-widest text-primary uppercase">
          What Our Guests Say
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Whispers of Nivara
        </h2>

        <p className="text-base leading-relaxed text-muted-foreground">
          Unfiltered reflections from guests who discovered their personal
          sanctuary in Hazratganj.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 gap-6 px-4 sm:px-10 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="relative flex flex-col justify-between border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <CardContent className="flex h-full flex-col justify-between p-6">
              <div className="flex flex-col gap-4">
                {/* Rating */}
                <div
                  className="flex items-center gap-1 text-primary"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4.5 fill-current" />
                  ))}
                </div>

                {/* Review */}
                <blockquote className="text-base leading-relaxed text-foreground italic">
                  &ldquo;{testimonial.review}&rdquo;
                </blockquote>
              </div>

              {/* Guest */}
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <Avatar className="size-11 shrink-0">
                  <AvatarFallback
                    className={`font-semibold ${testimonial.avatarClassName}`}
                  >
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex min-w-0 flex-col">
                  <span className="font-semibold text-foreground">
                    {testimonial.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
