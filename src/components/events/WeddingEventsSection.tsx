import React, { useState } from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { FloralArchHeader, CornerOrnament, FloatingParticles } from '../ornaments/MandalaBorder';
import { createGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { Calendar, Clock, MapPin, Sparkles, Navigation, Palette, Download, ExternalLink } from 'lucide-react';

export const WeddingEventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(weddingConfig.events[0]?.id || '');
  const activeEvent = weddingConfig.events.find(e => e.id === activeTab) || weddingConfig.events[0];

  return (
    <section id="events" className="relative py-24 px-4 sm:px-6 bg-[#160E1A] text-ivory overflow-hidden">
      {/* Background Palace Illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-[#160E1A] to-[#0D0811] pointer-events-none" />
      
      {/* Dynamic atmospheric floating particles based on event */}
      {activeEvent.theme.pattern === 'marigold' && <FloatingParticles count={25} color="marigold" />}
      {activeEvent.theme.pattern === 'mandap' && <FloatingParticles count={25} color="rose" />}
      {(activeEvent.theme.pattern === 'sangeet' || activeEvent.theme.pattern === 'ballroom') && <FloatingParticles count={30} color="gold" />}

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <FloralArchHeader
          hindiTitle="|| मांगलिक कार्यक्रम एवं उत्सव ||"
          title="The Wedding Ceremonies"
          subtitle="A glorious tapestry of ancient rituals, vibrant festivities, and joyous celebrations"
          dark={true}
        />

        {/* Ceremony Navigation Pill Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 pt-2 mb-12 scrollbar-none px-2">
          {weddingConfig.events.map((event, index) => {
            const isSelected = event.id === activeEvent.id;
            return (
              <button
                key={event.id}
                onClick={() => setActiveTab(event.id)}
                className={`group shrink-0 relative px-5 py-2.5 rounded-full font-serif text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-neutral-950 font-bold border-gold-300 shadow-[0_0_20px_rgba(218,180,78,0.5)] scale-105'
                    : 'bg-neutral-900/60 text-gold-200/80 border-gold-500/20 hover:border-gold-400 hover:text-gold-200'
                }`}
              >
                <span className="text-[10px] opacity-75 font-mono">0{index + 1}</span>
                <span>{event.name.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Ceremony Cinematic Chapter Card */}
        <div 
          key={activeEvent.id}
          className="relative rounded-3xl overflow-hidden border-2 border-gold-500/50 shadow-royal-lg bg-neutral-950/80 backdrop-blur-md transition-all duration-700 animate-fadeIn"
        >
          {/* Subtle themed ambient gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${activeEvent.theme.bgClass} opacity-40 pointer-events-none`} />

          {/* Corner Filigrees */}
          <CornerOrnament position="top-left" size={60} className="absolute top-3 left-3 text-gold-400" />
          <CornerOrnament position="top-right" size={60} className="absolute top-3 right-3 text-gold-400" />
          <CornerOrnament position="bottom-left" size={60} className="absolute bottom-3 left-3 text-gold-400" />
          <CornerOrnament position="bottom-right" size={60} className="absolute bottom-3 right-3 text-gold-400" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 p-6 sm:p-12 lg:p-16 items-center">
            
            {/* Left: Ceremony Visual & Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] max-w-sm arch-window overflow-hidden border-2 border-gold-400 shadow-2xl group">
                <img 
                  src={activeEvent.image} 
                  alt={activeEvent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  loading="lazy"
                />
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

                {/* Event Badge */}
                <div className="absolute bottom-4 inset-x-4 text-center">
                  {activeEvent.hindiTitle && (
                    <p className="font-hindi text-gold-300 text-sm tracking-widest drop-shadow-md">
                      {activeEvent.hindiTitle}
                    </p>
                  )}
                  <p className="font-serif-royal text-ivory text-xl font-bold tracking-widest mt-1">
                    {activeEvent.name}
                  </p>
                </div>
              </div>

              {/* Special Highlights Pills */}
              {activeEvent.specialHighlights && (
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  {activeEvent.specialHighlights.map((hl, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-full bg-gold-950/70 border border-gold-500/30 text-gold-300 text-[11px] font-serif tracking-wider flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-gold-400" />
                      {hl}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Ceremony Details & Logistics */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              
              <div>
                <span className="font-script text-3xl sm:text-4xl text-gold-400 block mb-1">
                  Ceremony Celebration
                </span>
                <h3 className="font-serif-royal text-2xl sm:text-4xl text-ivory font-bold tracking-wider">
                  {activeEvent.name}
                </h3>
                <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
                  {activeEvent.description}
                </p>
              </div>

              {/* Muhurat Callout if present */}
              {activeEvent.muhurat && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/60 via-amber-950/50 to-red-950/60 border border-gold-400/60 text-gold-200 flex items-center gap-3">
                  <span className="text-2xl">🪷</span>
                  <div>
                    <h5 className="font-serif text-xs uppercase tracking-widest font-bold text-gold-300">
                      Sacred Auspicious Timing (शुभ मुहूर्त)
                    </h5>
                    <p className="font-serif text-xs sm:text-sm text-gold-100 mt-0.5 font-medium">
                      {activeEvent.muhurat}
                    </p>
                  </div>
                </div>
              )}

              {/* Time, Date, Venue Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Date & Time */}
                <div className="p-4 rounded-2xl bg-neutral-900/70 border border-gold-500/20 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-gold-950 text-gold-400 border border-gold-500/30 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                      Date & Day
                    </h5>
                    <p className="font-serif text-sm text-ivory font-medium mt-0.5">
                      {activeEvent.displayDate}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gold-300 mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeEvent.time}</span>
                    </div>
                  </div>
                </div>

                {/* Venue & Location */}
                <div className="p-4 rounded-2xl bg-neutral-900/70 border border-gold-500/20 flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-gold-950 text-gold-400 border border-gold-500/30 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-serif text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                      Ceremony Venue
                    </h5>
                    <p className="font-serif text-sm text-ivory font-medium mt-0.5">
                      {activeEvent.venue}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                      {activeEvent.address}
                    </p>
                  </div>
                </div>

              </div>

              {/* Dress Code Section */}
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-gold-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-gold-400 font-serif text-xs uppercase tracking-widest font-semibold">
                    <Palette className="w-4 h-4 text-gold-400" />
                    <span>Attire & Dress Code: {activeEvent.dressCode.title}</span>
                  </div>
                  
                  {/* Swatches */}
                  <div className="flex items-center gap-1.5">
                    {activeEvent.dressCode.palette.map((color, idx) => (
                      <span 
                        key={idx}
                        className="w-4 h-4 rounded-full border border-neutral-700 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-light">
                  {activeEvent.dressCode.description}
                </p>
              </div>

              {/* Action Buttons: Directions & Calendar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={activeEvent.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 font-serif font-semibold text-xs tracking-wider uppercase shadow-md hover:scale-105 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={createGoogleCalendarUrl(activeEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 text-gold-300 border border-gold-500/40 hover:border-gold-400 font-serif text-xs tracking-wider uppercase transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>Google Calendar</span>
                </a>

                <button
                  onClick={() => downloadIcsFile(activeEvent)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 text-neutral-300 border border-neutral-700 hover:border-gold-500/50 font-serif text-xs tracking-wider uppercase transition-all"
                  title="Download .ics event file for Apple Calendar or Outlook"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>iCal (.ics)</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
