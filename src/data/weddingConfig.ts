export interface WeddingEvent {
  id: string;
  number: string;
  name: string;
  hindiTitle: string;
  slogan: string;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  dressCode: {
    title: string;
    description: string;
    palette: { name: string; hex: string }[];
  };
  theme: {
    badgeBg: string;
    accentColor: string;
    cardBorder: string;
    cardBg: string;
    patternName: 'marigold' | 'mehndi' | 'sangeet' | 'tilak' | 'mandap' | 'ballroom';
  };
  image: string;
  googleMapsUrl: string;
  muhurat?: string;
  rituals?: string[];
}

export interface FamilyMember {
  role: string;
  names: string;
  blessing?: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      lastName: string;
      fullName: string;
      fatherName: string;
      motherName: string;
      grandParents?: string;
      photo: string;
      familyHeritage?: string;
    };
    bride: {
      firstName: string;
      lastName: string;
      fullName: string;
      fatherName: string;
      motherName: string;
      grandParents?: string;
      photo: string;
      familyHeritage?: string;
    };
    couplePortrait: string;
  };
  weddingDetails: {
    title: string;
    hashtag: string;
    mainWeddingDate: string; // ISO date for countdown
    dateRangeDisplay: string;
    city: string;
    state: string;
    country: string;
    primaryVenue: {
      name: string;
      address: string;
      mapsUrl: string;
      parkingInfo: string;
      accommodationInfo: string;
      contactPerson: string;
      contactPhone: string;
    };
  };
  blessingsText: {
    sanskritInvoking: string;
    sanskritShlok: string;
    sanskritTranslation: string;
    mainInviteText: string;
    closingQuote: string;
    closingSubtext: string;
  };
  events: WeddingEvent[];
  families: {
    groomSide: {
      familyTitle: string;
      ancestralHome: string;
      members: FamilyMember[];
    };
    brideSide: {
      familyTitle: string;
      ancestralHome: string;
      members: FamilyMember[];
    };
  };
  music: {
    title: string;
    artist: string;
    src: string;
  };
  rsvp: {
    enabled: boolean;
    deadline: string;
    contactEmail: string;
    contactPhone: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: "Rohan",
      lastName: "Sharma",
      fullName: "Rohan Sharma",
      fatherName: "Mr. Rajendra Sharma",
      motherName: "Mrs. Sunita Sharma",
      grandParents: "Late Shri Rameshwar Dayal & Smt. Shanti Devi Sharma",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
      familyHeritage: "Indore & Jaipur Heritage",
    },
    bride: {
      firstName: "Priya",
      lastName: "Verma",
      fullName: "Priya Verma",
      fatherName: "Dr. Alok Verma",
      motherName: "Dr. (Mrs.) Meenakshi Verma",
      grandParents: "Late Shri Brijmohan Lal & Smt. Kamla Devi Verma",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      familyHeritage: "Bhopal & Indore Heritage",
    },
    couplePortrait: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
  },
  weddingDetails: {
    title: "Rohan & Priya Royal Wedding Celebration",
    hashtag: "#RoPiForever",
    mainWeddingDate: "2026-12-19T19:30:00",
    dateRangeDisplay: "18 – 20 December 2026",
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    primaryVenue: {
      name: "The Grand Amber Palace & Royal Gardens",
      address: "Bypass Road, Near Ralamandal Sanctuary, Indore, Madhya Pradesh 452020",
      mapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      parkingInfo: "Complimentary Valet Parking available at the Palace Grand Gate for all guests.",
      accommodationInfo: "Luxury palace suites reserved for outstation guests at The Grand Amber Palace.",
      contactPerson: "Mr. Vikram Sharma (Wedding Concierge)",
      contactPhone: "+91 98765 43210",
    },
  },
  blessingsText: {
    sanskritInvoking: "|| श्री गणेशाय नमः ||",
    sanskritShlok: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    sanskritTranslation: "May Lord Ganesha, of curved trunk and immense brilliance like ten million suns, remove all obstacles from our journey forever.",
    mainInviteText: "Together with their families, Rohan Sharma and Priya Verma cordially request the honour of your presence and warm blessings as they unite in holy matrimony.",
    closingQuote: "TWO HEARTS. ONE SACRED UNION. A LIFETIME OF LOVE.",
    closingSubtext: "Your gracious presence, love, and divine blessings will make our sacred celebration complete. We eagerly await to welcome you with folded hands.",
  },
  events: [
    {
      id: "haldi",
      number: "01",
      name: "Shubh Haldi & Phoolon Ki Holi",
      hindiTitle: "शुभ हल्दी एवं फूलों की होली",
      slogan: "Bathed in sunshine, turmeric blessings, and fragrant marigold showers",
      date: "2026-12-18",
      displayDate: "Friday, 18 December 2026",
      time: "10:00 AM Onwards",
      venue: "The Saffron Courtyard, Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "An auspicious morning filled with fresh organic turmeric paste, lively folk rhythms, and a joyous Phoolon ki Holi celebration under open skies.",
      dressCode: {
        title: "Sunshine & Marigold Yellow",
        description: "Yellow Kurtas, Mustard Sarees, Bandhani Dupattas & Fresh Floral Accents",
        palette: [
          { name: "Sunshine Yellow", hex: "#FBBF24" },
          { name: "Marigold Gold", hex: "#D97706" },
          { name: "Warm Ivory", hex: "#FEF3C7" },
        ],
      },
      theme: {
        badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
        accentColor: "#D97706",
        cardBorder: "border-amber-400",
        cardBg: "from-[#FFFDF7] via-[#FEF9EE] to-[#FDF3DE]",
        patternName: "marigold",
      },
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      rituals: ["Traditional Haldi Ubtan", "Phoolon Ki Holi Shower", "Live Dhol & Malwi Folk"],
    },
    {
      id: "mehndi",
      number: "02",
      name: "Rang Mehndi & Sufi Shaam",
      hindiTitle: "रंगारंग मेहंदी एवं सूफी शाम",
      slogan: "Delicate henna motifs, sweet jasmine fragrance, and acoustic Sufi melodies",
      date: "2026-12-18",
      displayDate: "Friday, 18 December 2026",
      time: "04:30 PM Onwards",
      venue: "Emerald Lakefront Pavilions, Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "Intricate Rajasthani mehndi artistry adorned on hands with fresh mint coolers, live bangle bazaar, and mesmerizing twilight Sufi tunes by the lake.",
      dressCode: {
        title: "Emerald & Mint Botanicals",
        description: "Forest Green Kurtas, Mint Lehengas, Floral Prints & Light Jewelry",
        palette: [
          { name: "Emerald Green", hex: "#047857" },
          { name: "Mint Hue", hex: "#6EE7B7" },
          { name: "Forest Dark", hex: "#064E3B" },
        ],
      },
      theme: {
        badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
        accentColor: "#059669",
        cardBorder: "border-emerald-500",
        cardBg: "from-[#FCFDFD] via-[#F0FDF4] to-[#E6F7ED]",
        patternName: "mehndi",
      },
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      rituals: ["Master Henna Artists", "Bangles & Parandi Stall", "Acoustic Sufi Ensemble"],
    },
    {
      id: "sangeet",
      number: "03",
      name: "Royal Sangeet & Musical Night",
      hindiTitle: "शाही संगीत एवं नृत्य संध्या",
      slogan: "An electrifying evening of family choreography, music, and grand celebration",
      date: "2026-12-18",
      displayDate: "Friday, 18 December 2026",
      time: "07:30 PM Till Midnight",
      venue: "Grand Sheesh Mahal Ballroom, Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "A dazzling night beneath crystal chandeliers featuring stellar performances by both families, couple dance, and a late-night feast of royal flavors.",
      dressCode: {
        title: "Royal Glamour & Champagne Gold",
        description: "Cocktail Lehengas, Indo-Western Tuxedos, Royal Purple, Shimmer & Zari",
        palette: [
          { name: "Royal Amethyst", hex: "#6B21A8" },
          { name: "Champagne Gold", hex: "#C59A30" },
          { name: "Deep Indigo", hex: "#1E1B4B" },
        ],
      },
      theme: {
        badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
        accentColor: "#7E22CE",
        cardBorder: "border-purple-500",
        cardBg: "from-[#FCFBFD] via-[#FAF5FF] to-[#F3E8FF]",
        patternName: "sangeet",
      },
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      rituals: ["Family Dance Face-off", "Rohan & Priya Duet", "DJ & Royal Feast"],
    },
    {
      id: "tilak",
      number: "04",
      name: "Traditional Tilak & Shubh Vivah Muhurat",
      hindiTitle: "तिलक एवं शुभ मुहूर्त संस्कार",
      slogan: "Sacred Vedic rituals, chandan tilak, and ancestral prayers",
      date: "2026-12-19",
      displayDate: "Saturday, 19 December 2026",
      time: "11:30 AM",
      venue: "Durbar Hall, Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "Reverent Vedic blessings where the groom is blessed with sacred sandalwood tilak, silver coins, and prayers amidst the chanting of Vedic shlokas.",
      dressCode: {
        title: "Traditional Heritage Silks",
        description: "Banarasi & Kanjeevaram Silks, Maroon Dhoti Kurtas, Gold Borders",
        palette: [
          { name: "Crimson Maroon", hex: "#881337" },
          { name: "Antique Gold", hex: "#C59A30" },
          { name: "Raw Silk Beige", hex: "#F5ECCF" },
        ],
      },
      theme: {
        badgeBg: "bg-rose-100 text-rose-900 border-rose-300",
        accentColor: "#9F1239",
        cardBorder: "border-rose-500",
        cardBg: "from-[#FDFBFB] via-[#FFF1F2] to-[#FFE4E6]",
        patternName: "tilak",
      },
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      rituals: ["Chandan Tilak Ceremony", "Royal Safa Bandhai", "Vedic Havan & Prasad"],
    },
    {
      id: "wedding",
      number: "05",
      name: "Grand Varmala & Sacred Pheras",
      hindiTitle: "शुभ विवाह एवं वरमाला महोत्सव",
      slogan: "Seven sacred vows around the holy fire under starlit canopies",
      date: "2026-12-19",
      displayDate: "Saturday, 19 December 2026",
      time: "06:30 PM Onwards",
      venue: "The Royal Lakefront Mandap, Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      muhurat: "Auspicious Muhurat: 07:35 PM | Royal Baraat Arrival: 06:00 PM | Grand Varmala: 07:15 PM",
      description: "Under a grand mandap draped with thousands of fresh red roses, Rohan and Priya exchange floral garlands and take the eternal seven steps around the holy agni.",
      dressCode: {
        title: "Royal Red, Ivory & Antique Gold",
        description: "Bridal Red, Deep Crimson, Ivory Sherwanis with Royal Safas and Polki Jewels",
        palette: [
          { name: "Royal Bridal Red", hex: "#991B1B" },
          { name: "Deep Gold", hex: "#C59A30" },
          { name: "Royal Ivory", hex: "#FAF7F2" },
        ],
      },
      theme: {
        badgeBg: "bg-red-100 text-red-900 border-red-300",
        accentColor: "#B91C1C",
        cardBorder: "border-red-600",
        cardBg: "from-[#FDFBFB] via-[#FEF2F2] to-[#FEE2E2]",
        patternName: "mandap",
      },
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      rituals: ["Royal Baraat on Baggi", "Floating Lake Varmala Stage", "Sacred Saptapadi (7 Pheras)"],
    },
    {
      id: "reception",
      number: "06",
      name: "Royal Gala Dinner & Dawat-e-Khaas",
      hindiTitle: "शाही प्रतिभोज एवं आशीर्वाद समारोह",
      slogan: "Celebrating the new beginning with gratitude, strings symphony, and culinary wonders",
      date: "2026-12-20",
      displayDate: "Sunday, 20 December 2026",
      time: "07:30 PM Onwards",
      venue: "The Imperial Lawns, Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "An evening of royal hospitality and culinary feasts honoring Central India and Awadh, accompanied by a strings symphony orchestra under starlit skies.",
      dressCode: {
        title: "Champagne, Gold & Black Tie Elegance",
        description: "Evening Gowns, Embroidered Bandhgalas, Black Tie Suits or Festive Luxury Silks",
        palette: [
          { name: "Midnight Black", hex: "#111827" },
          { name: "Champagne Gold", hex: "#C59A30" },
          { name: "Pearl White", hex: "#F9FAFB" },
        ],
      },
      theme: {
        badgeBg: "bg-neutral-100 text-neutral-900 border-neutral-300",
        accentColor: "#1F2937",
        cardBorder: "border-gold-500",
        cardBg: "from-[#FCFBFD] via-[#FAF8F5] to-[#F5EFE6]",
        patternName: "ballroom",
      },
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      rituals: ["Strings Symphony Orchestra", "Dawat-e-Khaas Royal Feast", "Family Photo & Blessings"],
    },
  ],
  families: {
    groomSide: {
      familyTitle: "The Sharma Family",
      ancestralHome: "Indore & Jaipur",
      members: [
        {
          role: "Grandparents",
          names: "Late Shri Rameshwar Dayal Sharma & Smt. Shanti Devi Sharma",
          blessing: "Whose teachings of integrity and love guide our path.",
        },
        {
          role: "Parents",
          names: "Mr. Rajendra Sharma & Mrs. Sunita Sharma",
          blessing: "Heartily solicit your kind presence and blessings.",
        },
        {
          role: "Elder Brother & Sister-in-law",
          names: "Mr. Gaurav Sharma & Mrs. Neha Sharma",
          blessing: "Eagerly waiting to celebrate with you.",
        },
      ],
    },
    brideSide: {
      familyTitle: "The Verma Family",
      ancestralHome: "Bhopal & Indore",
      members: [
        {
          role: "Grandparents",
          names: "Late Shri Brijmohan Lal Verma & Smt. Kamla Devi Verma",
          blessing: "Whose gracious memories forever bless this union.",
        },
        {
          role: "Parents",
          names: "Dr. Alok Verma & Dr. (Mrs.) Meenakshi Verma",
          blessing: "Invite you with folded hands to grace the occasion.",
        },
        {
          role: "Brother",
          names: "Aditya Verma",
          blessing: "Ready to welcome the baraat with pomp and warmth.",
        },
      ],
    },
  },
  music: {
    title: "Raag Yaman — Shehnai & Sitar Serenade",
    artist: "Royal Traditional Indian Wedding Ensemble",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-traditional-music-113063.mp3",
  },
  rsvp: {
    enabled: true,
    deadline: "1st December 2026",
    contactEmail: "celebrations@rohanpriya2026.com",
    contactPhone: "+91 98765 43210",
  },
};
