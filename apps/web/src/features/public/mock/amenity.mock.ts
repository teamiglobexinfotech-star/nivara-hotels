import type { AmenityList } from "@/features/amenities/amenity.types";

export const AMENITIES_MOCK: AmenityList[] = [
  {
    id: "pool",
    name: "Heated Infinity Pool",
    description:
      "A quiet place to unwind between days of exploring. Suspended with panoramic views across the Aravali foothills.",
    isActive: false,
    iconKey: "Waves",
  },
  {
    id: "wellness",
    name: "Wellness & Thermal Spa",
    description:
      "Thoughtful spaces for rest, movement, and recovery. Ayurvedic treatments, dry cedarwood sauna, and cold plunge.",
    isActive: false,
    iconKey: "Sparkles",
  },
  {
    id: "fitness",
    name: "Fitness & Movement Room",
    description:
      "A well-equipped fitness room for your usual routine, featuring Peloton bikes, Technogym weights, and yoga terrace.",
    isActive: false,
    iconKey: "Activity",
  },
  {
    id: "concierge",
    name: "Personal Concierge",
    description:
      "Personal assistance for reservations, recommendations, and local experiences across Jaipur’s hidden treasures.",
    isActive: false,
    iconKey: "Bell",
  },
  {
    id: "wifi",
    name: "Complimentary High-Speed Wi-Fi",
    description:
      "Reliable high-speed connectivity throughout your stay with dedicated enterprise-grade Wi-Fi 7 in every suite.",
    isActive: false,
    iconKey: "Wifi",
  },
  {
    id: "parking",
    name: "Valet & Secure Parking",
    description:
      "Convenient on-site valet parking for hotel guests with 24-hour subterranean bays and universal EV fast-chargers.",
    isActive: false,
    iconKey: "Car",
  },
];
