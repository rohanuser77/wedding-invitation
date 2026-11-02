import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../data/weddingConfig';
import type { WeddingEvent } from '../../data/weddingConfig';
import { CornerOrnament, RoyalDivider, FloatingParticles } from '../ornaments/MandalaBorder';
import { createGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { Calendar, Clock, MapPin, Navigation, Palette, Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const RoyalEventsDeckSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const { events } = weddingConfig;

  // Desktop GSAP scroll scrub
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

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

  const goToCard = (index: number) => {
    if (index >= 0 && index < events.length) {
      setActiveCardIndex(index);
    }
  };

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev < events.length - 1 ? prev + 1 : 0));
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev > 0 ? prev - 1 : events.length - 1));
  };

  // Touch Swipe Handlers for 100% lag-free mobile swipe!
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 40) {
      // Swiped Left -> Next Card
      nextCard();
    } else if (diff < -40) {
      // Swiped Right -> Prev Card
      prevCard();
    }
    setTouchStartX(null);
  };

  // Dark themes per ceremony
  const darkCardThemes = {
    haldi: 'from-[#1C1205] via-[#140C03] to-[#0D0801] border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.25)]',
    mehndi: 'from-[#081812] via-[#05110C] to-[#020A07] border-emerald-400/80 shadow-[0_0_35px_rgba(16,185,129,0.25)]',
    sangeet: 'from-[#190C24] via-[#110719] to-[#0A0410] border-purple-400/80 shadow-[0_0_35px_rgba(168,85,247,0.25)]',
    tilak: 'from-[#1C070D] via-[#140409] to-[#0D0205] border-rose-400/80 shadow-[0_0_35px_rgba(244,63,94,0.25)]',
    wedding: 'from-[#22070D] via-[#170408] to-[#0D0204] border-red-500/90 shadow-[0_0_35px_rgba(239,68,68,0.3)]',
    reception: 'from-[#14121B] via-[#0E0D13] to-[#08070B] border-gold-400/80 shadow-[0_0_35px_rgba(218,180,78,0.3)]',
  };

  const activeEvent = events[activeCardIndex] || events[0];
  const activeTheme = darkCardThemes[activeEvent.id as keyof typeof darkCardThemes] || darkCardThemes.wedding;

  return (
    <section 
      ref={containerRef} 
      id="events" 
      className="relative min-h-screen w-full bg-[#0E0914] text-[#FAF4EB] flex flex-col justify-center items-center py-8 sm:py-12 px-3 sm:px-6 overflow-hidden select-none"
    >
      {/* Dark Ambient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/30 via-[#0E0914] to-[#07040A] pointer-events-none" />
      <FloatingParticles count={16} color="gold" />

      {/* Top Header */}
      <div className="relative z-20 text-center max-w-3xl mx-auto mb-3 sm:mb-5 px-3">
        <p className="font-hindi text-gold-400 text-xs sm:text-base tracking-widest font-semibold drop-shadow-sm">
          || मांगलिक वैवाहिक उत्सव ||
        </p>
        <h2 className="font-serif-royal text-2xl sm:text-4xl uppercase tracking-[0.12em] font-bold text-gold-100 mt-0.5">
          Wedding Ceremonies
        </h2>
        <RoyalDivider className="my-1.5 sm:my-2" light={true} />
        
        {/* Quick Tap Event Pill Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 pt-1 max-w-full scrollbar-none px-1">
          {events.map((evt, idx) => (
            <button
              key={evt.id}
              onClick={() => goToCard(idx)}
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

      {/* 📱 MOBILE VIEW: Silky Smooth, Uncongested, 60fps Swipe Card (Visible on < 768px) */}
      <div 
        className="md:hidden w-full max-w-md relative z-10 px-1 py-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          key={activeEvent.id}
          className={`w-full rounded-2xl bg-gradient-to-b ${activeTheme} border-2 p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 animate-fadeIn`}
        >
          {/* Corner Filigrees */}
          <CornerOrnament position="top-left" size={26} className="absolute top-1.5 left-1.5 text-gold-400" />
          <CornerOrnament position="top-right" size={26} className="absolute top-1.5 right-1.5 text-gold-400" />

          {/* Header */}
          <div className="border-b border-gold-500/25 pb-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-serif font-bold uppercase tracking-wider bg-gold-950/90 border border-gold-400/60 text-gold-300">
                Event {activeEvent.number} of {events.length}
              </span>
              <span className="font-hindi text-gold-400 text-xs font-semibold">
                {activeEvent.hindiTitle}
              </span>
            </div>

            <h3 className="font-serif-royal text-xl text-gold-100 font-bold tracking-wide mt-1 leading-snug">
              {activeEvent.name}
            </h3>
          </div>

          {/* Uncongested Mobile Info Stack */}
          <div className="my-3 space-y-2.5">
            {/* Date & Time */}
            <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-gold-500/30 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
              <div>
                <h4 className="font-serif text-xs text-gold-100 font-bold">
                  {activeEvent.displayDate}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-gold-300 font-medium mt-0.5">
                  <Clock className="w-3 h-3 text-gold-400" />
                  <span>{activeEvent.time}</span>
                </div>
              </div>
            </div>

            {/* Venue */}
            <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-gold-500/30 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-xs text-gold-100 font-bold line-clamp-1">
                  {activeEvent.venue}
                </h4>
                <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                  {activeEvent.address}
                </p>
              </div>
            </div>

            {/* Muhurat if present */}
            {activeEvent.muhurat && (
              <div className="p-2 rounded-xl bg-red-950/50 border border-red-500/40 text-gold-200 text-[11px] font-serif flex items-center gap-1.5">
                <span className="font-bold text-red-300 shrink-0">Muhurat:</span>
                <span className="text-gold-100">{activeEvent.muhurat}</span>
              </div>
            )}

            {/* Dress Code */}
            <div className="p-2 rounded-xl bg-neutral-950/60 border border-gold-500/25 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 truncate">
                <Palette className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span className="text-neutral-400 font-bold uppercase text-[10px]">Dress Code:</span>
                <span className="text-gold-100 font-semibold truncate text-[11px]">{activeEvent.dressCode.title}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-1">
                {activeEvent.dressCode.palette.map((c, cIdx) => (
                  <span
                    key={cIdx}
                    className="w-3 h-3 rounded-full border border-neutral-700"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-gold-500/25 flex items-center gap-2">
            <a
              href={activeEvent.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-neutral-950 font-serif font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>

            <a
              href={createGoogleCalendarUrl(activeEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-900 text-gold-300 border border-gold-500/40 font-serif text-xs font-semibold tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>Add to Calendar</span>
            </a>
          </div>

          {/* Mobile Swipe / Navigation Arrows */}
          <div className="mt-3 flex items-center justify-between text-xs font-serif text-gold-300/80 pt-1">
            <button
              onClick={prevCard}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-gold-500/30 flex items-center gap-1 text-[11px]"
            >
              <ChevronLeft className="w-3 h-3" />
              <span>Prev</span>
            </button>

            <span className="text-[10px] tracking-wider text-neutral-400">
              Swipe Left / Right
            </span>

            <button
              onClick={nextCard}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-gold-500/30 flex items-center gap-1 text-[11px]"
            >
              <span>Next</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 💻 DESKTOP VIEW: Sleek 3D Stacked Deck with GSAP Scroll scrubbing (Visible on >= 768px) */}
      <div 
        ref={deckRef}
        className="hidden md:flex relative w-full max-w-2xl h-[440px] perspective-1000 z-10 items-center justify-center"
      >
        {events.map((event: WeddingEvent, index: number) => {
          const themeStyle = darkCardThemes[event.id as keyof typeof darkCardThemes] || darkCardThemes.wedding;
          return (
            <div
              key={event.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`absolute inset-x-2 top-0 bottom-0 rounded-3xl bg-gradient-to-b ${themeStyle} border-2 p-6 flex flex-col justify-between overflow-hidden shadow-2xl`}
            >
              <CornerOrnament position="top-left" size={32} className="absolute top-2 left-2 text-gold-400" />
              <CornerOrnament position="top-right" size={32} className="absolute top-2 right-2 text-gold-400" />
              <CornerOrnament position="bottom-left" size={32} className="absolute bottom-2 left-2 text-gold-400" />
              <CornerOrnament position="bottom-right" size={32} className="absolute bottom-2 right-2 text-gold-400" />

              {/* Header */}
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

              {/* Info Grid */}
              <div className="relative z-10 my-3 space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
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

                {event.muhurat && (
                  <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-gold-200 text-xs flex items-center gap-2">
                    <span className="font-serif font-bold text-red-300 uppercase tracking-wider shrink-0">Muhurat:</span>
                    <span className="font-serif text-gold-100 font-medium">{event.muhurat}</span>
                  </div>
                )}

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

              {/* Desktop Actions */}
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

    </section>
  );
};
