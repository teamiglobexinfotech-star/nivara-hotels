export interface Room {
  id: string;
  name: string;
  category: "Suites" | "Residences" | "Villas" | "Rooms";
  price: number;
  priceFormatted: string;
  sizeM2: number;
  sizeSqFt: number;
  guests: number;
  bedrooms?: number;
  bedType: string;
  view: string;
  tag: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  secondaryImage?: string;
  features: string[];
  specs: {
    salon?: string;
    tub?: string;
    terrace?: string;
    butler?: string;
    fireplace?: string;
  };
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  guestName: string;
  title: string;
  location: string;
  suite: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TransitOption {
  id: string;
  title: string;
  description: string;
  duration: string;
  tag: string;
  iconName: string;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  suiteId: string;
  suiteName: string;
  specialRequests?: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
}

export type Status = "ACTIVE" | "INACTIVE";
