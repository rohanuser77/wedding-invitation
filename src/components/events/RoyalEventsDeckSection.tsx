import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../data/weddingConfig';
import type { WeddingEvent } from '../../data/weddingConfig';
import { CornerOrnament, RoyalDivider, FloatingParticles } from '../ornaments/MandalaBorder';
import { createGoogleCalendarUrl } from '../../utils/calendar';
import { Calendar, Clock, MapPin, Navigation, Palette, ExternalLink } from 'lucide-react';

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
      // Hardware-accelerate initial card states
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { opacity: 1, scale: 1, yPercent: 0, zIndex: 10, force3D: true });
        } else {
          gsap.set(card, { opacity: 0, scale: 0.94, yPercent: 30, zIndex: 10 + i, force3D: true });
        }
      });

      const totalEvents = cards.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalEvents * 100}%`,
          pin: true,
          scrub: 0.4, // Responsive scrub with zero touch lag
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
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

      // Smooth scroll deck transition: Current card slides up and off, next card pops up
      for (let i = 0; i < totalEvents - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        tl.to(currentCard, {
          yPercent: -50,
          scale: 0.94,
          opacity: 0,
          rotationX: 5,
          duration: 1,
          ease: 'power2.inOut',
          force3D: true,
        })
        .to(nextCard, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          force3D: true,
        }, '<0.25');
      }

    }, containerRef);

    return () => ctx.revert();
  }, [events]);

  const scrollToCard = (index: number) => {
    setActiveCardIndex(index);
    if (!containerRef.current) return;
    const trigger = ScrollTrigger.getAll().find(st => st.trigger === containerRef.current);
    if (trigger) {
      const scrollPos = trigger.start + (index / (events.length - 1)) * (trigger.end - trigger.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  // Dark themes per ceremony
  const darkCardThemes = {
    haldi: 'from-[#1E1306] via-[#140C03] to-[#0A0601] border-amber-400/80 shadow-[0_10px_35px_rgba(245,158,11,0.25)]',
    mehndi: 'from-[#0A1A13] via-[#05110C] to-[#020A07] border-emerald-400/80 shadow-[0_10px_35px_rgba(16,185,129,0.25)]',
    sangeet: 'from-[#1B0C27] via-[#110719] to-[#0A0410] border-purple-400/80 shadow-[0_10px_35px_rgba(168,85,247,0.25)]',
    tilak: 'from-[#1E080F] via-[#140409] to-[#0D0205] border-rose-400/80 shadow-[0_10px_35px_rgba(244,63,94,0.25)]',
    wedding: 'from-[#24080F] via-[#170408] to-[#0D0204] border-red-500/90 shadow-[0_10px_35px_rgba(239,68,68,0.3)]',
    reception: 'from-[#16131F] via-[#0E0D13] to-[#08070B] border-gold-400/80 shadow-[0_10px_35px_rgba(218,180,78,0.25)]',
  };

  return (
    <section 
      ref={containerRef} 
      id="events" 
      className="relative min-h-screen w-full bg-[#0E0914] text-[#FAF4EB] flex flex-col justify-center items-center py-6 sm:py-12 px-3 sm:px-6 overflow-hidden select-none"
    >
      {/* Dark Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/30 via-[#0E0914] to-[#07040A] pointer-events-none" />
      <FloatingParticles count={16} color="gold" />

      {/* Top Header & Ceremony Index Indicator */}
      <div className="relative z-20 text-center max-w-3xl mx-auto mb-3 sm:mb-5 px-3">
        <p className="font-hindi text-gold-400 text-xs sm:text-base tracking-widest font-semibold drop-shadow-sm">
          || मांगलिक वैवाहिक उत्सव ||
        </p>
        <h2 className="font-serif-royal text-2xl sm:text-4xl uppercase tracking-[0.12em] font-bold text-gold-100 mt-0.5">
          Wedding Ceremonies
        </h2>
        <RoyalDivider className="my-1.5 sm:my-2" light={true} />
        
        {/* Quick Jump Navigation Pill Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 pt-1 max-w-full scrollbar-none px-1">
          {events.map((evt, idx) => (
            <button
              key={evt.id}
              onClick={() => scrollToCard(idx)}
              className={`shrink-0 px-3 py-1 rounded-full font-serif text-xs tracking-wider transition-all duration-300 border flex items-center gap-1 ${
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

      {/* 3D Scroll Card Deck: Pinned, Smooth, Uncongested & Spacious */}
      <div 
        ref={deckRef}
        className="relative w-full max-w-xl sm:max-w-2xl h-[420px] sm:h-[450px] perspective-1000 z-10 flex items-center justify-center px-1"
      >
        {events.map((event: WeddingEvent, index: number) => {
          const themeStyle = darkCardThemes[event.id as keyof typeof darkCardThemes] || darkCardThemes.wedding;
          return (
            <div
              key={event.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{ willChange: 'transform, opacity' }}
              className={`absolute inset-x-1 sm:inset-x-3 top-0 bottom-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b ${themeStyle} border-2 p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl`}
            >
              {/* Corner Filigrees */}
              <CornerOrnament position="top-left" size={28} className="absolute top-2 left-2 text-gold-400" />
              <CornerOrnament position="top-right" size={28} className="absolute top-2 right-2 text-gold-400" />
              <CornerOrnament position="bottom-left" size={28} className="absolute bottom-2 left-2 text-gold-400" />
              <CornerOrnament position="bottom-right" size={28} className="absolute bottom-2 right-2 text-gold-400" />

              {/* Header: Ceremony Badge & Title */}
              <div className="relative z-10 border-b border-gold-500/25 pb-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-serif font-bold uppercase tracking-wider bg-gold-950/90 border border-gold-400/60 text-gold-300">
                      Event {event.number} of {events.length}
                    </span>
                    <span className="font-hindi text-gold-400 text-xs sm:text-sm font-semibold">
                      {event.hindiTitle}
                    </span>
                  </div>
                  <span className="text-xl">🪷</span>
                </div>

                <h3 className="font-serif-royal text-xl sm:text-3xl text-gold-100 font-bold tracking-wide mt-1 leading-snug">
                  {event.name}
                </h3>
              </div>

              {/* Clean, Uncongested Info Sections */}
              <div className="relative z-10 my-2.5 space-y-2.5">
                
                {/* Date & Time */}
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-gold-500/30 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gold-950 text-gold-400 border border-gold-500/40 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm text-gold-100 font-bold truncate">
                      {event.displayDate}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-gold-300 font-medium mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>

                {/* Venue */}
                <div className="p-3 rounded-xl bg-neutral-950/70 border border-gold-500/30 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gold-950 text-gold-400 border border-gold-500/40 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm text-gold-100 font-bold truncate">
                      {event.venue}
                    </h4>
                    <p className="text-xs text-neutral-300 truncate mt-0.5">
                      {event.address}
                    </p>
                  </div>
                </div>

                {/* Muhurat Note if present */}
                {event.muhurat && (
                  <div className="p-2.5 rounded-xl bg-red-950/50 border border-red-500/40 text-gold-200 text-xs flex items-center gap-2">
                    <span className="font-serif font-bold text-red-300 uppercase tracking-wider shrink-0">Muhurat:</span>
                    <span className="font-serif text-gold-100 font-medium truncate">{event.muhurat}</span>
                  </div>
                )}

                {/* Dress Code */}
                <div className="p-2.5 rounded-xl bg-neutral-950/60 border border-gold-500/25 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <Palette className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span className="font-serif text-neutral-400 font-bold uppercase text-[10px] sm:text-xs shrink-0">Dress Code:</span>
                    <span className="font-serif text-gold-100 font-semibold truncate text-xs">{event.dressCode.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
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

              {/* Action Buttons: Direct Google Maps & Add to Calendar */}
              <div className="relative z-10 pt-2.5 border-t border-gold-500/25 flex items-center gap-2.5">
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-neutral-950 font-serif font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={createGoogleCalendarUrl(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-neutral-900/90 text-gold-300 border border-gold-500/40 hover:border-gold-300 font-serif text-xs font-semibold tracking-wider transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>Add to Calendar</span>
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {/* Subtle Scroll Hint */}
      <div className="relative z-20 mt-4 text-center text-xs font-serif text-gold-400 tracking-widest uppercase font-semibold flex items-center justify-center gap-1.5">
        <span>Scroll to unfold next ceremony</span>
        <span className="animate-bounce">↓</span>
      </div>

    </section>
  );
};
