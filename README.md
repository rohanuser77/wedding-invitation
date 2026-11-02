# 🪷 Royal Indian Wedding Invitation Website
### *A Luxury Cinematic, Scroll-Based Interactive Digital Wedding Experience*

> **Theme**: ROYAL PALACE LUXURY × MODERN MINIMAL ELEGANCE  
> **Couple**: Rohan Sharma & Priya Verma  
> **Auspicious Dates**: 18 – 20 December 2026  
> **Destination**: Indore, Madhya Pradesh, India  

---

## 🌟 Overview & Key Highlights

This project is a handcrafted, cinematic, scroll-based Indian wedding invitation website built to replicate the tactile beauty of opening a physical royal royal invitation card.

### ✨ Hallmark Features
1. **Full-Screen Royal Envelope Opening Experience**:
   - 3D triangle envelope flap with a golden wax seal.
   - Auspicious Lord Ganesha motif with sacred Sanskrit invocation (`|| श्री गणेशाय नमः ||`).
   - Personalized guest badge automatically extracted from URL query strings (e.g. `?guest=Rajesh+Patel&family=true`).
   - Realistic 3D unfolding animation, golden sparkles / confetti burst, card emergence, and graceful transition to the main invitation.
   - Built-in "Skip Intro" option.
2. **GSAP Scroll-Based Invitation Transformation**:
   - Continuous storytelling experience powered by GSAP and ScrollTrigger.
   - Centered invitation separates into bride & groom editorial compositions without layout shifting.
3. **Six Individual Wedding Chapters**:
   - **Shubh Haldi & Phoolon Ki Holi**: Marigold yellow hues & floating marigold petals.
   - **Rang Mehndi & Sufi Shaam**: Emerald greens, henna botanicals, and mint splendor.
   - **Royal Sangeet & Musical Extravaganza**: Royal purple, stage lighting, and champagne shimmer.
   - **Traditional Tilak & Shubh Vivah Muhurat**: Deep maroon and antique gold silks.
   - **Grand Varmala & Pheras**: Royal bridal crimson, sacred mandap, and floating rose petals.
   - **Royal Gala Dinner & Dawat-e-Khaas**: Imperial ballroom atmosphere and black-tie gold elegance.
   - Each event includes **Google Maps Navigation**, **Google Calendar addition**, **.ics iCal file download**, and **Dress Code guide with color swatches**.
4. **Live Auspicious Muhurat Countdown**:
   - Live Days, Hours, Minutes, and Seconds counter calculating down to the sacred wedding time (19 December 2026, 07:35 PM IST).
   - Graceful post-wedding congratulatory message state when the time arrives.
5. **Love Story Timeline & Asymmetrical Photo Album**:
   - Curated milestones ("An Unplanned Encounter", "The Golden Fort Proposal", "The Roka", etc.).
   - Fullscreen photo lightbox with keyboard arrow navigation (`←` / `→`), escape key support, and category filtering.
6. **Palace Venue & Hospitality Concierge**:
   - Interactive Google Maps embed preview.
   - Valet parking, guest suite accommodations, and direct concierge contact phone hotline.
7. **Sharma & Verma Family Heritage Section**:
   - Lineage, parents, siblings, and ancestral blessings.
8. **Interactive Guest RSVP & Blessings Wall**:
   - Full validation, event selection checkboxes, guest counter, and dietary notes.
   - Persistent LocalStorage storage + optional Supabase / Firebase sync.
   - Confetti celebration upon response confirmation.
   - Interactive blessings board where loved ones can leave heartfelt wishes.
9. **Personalized Link Generation & Dynamic QR Code**:
   - In-app tool to generate custom guest invite links for WhatsApp.
   - Real-time dynamic QR code generation for mobile scanning.
10. **Royal Ambient Music Experience**:
    - Soothing Indian Shehnai, Tanpura, and Sitar serenade with volume equalizer, persistent floating widget, mute toggle, and Web Audio API synthesized drone fallback.

---

## 🛠️ Technology Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom royal Indian color palette & Google Fonts (`Cinzel`, `Cinzel Decorative`, `Playfair Display`, `Great Vibes`, `Plus Jakarta Sans`, `Rozha One`)
- **Animations**: GSAP, GSAP ScrollTrigger, Canvas Confetti
- **Icons**: Lucide React
- **QR Code**: `qrcode`
- **Deployment**: Vercel ready (`vercel.json`)

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Test Personalized Guest Links
Add `guest` and `family` URL parameters:
- `http://localhost:5173/?guest=Rajesh+Patel&family=true`
- `http://localhost:5173/?guest=Dr.+Sharma&family=false`

---

## ⚙️ Centralized Wedding Configuration

All wedding information is centralized in a single configuration file:

📁 **`src/data/weddingConfig.ts`**

You can configure:
- Bride & groom names, parent names, bios, and portraits
- Main wedding date and time (used by the live countdown)
- All 6 wedding ceremonies (dates, venues, times, dress codes, palette colors)
- Love story milestones and descriptions
- Photo gallery images and captions
- Family lineage and ancestral details
- Venue address and Google Maps links
- Music audio source

---

## 🌐 Deploying to Vercel

The application is pre-configured for instant zero-configuration deployment to Vercel:

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Luxury Indian Wedding Invitation"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Vercel will automatically detect:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**. Your live wedding invitation website will be live in under 60 seconds!

---

## 💌 Optional: Supabase RSVP Backend Integration

By default, RSVP responses and guest wishes persist in the visitor's local storage. To sync RSVPs to a centralized database:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Add your Supabase project credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. In Supabase, create an `rsvps` table with columns: `id`, `guest_name`, `guest_count`, `attendance`, `events`, `dietary_note`, `wishes`, `contact`, `created_at`.
