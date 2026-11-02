export interface WeddingEvent {
  id: string;
  name: string;
  hindiTitle?: string;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  dressCode: {
    title: string;
    description: string;
    palette: string[]; // hex codes or color names
  };
  theme: {
    bgClass: string;
    accentColor: string;
    textColor: string;
    cardBg: string;
    pattern: 'marigold' | 'mehndi' | 'sangeet' | 'tilak' | 'mandap' | 'ballroom';
  };
  image: string;
  googleMapsUrl: string;
  googleMapsEmbed?: string;
  muhurat?: string;
  specialHighlights?: string[];
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  location: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'all' | 'ceremony' | 'prewedding' | 'couple' | 'family';
  image: string;
  caption?: string;
  aspect: 'portrait' | 'landscape' | 'square';
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
      bio: string;
      photo: string;
      education?: string;
      profession?: string;
      familyHeritage?: string;
    };
    bride: {
      firstName: string;
      lastName: string;
      fullName: string;
      fatherName: string;
      motherName: string;
      grandParents?: string;
      bio: string;
      photo: string;
      education?: string;
      profession?: string;
      familyHeritage?: string;
    };
  };
  weddingDetails: {
    title: string;
    hashtag: string;
    mainWeddingDate: string; // ISO date for countdown: '2026-12-19T19:30:00'
    dateRangeDisplay: string;
    city: string;
    state: string;
    country: string;
    primaryVenue: {
      name: string;
      address: string;
      mapsUrl: string;
      coordinates?: { lat: number; lng: number };
      parkingInfo: string;
      accommodationInfo: string;
      contactPerson: string;
      contactPhone: string;
    };
  };
  blessingsText: {
    sanskritInvoking: string;
    sanskritTranslation: string;
    mainInviteText: string;
    closingQuote: string;
    closingSubtext: string;
  };
  events: WeddingEvent[];
  story: StoryMilestone[];
  gallery: GalleryPhoto[];
  families: {
    groomSide: {
      familyTitle: string;
      members: FamilyMember[];
      ancestralHome: string;
    };
    brideSide: {
      familyTitle: string;
      members: FamilyMember[];
      ancestralHome: string;
    };
  };
  music: {
    title: string;
    artist: string;
    src: string;
    autoPlayPrompt: string;
  };
  rsvp: {
    enabled: boolean;
    deadline: string;
    contactEmail: string;
    contactPhone: string;
    allowPlusOne: boolean;
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
      bio: "An architect with a passion for heritage structures, classical music, and evening conversations over chai. Rohan found in Priya his timeless melody and compass.",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
      education: "Master of Urban Architecture, CEPT",
      profession: "Principal Architect, Sharma & Associates",
      familyHeritage: "Originating from the royal cultural heritage of Indore & Jaipur",
    },
    bride: {
      firstName: "Priya",
      lastName: "Verma",
      fullName: "Priya Verma",
      fatherName: "Dr. Alok Verma",
      motherName: "Dr. (Mrs.) Meenakshi Verma",
      grandParents: "Late Shri Brijmohan Lal & Smt. Kamla Devi Verma",
      bio: "A classical Kathak dancer and pediatric physician whose warmth illuminates every room she enters. Priya discovered in Rohan a patient listener and kindred spirit.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      education: "MD Pediatrics, AIIMS New Delhi",
      profession: "Pediatric Consultant",
      familyHeritage: "Renowned lineage of scholars and physicians from Madhya Pradesh",
    },
  },
  weddingDetails: {
    title: "Rohan & Priya Wedding Celebration",
    hashtag: "#RoPiForever2026",
    mainWeddingDate: "2026-12-19T19:30:00",
    dateRangeDisplay: "18 – 20 December 2026",
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    primaryVenue: {
      name: "The Grand Amber Palace & Royal Gardens",
      address: "Bypass Road, Near Ralamandal Sanctuary, Indore, Madhya Pradesh 452020",
      mapsUrl: "https://maps.google.com/?q=Indore+Madhya+Pradesh",
      parkingInfo: "Complimentary Valet Parking is available at the Palace Grand Gate for all guests.",
      accommodationInfo: "Special luxury suite arrangements reserved for outstation guests at The Grand Amber Palace.",
      contactPerson: "Mr. Vikram Sharma (Wedding Concierge)",
      contactPhone: "+91 98765 43210",
    },
  },
  blessingsText: {
    sanskritInvoking: "|| श्री गणेशाय नमः ||",
    sanskritTranslation: "Vakratunda Mahakaya Suryakoti Samaprabha | Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada ||",
    mainInviteText: "With the divine grace of our ancestors and the blessings of Lord Ganesha, we invite you to honor us with your gracious presence and heartfelt blessings as our beloved children embark on the sacred journey of holy matrimony.",
    closingQuote: "TWO HEARTS. ONE SACRED JOURNEY. A LIFETIME OF TOGETHERNESS.",
    closingSubtext: "Your gracious presence, love, and divine blessings will make our celebration complete. We eagerly await to welcome you with folded hands.",
  },
  events: [
    {
      id: "haldi",
      name: "Shubh Haldi & Phoolon Ki Holi",
      hindiTitle: "शुभ हल्दी एवं फूलों की होली",
      date: "2026-12-18",
      displayDate: "Friday, 18 December 2026",
      time: "10:00 AM Onwards",
      venue: "The Saffron Courtyard, Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "An auspicious morning bathed in yellow sunshine, fragrant organic turmeric, soulful dhol rhythms, and showers of fresh marigold and rose petals.",
      dressCode: {
        title: "Sunshine & Marigold Hues",
        description: "Yellow Kurtas, Mustard Sarees, Bandhani Dupattas & Floral Accents",
        palette: ["#FBBF24", "#F59E0B", "#FEF3C7", "#D97706"],
      },
      theme: {
        bgClass: "from-amber-900/90 via-yellow-950/80 to-amber-950",
        accentColor: "#F59E0B",
        textColor: "#FEF3C7",
        cardBg: "rgba(35, 23, 7, 0.85)",
        pattern: "marigold",
      },
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      specialHighlights: ["Organic Haldi Ceremony", "Phoolon ki Holi", "Traditional Malwi Folk Troupe"],
    },
    {
      id: "mehndi",
      name: "Rang Mehndi & Sufi Shaam",
      hindiTitle: "रंगारंग मेहंदी उत्सव",
      date: "2026-12-18",
      displayDate: "Friday, 18 December 2026",
      time: "04:30 PM Onwards",
      venue: "Emerald Lakefront Pavilions",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "Intricate Rajasthani henna artistry accompanied by fragrant jasmine gajras, refreshing mint coolers, and soulful Sufi folk acoustics under lush canopies.",
      dressCode: {
        title: "Emerald & Botanical Splendor",
        description: "Forest Greens, Mint Lehengas, Mehendi Green Kurtas & Floral Jewelry",
        palette: ["#047857", "#10B981", "#D1FAE5", "#064E3B"],
      },
      theme: {
        bgClass: "from-emerald-950 via-teal-950 to-green-950",
        accentColor: "#10B981",
        textColor: "#D1FAE5",
        cardBg: "rgba(6, 40, 28, 0.85)",
        pattern: "mehndi",
      },
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      specialHighlights: ["Master Henna Artists", "Live Bangles & Parandi Counter", "Acoustic Sufi Ensemble"],
    },
    {
      id: "sangeet",
      name: "Royal Sangeet & Musical Extravaganza",
      hindiTitle: "संगीत एवं नृत्य संध्या",
      date: "2026-12-18",
      displayDate: "Friday, 18 December 2026",
      time: "07:30 PM Till Midnight",
      venue: "Grand Sheesh Mahal Ballroom",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "An electrifying celebration of dance, family performances, dazzling chandeliers, stellar DJ sets, and a regal feast of royal cuisine.",
      dressCode: {
        title: "Regal Glamour & Sparkle",
        description: "Cocktail Lehengas, Indo-Western Tuxedos, Royal Purple, Champagne & Shimmer",
        palette: ["#7C3AED", "#A855F7", "#F3E8FF", "#C59A30"],
      },
      theme: {
        bgClass: "from-purple-950 via-indigo-950 to-slate-950",
        accentColor: "#C084FC",
        textColor: "#F3E8FF",
        cardBg: "rgba(35, 14, 58, 0.85)",
        pattern: "sangeet",
      },
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      specialHighlights: ["Couple Choreography", "Family Dance Face-off", "Live Bollywood Band & DJ"],
    },
    {
      id: "tilak",
      name: "Traditional Tilak & Shubh Vivah Muhurat",
      hindiTitle: "तिलक एवं शुभ मुहूर्त संस्कार",
      date: "2026-12-19",
      displayDate: "Saturday, 19 December 2026",
      time: "11:30 AM",
      venue: "Durbar Hall of Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "Solemn Vedic rituals marking the ceremonial blessing of the groom with sandalwood tilak, silver coins, and familial prayers amidst chanting of sacred mantras.",
      dressCode: {
        title: "Traditional Heritage Silks",
        description: "Banarasi & Kanjeevaram Silks, Maroon Dhoti Kurtas, Gold Zari accents",
        palette: ["#881337", "#9F1239", "#FFE4E6", "#C59A30"],
      },
      theme: {
        bgClass: "from-rose-950 via-stone-950 to-red-950",
        accentColor: "#FB7185",
        textColor: "#FFE4E6",
        cardBg: "rgba(50, 10, 18, 0.85)",
        pattern: "tilak",
      },
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      specialHighlights: ["Vedic Mantra Chanting", "Royal Turban Ceremony (Safa Bandhai)", "Pooja & Sweets Prasad"],
    },
    {
      id: "wedding",
      name: "Grand Varmala & Pheras Ceremony",
      hindiTitle: "शुभ विवाह एवं वरमाला महोत्सव",
      date: "2026-12-19",
      displayDate: "Saturday, 19 December 2026",
      time: "06:30 PM Onwards",
      venue: "The Royal Lakefront Mandap",
      address: "Bypass Road, Ralamandal, Indore, MP",
      muhurat: "Auspicious Muhurat: 07:35 PM | Royal Baraat Arrival: 06:00 PM | Grand Varmala: 07:15 PM",
      description: "Under the starlit canopy adorned with thousands of fragrant Kashmiri red roses and cascading jasmine, Rohan and Priya take the sacred seven vows around the holy fire.",
      dressCode: {
        title: "Royal Red, Ivory & Antique Gold",
        description: "Bridal Red, Deep Crimson, Ivory Sherwanis with Royal Safas and Polki Jewels",
        palette: ["#991B1B", "#7F1D1D", "#FEF2F2", "#EAB308"],
      },
      theme: {
        bgClass: "from-red-950 via-amber-950/60 to-stone-950",
        accentColor: "#EAB308",
        textColor: "#FFFBEB",
        cardBg: "rgba(55, 12, 16, 0.9)",
        pattern: "mandap",
      },
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      specialHighlights: ["Grand Royal Baraat with Baggi", "Floating Lake Varmala Stage", "Holy Vedic Pheras & Saptapadi"],
    },
    {
      id: "reception",
      name: "Royal Gala Dinner & Dawat-e-Khaas",
      hindiTitle: "शाही प्रतिभोज एवं आशीर्वाद समारोह",
      date: "2026-12-20",
      displayDate: "Sunday, 20 December 2026",
      time: "07:30 PM Onwards",
      venue: "The Imperial Lawns, Amber Palace",
      address: "Bypass Road, Ralamandal, Indore, MP",
      description: "An evening of gratitude, majestic culinary wonders of Central India & Awadh, fine strings quartet, and celebrating the beginning of forever with cherished family and friends.",
      dressCode: {
        title: "Champagne, Gold & Black Tie Elegance",
        description: "Evening Gowns, Embroidered Bandhgalas, Black Tie Suits or Festive Luxury Silks",
        palette: ["#1F2937", "#111827", "#F9FAFB", "#F59E0B"],
      },
      theme: {
        bgClass: "from-slate-950 via-zinc-950 to-stone-950",
        accentColor: "#FBBF24",
        textColor: "#F3F4F6",
        cardBg: "rgba(18, 20, 28, 0.9)",
        pattern: "ballroom",
      },
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      googleMapsUrl: "https://maps.google.com/?q=The+Grand+Amber+Palace+Indore",
      specialHighlights: ["Royal Banquet Buffet with 75+ Delicacies", "Strings Symphony Orchestra", "Photo Booth & Family Blessings"],
    },
  ],
  story: [
    {
      id: "milestone-1",
      year: "2022",
      title: "An Unplanned Encounter",
      subtitle: "The Library of CEPT Ahmedabad",
      description: "Amongst centuries-old architectural manuscripts and quiet corridors, a misplaced blueprint led to a spontaneous conversation about stepwells and heritage buildings.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      location: "Ahmedabad, Gujarat",
    },
    {
      id: "milestone-2",
      year: "2023",
      title: "Chai, Kathak & Endless Conversations",
      subtitle: "Sunset by the Narmada River",
      description: "Between Rohan's sketches and Priya's rhythm of ghungroos, hours felt like seconds. They realized that home wasn't a place, but whenever they were in each other's presence.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      location: "Maheshwar, Madhya Pradesh",
    },
    {
      id: "milestone-3",
      year: "2024",
      title: "The Golden Fort Proposal",
      subtitle: "Beneath the Stars of Jaisalmer",
      description: "Overlooking the sun-drenched golden ramparts of the fort at twilight, Rohan presented an heirloom ring. With tears of joy and trembling smiles, Priya said yes.",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80",
      location: "Jaisalmer, Rajasthan",
    },
    {
      id: "milestone-4",
      year: "2025",
      title: "The Roka & Joining of Families",
      subtitle: "Laughter, Sweets & Sacred Blessings",
      description: "Surrounded by elders, sacred sweets, and joyful tears, two families became one. The journey of preparing for the sacred seven vows had officially begun.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      location: "Indore, Madhya Pradesh",
    },
    {
      id: "milestone-5",
      year: "2026",
      title: "The Beginning of Forever",
      subtitle: "The Sacred Vows at Amber Palace",
      description: "Now we stand on the threshold of our forever. Hand in hand, guided by love, faith, and the blessings of everyone who shaped our lives.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      location: "Indore, Madhya Pradesh",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Royal Twilight Portrait",
      category: "couple",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      caption: "In each other's eyes, we found our forever sanctuary.",
      aspect: "portrait",
    },
    {
      id: "gal-2",
      title: "Heritage Archways",
      category: "prewedding",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      caption: "Golden light filtering through palace jalis.",
      aspect: "landscape",
    },
    {
      id: "gal-3",
      title: "The Radiant Bride",
      category: "ceremony",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      caption: "Priya draped in ancestral silks and anticipation.",
      aspect: "portrait",
    },
    {
      id: "gal-4",
      title: "The Noble Groom",
      category: "ceremony",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
      caption: "Rohan ready to welcome his bride into his heart.",
      aspect: "portrait",
    },
    {
      id: "gal-5",
      title: "Sacred Holy Fire & Florals",
      category: "ceremony",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
      caption: "The divine fragrance of marigolds and sandalwood.",
      aspect: "landscape",
    },
    {
      id: "gal-6",
      title: "Hand in Hand",
      category: "couple",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
      caption: "Holding tight through every twist and turn of life.",
      aspect: "square",
    },
    {
      id: "gal-7",
      title: "Family Celebrations",
      category: "family",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      caption: "Generations united in shared laughter and dance.",
      aspect: "landscape",
    },
    {
      id: "gal-8",
      title: "Palace Reflections",
      category: "prewedding",
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      caption: "Under the tranquil waters of the royal pavilion.",
      aspect: "landscape",
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
        {
          role: "Little Niece",
          names: "Baby Ananya Sharma",
          blessing: "Ready with her dancing shoes!",
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
        {
          role: "Maternal & Paternal Elders",
          names: "The Verma & Saxena Extended Families",
          blessing: "With heartfelt blessings and affection.",
        },
      ],
    },
  },
  music: {
    title: "Raag Yaman — Shehnai & Sitar Serenade",
    artist: "Royal Traditional Indian Wedding Ensemble",
    // We provide a soothing ambient audio generator / royalty-free track
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=indian-traditional-music-113063.mp3",
    autoPlayPrompt: "Tap anywhere to immerse in royal Indian melodies",
  },
  rsvp: {
    enabled: true,
    deadline: "1st December 2026",
    contactEmail: "celebrations@rohanpriya2026.com",
    contactPhone: "+91 98765 43210",
    allowPlusOne: true,
  },
};
