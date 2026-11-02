import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../data/weddingConfig';
import type { WeddingEvent } from '../../data/weddingConfig';
import { CornerOrnament, RoyalDivider, FloatingParticles } from '../ornaments/MandalaBorder';
import { createGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { Calendar, Clock, MapPin, Navigation, Palette, Download, ExternalLink, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const RoyalEventsDeckSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const { events } = weddingConfig;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial positions: first card is in view, remaining cards are waiting below
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { opacity: 1, scale: 1, yPercent: 0, zIndex: 10 });
        } else {
          gsap.set(card, { opacity: 0, scale: 0.9, yPercent: 40, zIndex: 10 + i });
        }
      });

      // Pin the section and scrub card transitions as user scrolls
      const totalEvents = cards.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalEvents * 100}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentIndex = Math.min(
              totalEvents - 1,
              Math.floor(progress * totalEvents)
            );
            setActiveCardIndex(currentIndex);
          },
        },
      });

      // Sequential card transitions: Card i slides/lifts off and Card i+1 pops into place
      for (let i = 0; i < totalEvents - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        tl.to(currentCard, {
          yPercent: -60,
          scale: 0.92,
          opacity: 0,
          rotationX: 8,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to(nextCard, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, '<0.3');
      }

    }, containerRef);

    return () => ctx.revert();
  }, [events]);

  const scrollToCard = (index: number) => {
    setActiveCardIndex(index);
    if (!containerRef.current) return;
    const trigger = ScrollTrigger.getById('royal-events-deck');
    if (trigger) {
      const scrollPos = trigger.start + (index / (events.length - 1)) * (trigger.end - trigger.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="events" 
      className="relative min-h-screen w-full bg-[#180E1A] text-neutral-800 flex flex-col justify-center items-center py-12 px-4 sm:px-6 overflow-hidden select-none"
    >
      {/* Royal Palace Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/50 via-[#180E1A] to-[#0A060C] pointer-events-none" />
      <FloatingParticles count={25} color="gold" />

      {/* Top Header & Ceremony Index Indicator */}
      <div className="relative z-20 text-center max-w-4xl mx-auto mb-6 px-4">
        <p className="font-hindi text-gold-400 text-sm sm:text-base tracking-widest font-semibold drop-shadow-sm">
          || मांगलिक वैवाहिक उत्सव एवं संस्कार ||
        </p>
        <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.12em] font-bold text-ivory mt-1">
          The Wedding Ceremonies
        </h2>
        <RoyalDivider className="my-2" light={true} />
        <p className="font-serif text-xs sm:text-sm text-gold-200/90 font-light max-w-xl mx-auto">
          Scroll down to unfold each royal ceremony card • Function {activeCardIndex + 1} of {events.length}
        </p>

        {/* Quick Jump Pagination Bar */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          {events.map((evt, idx) => (
            <button
              key={evt.id}
              onClick={() => scrollToCard(idx)}
              className={`px-3.5 py-1.5 rounded-full font-serif text-xs tracking-wider transition-all duration-300 border flex items-center gap-1.5 ${
                idx === activeCardIndex
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 font-bold border-gold-300 shadow-[0_0_15px_rgba(218,180,78,0.5)] scale-105'
                  : 'bg-neutral-950/70 text-gold-300/80 border-gold-500/20 hover:border-gold-400 hover:text-white'
              }`}
            >
              <span>{evt.number}.</span>
              <span className="hidden sm:inline">{evt.name.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Stacked Card Deck Container */}
      <div 
        ref={deckRef}
        className="relative w-full max-w-4xl h-[560px] sm:h-[580px] md:h-[600px] perspective-1000 z-10 flex items-center justify-center"
      >
        {events.map((event: WeddingEvent, index: number) => {
          return (
            <div
              key={event.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`absolute inset-x-2 sm:inset-x-6 top-0 bottom-0 rounded-3xl bg-gradient-to-b ${event.theme.cardBg} border-2 ${event.theme.cardBorder} shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden transition-shadow`}
              style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(197, 154, 48, 0.35)',
              }}
            >
              {/* Corner Royal Filigree Ornaments */}
              <CornerOrnament position="top-left" size={45} className="absolute top-2 left-2 text-gold-600" />
              <CornerOrnament position="top-right" size={45} className="absolute top-2 right-2 text-gold-600" />
              <CornerOrnament position="bottom-left" size={45} className="absolute bottom-2 left-2 text-gold-600" />
              <CornerOrnament position="bottom-right" size={45} className="absolute bottom-2 right-2 text-gold-600" />

              {/* Watermark Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#966F12_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              {/* Card Header: Hindi Title & Numbering */}
              <div className="relative z-10 flex items-start justify-between border-b border-gold-400/40 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-hindi text-royal-crimson text-sm sm:text-base font-bold tracking-wide">
                      {event.hindiTitle}
                    </span>
                    <span className="text-gold-500">•</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-serif font-bold uppercase tracking-wider border ${event.theme.badgeBg}`}>
                      Event {event.number}
                    </span>
                  </div>
                  <h3 className="font-serif-royal text-2xl sm:text-3xl md:text-4xl text-royal-maroon font-bold tracking-wide">
                    {event.name}
                  </h3>
                  <p className="font-serif text-xs sm:text-sm text-neutral-600 italic mt-0.5 font-light">
                    "{event.slogan}"
                  </p>
                </div>

                {/* Auspicious Lotus / Diya Accent */}
                <div className="hidden sm:flex flex-col items-center shrink-0 text-gold-600">
                  <span className="text-2xl">🪷</span>
                  <span className="text-[10px] font-hindi font-semibold text-royal-maroon">शुभ मंगल</span>
                </div>
              </div>

              {/* Card Body: Description, Timings, Venue, Dress Code */}
              <div className="relative z-10 my-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                
                {/* Left 7 Columns: Timings, Address, Description, Rituals */}
                <div className="md:col-span-7 space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                    {event.description}
                  </p>

                  {/* Muhurat Callout if available */}
                  {event.muhurat && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-red-100/90 to-amber-100/90 border border-red-300 text-royal-crimson flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-royal-crimson shrink-0" />
                      <div className="text-xs font-serif font-semibold">
                        <span className="uppercase tracking-wider">Auspicious Muhurat: </span>
                        <span className="text-neutral-900 font-bold">{event.muhurat}</span>
                      </div>
                    </div>
                  )}

                  {/* Date, Time & Venue in clean high-contrast boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Date & Time */}
                    <div className="p-3.5 rounded-2xl bg-white/90 border border-gold-300 shadow-sm flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-gold-50 text-royal-maroon border border-gold-300 shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-serif tracking-widest text-neutral-500 font-semibold block">
                          Day & Date
                        </span>
                        <h4 className="font-serif text-xs sm:text-sm text-neutral-900 font-bold mt-0.5">
                          {event.displayDate}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-royal-maroon font-semibold mt-1">
                          <Clock className="w-3.5 h-3.5 text-gold-600" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="p-3.5 rounded-2xl bg-white/90 border border-gold-300 shadow-sm flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-gold-50 text-royal-maroon border border-gold-300 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-serif tracking-widest text-neutral-500 font-semibold block">
                          Ceremony Venue
                        </span>
                        <h4 className="font-serif text-xs sm:text-sm text-neutral-900 font-bold mt-0.5">
                          {event.venue}
                        </h4>
                        <p className="text-[11px] text-neutral-600 mt-0.5 line-clamp-1">
                          {event.address}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Ritual Highlights */}
                  {event.rituals && (
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="text-[11px] font-serif uppercase tracking-wider text-neutral-600 font-bold">Rituals:</span>
                      {event.rituals.map((ritual, rIdx) => (
                        <span 
                          key={rIdx}
                          className="px-2.5 py-1 rounded-full bg-white/90 border border-gold-300 text-royal-maroon text-[11px] font-serif font-medium shadow-xs"
                        >
                          ✦ {ritual}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right 5 Columns: Visual Image & Dress Code Swatches */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                  
                  {/* Photo Thumbnail */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border-2 border-gold-400 shadow-md">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover filter brightness-95"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 left-3 font-serif text-xs text-white tracking-widest font-semibold uppercase drop-shadow-md">
                      Amber Palace, Indore
                    </span>
                  </div>

                  {/* Dress Code Swatch Box */}
                  <div className="p-3.5 rounded-2xl bg-white/95 border border-gold-300 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-royal-maroon font-serif text-xs uppercase tracking-wider font-bold">
                        <Palette className="w-3.5 h-3.5 text-gold-600" />
                        <span>Dress Code: {event.dressCode.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {event.dressCode.palette.map((c, cIdx) => (
                          <span
                            key={cIdx}
                            className="w-4 h-4 rounded-full border border-neutral-300 shadow-xs"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-700 leading-snug font-normal">
                      {event.dressCode.description}
                    </p>
                  </div>

                </div>

              </div>

              {/* Card Footer Actions: Google Maps & Add to Calendar */}
              <div className="relative z-10 pt-3 border-t border-gold-400/40 flex flex-wrap items-center justify-between gap-3">
                
                {/* Google Maps Link */}
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-royal-maroon to-[#450910] text-gold-100 font-serif font-bold text-xs uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold-300" />
                  <span>Open Location in Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                {/* Calendar Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={createGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-neutral-800 border border-gold-400 hover:bg-gold-50 font-serif text-xs font-semibold tracking-wider transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span>Add to Google Calendar</span>
                  </a>

                  <button
                    onClick={() => downloadIcsFile(event)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-neutral-700 border border-neutral-300 hover:border-gold-400 font-serif text-xs font-medium tracking-wider transition-all"
                    title="Download iCal event file for Apple Calendar or Outlook"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>iCal (.ics)</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Subtle Scroll Hint */}
      <div className="relative z-20 mt-6 text-center text-xs font-serif text-gold-300/80 tracking-widest uppercase flex items-center justify-center gap-2">
        <span>Scroll down to reveal next ceremony</span>
        <span className="animate-bounce">↓</span>
      </div>

    </section>
  );
};
