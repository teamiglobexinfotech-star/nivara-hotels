import type { Room } from "../types";

export const ROOMS_DATA: Room[] = [
  {
    id: "nivara-deluxe",
    name: "Nivara Deluxe",
    category: "Rooms",
    price: 18500,
    priceFormatted: "₹18,500",
    sizeM2: 42,
    sizeSqFt: 452,
    guests: 2,
    bedType: "King Bed",
    view: "Courtyard View",
    tag: "COURTYARD VIEW",
    shortDescription:
      "An intimate sanctuary carved from natural stone and pale ash, opening onto the internal cloistered water courtyard.",
    fullDescription:
      "Equipped with bespoke stone baths, acoustic glass panels, Belgian linen bedding, and curated single-origin tea bar. The courtyard whispers stillness with soft fountain waters.",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    features: [
      "Private Balcony",
      "Freestanding Stone Tub",
      "Curated Tea Bar",
      "Sonos Acoustic Solitude",
    ],
    specs: {
      tub: "Freestanding Soaking Tub",
      terrace: "Private Balcony",
      salon: "Internal Courtyard Lounge",
    },
  },
  {
    id: "heritage-suite",
    name: "Heritage Suite",
    category: "Suites",
    price: 28000,
    priceFormatted: "₹28,000",
    sizeM2: 68,
    sizeSqFt: 732,
    guests: 2,
    bedType: "Master King Bed",
    view: "Garden Sanctuary View",
    tag: "GARDEN SANCTUARY",
    shortDescription:
      "An expansive dual-room enclave with a separate living salon, custom walk-in dressing chamber, and frameless bay doors overlooking the heirloom botanical flora.",
    fullDescription:
      "Historical sanctuary styling featuring curated Rajasthani-modern artifacts, separate reading salon, artisanal stone tub, and organic botanical garden outlook.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    features: [
      "Loggia Veranda",
      "Limestone Fireplace",
      "Sommelier Bar",
      "Dedicated Floor Butler",
    ],
    specs: {
      fireplace: "Limestone Fireplace",
      butler: "Dedicated Floor Butler",
      salon: "Private Living Lounge",
      tub: "Walk-in Dressing & Tub",
    },
  },
  {
    id: "atrium-terrace",
    name: "Atrium Terrace Room",
    category: "Rooms",
    price: 22000,
    priceFormatted: "₹22,000",
    sizeM2: 50,
    sizeSqFt: 538,
    guests: 2,
    bedType: "Queen Bed",
    view: "Skyline & Central Atrium",
    tag: "SKYLINE & ATRIUM VIEW",
    shortDescription:
      "Elevated vantage point overlooking the hotel's central atrium with a step-down Japanese soaking bath and brass-accented reading nook.",
    fullDescription:
      "Framed by custom steel-mullioned arch openings, this sanctuary balances warm cedar timber ceilings with panoramic sightlines over the reflective pools below.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    features: [
      "Sky Terrace",
      "Sunken Bathtub",
      "Custom Writing Bureau",
      "Private Wine Climate Unit",
    ],
    specs: {
      terrace: "Sky Terrace",
      tub: "Sunken Soaking Bathtub",
      salon: "Sanctuary Reading Bureau",
    },
  },
  {
    id: "grand-pavilion",
    name: "Nivara Grand Pavilion",
    category: "Villas",
    price: 42000,
    priceFormatted: "₹42,000",
    sizeM2: 85,
    sizeSqFt: 915,
    guests: 4,
    bedrooms: 2,
    bedType: "2 King Beds",
    view: "Aravali Hills Canopy View",
    tag: "ARAVALI CANOPY VIEW",
    shortDescription:
      "A standalone sanctuary immersed in nature. Features an outdoor heated plunge pool, open-hearth stone fireplace, and expansive double-bedroom floorplan.",
    fullDescription:
      "Secluded along the perimeter of the ancient Aravali foothills. Enjoys private courtyard access, outdoor rain pavilion, and round-the-clock dedicated host.",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    features: [
      "Private Heated Plunge Pool",
      "Open Fireplace",
      "Private Garden Patio",
      "Private Villa Host",
    ],
    specs: {
      fireplace: "Open Hearth Fireplace",
      tub: "Private Heated Plunge Pool",
      butler: "Dedicated Villa Host",
      terrace: "Private Forest Patio",
    },
  },
  {
    id: "signature-residence",
    name: "Signature Residence",
    category: "Residences",
    price: 56000,
    priceFormatted: "₹56,000",
    sizeM2: 92,
    sizeSqFt: 990,
    guests: 6,
    bedrooms: 2,
    bedType: "1 Master King + Guest Queen",
    view: "Ridge Panorama",
    tag: "PRIVATE RESIDENCE",
    shortDescription:
      "Created for extended sojourns and private entertaining. Featuring a dedicated butler pantry, private 6-person dining room, dual suites, and wrap-around ridge views.",
    fullDescription:
      "The pinnacle of communal luxury. Complete with double marble soaking tub, curated library of rare art volumes, and in-residence dining service on request.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    features: [
      "Wrap-Around Deck",
      "Butler Pantry",
      "Double Marble Tub",
      "Ridge Panorama",
    ],
    specs: {
      butler: "Butler & Private Chef Option",
      tub: "Double Marble Soaking Tub",
      terrace: "Wrap-Around Panoramic Deck",
      salon: "6-Person Private Dining Room",
    },
  },
  {
    id: "presidential-sanctuary",
    name: "The Presidential Sanctuary",
    category: "Residences",
    price: 95000,
    priceFormatted: "₹95,000",
    sizeM2: 140,
    sizeSqFt: 1506,
    guests: 6,
    bedrooms: 3,
    bedType: "3 King Suites",
    view: "360° Amber Fort & Aravali Ridge",
    tag: "PENTHOUSE APEX",
    shortDescription:
      "The pinnacle of Nivara. Three-bedroom wings, an infinity spa terrace suspended over the ridge edge, and a dedicated 24/7 personal majordomo.",
    fullDescription:
      "Architectural masterpiece commanding the highest crown of the estate. Private subterranean tasting cellar, Steinway baby grand piano, and biometric security portal.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    secondaryImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    features: [
      "Private Infinity Spa Pool",
      "Dedicated Majordomo",
      "Private Helipad Access",
      "Penthouse Cantilever Terrace",
    ],
    specs: {
      butler: "Personal Majordomo 24/7",
      tub: "Cliffside Infinity Spa Pool",
      terrace: "Penthouse Cantilever Deck",
      salon: "Grand Salon with Piano",
    },
  },
];

export const INCLUDED_SERVICES = [
  {
    title: "Bespoke Breakfast",
    description:
      "A seasonal morning menu prepared à la carte, served in your suite or within the citrus garden salon.",
    icon: "Utensils",
  },
  {
    title: "Twice-Daily Service",
    description:
      "Quiet morning reset and an aromatic evening turndown featuring botanical pillow mists and herbal sleep tisanes.",
    icon: "Moon",
  },
  {
    title: "Dyson Hair Care",
    description:
      "Full suites of custom Supersonic styling tools in all dressing areas with organic sandalwood bath botanicals.",
    icon: "Wind",
  },
  {
    title: "Apothecary Bar",
    description:
      "Artisanal single-origin coffees, estate whole-leaf teas, fresh farm milk, and handcrafted nibbles replenished daily.",
    icon: "Coffee",
  },
  {
    title: "Garment Pressing",
    description:
      "Complimentary welcoming garment steaming upon arrival to ensure effortless relaxation after travel.",
    icon: "Sparkles",
  },
];
