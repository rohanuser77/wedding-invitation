import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../data/weddingConfig';
import type { WeddingEvent } from '../../data/weddingConfig';
import { CornerOrnament, RoyalDivider, FloatingParticles } from '../ornaments/MandalaBorder';
import { createGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { Calendar, Clock, MapPin, Navigation, Palette, Download, ExternalLink } from 'lucide-react';

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
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { opacity: 1, scale: 1, yPercent: 0, zIndex: 10 });
        } else {
          gsap.set(card, { opacity: 0, scale: 0.94, yPercent: 35, zIndex: 10 + i });
        }
      });

      const totalEvents = cards.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalEvents * 90}%`,
          pin: true,
          scrub: 0.7,
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

      // Smooth card lift off and next card pop-in
      for (let i = 0; i < totalEvents - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        tl.to(currentCard, {
          yPercent: -55,
          scale: 0.94,
          opacity: 0,
          rotationX: 6,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to(nextCard, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        }, '<0.25');
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

  // Dark themes per ceremony
  const darkCardThemes = {
    haldi: 'from-[#1C1205] via-[#140C03] to-[#0D0801] border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.2)]',
    mehndi: 'from-[#081812] via-[#05110C] to-[#020A07] border-emerald-400/80 shadow-[0_0_35px_rgba(16,185,129,0.2)]',
    sangeet: 'from-[#190C24] via-[#110719] to-[#0A0410] border-purple-400/80 shadow-[0_0_35px_rgba(168,85,247,0.2)]',
    tilak: 'from-[#1C070D] via-[#140409] to-[#0D0205] border-rose-400/80 shadow-[0_0_35px_rgba(244,63,94,0.2)]',
    wedding: 'from-[#22070D] via-[#170408] to-[#0D0204] border-red-500/90 shadow-[0_0_35px_rgba(239,68,68,0.25)]',
    reception: 'from-[#14121B] via-[#0E0D13] to-[#08070B] border-gold-400/80 shadow-[0_0_35px_rgba(218,180,78,0.25)]',
  };

  return (
    <section 
      ref={containerRef} 
      id="events" 
      className="relative min-h-screen w-full bg-[#0E0914] text-[#FAF4EB] flex flex-col justify-center items-center py-10 px-4 sm:px-6 overflow-hidden select-none"
    >
      {/* Dark Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/30 via-[#0E0914] to-[#07040A] pointer-events-none" />
      <FloatingParticles count={20} color="gold" />

      {/* Top Header & Ceremony Index Indicator */}
      <div className="relative z-20 text-center max-w-3xl mx-auto mb-5 px-4">
        <p className="font-hindi text-gold-400 text-sm sm:text-base tracking-widest font-semibold drop-shadow-sm">
          || मांगलिक वैवाहिक उत्सव ||
        </p>
        <h2 className="font-serif-royal text-2xl sm:text-4xl uppercase tracking-[0.12em] font-bold text-gold-100 mt-1">
          Wedding Ceremonies
        </h2>
        <RoyalDivider className="my-2" light={true} />
        
        {/* Quick Jump Pagination Bar */}
        <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          {events.map((evt, idx) => (
            <button
              key={evt.id}
              onClick={() => scrollToCard(idx)}
              className={`px-3 py-1 rounded-full font-serif text-xs tracking-wider transition-all duration-300 border flex items-center gap-1.5 ${
                idx === activeCardIndex
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 font-bold border-gold-300 shadow-[0_0_15px_rgba(218,180,78,0.5)] scale-105'
                  : 'bg-neutral-900/80 text-gold-300/80 border-gold-500/20 hover:border-gold-400 hover:text-white'
              }`}
            >
              <span className="font-bold">{evt.number}.</span>
              <span>{evt.name.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Stacked Card Deck: Small & Compact with Crisp Info Only */}
      <div 
        ref={deckRef}
        className="relative w-full max-w-2xl h-[440px] sm:h-[460px] perspective-1000 z-10 flex items-center justify-center"
      >
        {events.map((event: WeddingEvent, index: number) => {
          const themeStyle = darkCardThemes[event.id as keyof typeof darkCardThemes] || darkCardThemes.wedding;
          return (
            <div
              key={event.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`absolute inset-x-2 sm:inset-x-4 top-0 bottom-0 rounded-3xl bg-gradient-to-b ${themeStyle} border-2 p-5 sm:p-7 flex flex-col justify-between overflow-hidden`}
            >
              {/* Corner Filigrees */}
              <CornerOrnament position="top-left" size={32} className="absolute top-2 left-2 text-gold-400" />
              <CornerOrnament position="top-right" size={32} className="absolute top-2 right-2 text-gold-400" />
              <CornerOrnament position="bottom-left" size={32} className="absolute bottom-2 left-2 text-gold-400" />
              <CornerOrnament position="bottom-right" size={32} className="absolute bottom-2 right-2 text-gold-400" />

              {/* Header: Ceremony Number & Title */}
              <div className="relative z-10 border-b border-gold-500/25 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider bg-gold-950/80 border border-gold-400/60 text-gold-300">
                      Event {event.number}
                    </span>
                    <span className="font-hindi text-gold-400 text-sm font-semibold">
                      {event.hindiTitle}
                    </span>
                  </div>
                  <span className="text-xl">🪷</span>
                </div>

                <h3 className="font-serif-royal text-2xl sm:text-3xl text-gold-100 font-bold tracking-wide mt-1.5">
                  {event.name}
                </h3>
              </div>

              {/* Crisp Information Grid */}
              <div className="relative z-10 my-3 space-y-3">
                
                {/* Date, Time & Venue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Date & Time */}
                  <div className="p-3 rounded-2xl bg-neutral-950/60 border border-gold-500/30 flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-gold-950 text-gold-400 border border-gold-500/40 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-serif tracking-widest text-neutral-400 font-bold block">
                        Date & Time
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm text-gold-100 font-bold mt-0.5">
                        {event.displayDate}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gold-300 font-medium mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="p-3 rounded-2xl bg-neutral-950/60 border border-gold-500/30 flex items-start gap-2.5">
                    <div className="p-2 rounded-xl bg-gold-950 text-gold-400 border border-gold-500/40 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-serif tracking-widest text-neutral-400 font-bold block">
                        Ceremony Venue
                      </span>
                      <h4 className="font-serif text-xs sm:text-sm text-gold-100 font-bold mt-0.5 line-clamp-1">
                        {event.venue}
                      </h4>
                      <p className="text-[11px] text-neutral-300 mt-0.5 line-clamp-1">
                        {event.address}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Muhurat or Special Note if present */}
                {event.muhurat && (
                  <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-gold-200 text-xs flex items-center gap-2">
                    <span className="font-serif font-bold text-red-300 uppercase tracking-wider shrink-0">Muhurat:</span>
                    <span className="font-serif text-gold-100 font-medium">{event.muhurat}</span>
                  </div>
                )}

                {/* Dress Code (Crisp line with swatches) */}
                <div className="p-2.5 rounded-2xl bg-neutral-950/50 border border-gold-500/25 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Palette className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span className="font-serif text-neutral-400 font-bold uppercase tracking-wider">Dress Code:</span>
                    <span className="font-serif text-gold-100 font-semibold">{event.dressCode.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {event.dressCode.palette.map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="w-3.5 h-3.5 rounded-full border border-neutral-700 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer: Quick Actions */}
              <div className="relative z-10 pt-3 border-t border-gold-500/25 flex items-center justify-between gap-2">
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-neutral-950 font-serif font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={createGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/90 text-gold-300 border border-gold-500/40 hover:border-gold-300 font-serif text-xs font-semibold tracking-wider transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>Calendar</span>
                  </a>

                  <button
                    onClick={() => downloadIcsFile(event)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/90 text-neutral-300 border border-neutral-700 hover:border-gold-400 font-serif text-xs font-medium tracking-wider transition-all"
                    title="Download iCal file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.ics</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Subtle Scroll Hint */}
      <div className="relative z-20 mt-4 text-center text-xs font-serif text-gold-400 tracking-widest uppercase font-semibold flex items-center justify-center gap-2">
        <span>Scroll down to unfold next event</span>
        <span className="animate-bounce">↓</span>
      </div>

    </section>
  );
};
