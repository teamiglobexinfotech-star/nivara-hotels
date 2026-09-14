import type { Amenity } from "../types";

export const AMENITIES_DATA: Amenity[] = [
  {
    id: "pool",
    title: "Heated Infinity Pool",
    description:
      "A quiet place to unwind between days of exploring. Suspended with panoramic views across the Aravali foothills.",
    tag: "RELAXATION",
    iconName: "Waves",
  },
  {
    id: "wellness",
    title: "Wellness & Thermal Spa",
    description:
      "Thoughtful spaces for rest, movement, and recovery. Ayurvedic treatments, dry cedarwood sauna, and cold plunge.",
    tag: "RESTORATION",
    iconName: "Sparkles",
  },
  {
    id: "fitness",
    title: "Fitness & Movement Room",
    description:
      "A well-equipped fitness room for your usual routine, featuring Peloton bikes, Technogym weights, and yoga terrace.",
    tag: "WELLNESS",
    iconName: "Activity",
  },
  {
    id: "concierge",
    title: "Personal Concierge",
    description:
      "Personal assistance for reservations, recommendations, and local experiences across Jaipur’s hidden treasures.",
    tag: "HOSPITALITY",
    iconName: "Bell",
  },
  {
    id: "wifi",
    title: "Complimentary High-Speed Wi-Fi",
    description:
      "Reliable high-speed connectivity throughout your stay with dedicated enterprise-grade Wi-Fi 7 in every suite.",
    tag: "CONNECTIVITY",
    iconName: "Wifi",
  },
  {
    id: "parking",
    title: "Valet & Secure Parking",
    description:
      "Convenient on-site valet parking for hotel guests with 24-hour subterranean bays and universal EV fast-chargers.",
    tag: "ACCESSIBILITY",
    iconName: "Car",
  },
];
