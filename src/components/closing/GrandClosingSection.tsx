import React from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { GaneshaIcon } from '../ornaments/GaneshaIcon';
import { CornerOrnament, RoyalDivider, FloatingParticles } from '../ornaments/MandalaBorder';
import { ArrowUp } from 'lucide-react';

export const GrandClosingSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-28 px-4 sm:px-6 bg-gradient-to-b from-[#180E1C] via-[#100914] to-[#08050A] text-ivory overflow-hidden select-none">
      
      {/* Ambient Mandap Glow & Petals */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-black pointer-events-none" />
      <FloatingParticles count={25} color="rose" />

      <div className="relative max-w-4xl mx-auto z-10 text-center">

        {/* Sacred Ganesha Blessing */}
        <div className="flex justify-center mb-4">
          <GaneshaIcon size={64} />
        </div>
        
        <p className="font-hindi text-gold-400 text-lg sm:text-xl font-bold tracking-widest">
          {weddingConfig.blessingsText.sanskritInvoking}
        </p>

        <RoyalDivider className="my-6" light={true} />

        {/* Main Sacred Quote */}
        <span className="font-script text-3xl sm:text-5xl text-gold-300 block mb-3">
          With Love, Grace & Eternal Gratitude
        </span>

        <h2 className="font-serif-royal text-2xl sm:text-4xl md:text-5xl text-ivory font-bold tracking-[0.14em] uppercase leading-tight max-w-3xl mx-auto">
          {weddingConfig.blessingsText.closingQuote}
        </h2>

        <p className="font-serif text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto mt-6 leading-relaxed tracking-wider">
          {weddingConfig.blessingsText.closingSubtext}
        </p>

        {/* Couple's Names Sign-off */}
        <div className="my-10 inline-block p-6 sm:p-8 rounded-3xl bg-neutral-950/60 border border-gold-400/50 backdrop-blur-md relative">
          <CornerOrnament position="top-left" size={30} className="absolute top-2 left-2 text-gold-400" />
          <CornerOrnament position="top-right" size={30} className="absolute top-2 right-2 text-gold-400" />
          <CornerOrnament position="bottom-left" size={30} className="absolute bottom-2 left-2 text-gold-400" />
          <CornerOrnament position="bottom-right" size={30} className="absolute bottom-2 right-2 text-gold-400" />

          <h3 className="font-serif-royal text-2xl sm:text-3xl text-gold-200 font-bold tracking-widest">
            {weddingConfig.couple.groom.firstName} <span className="font-script text-gold-400 text-3xl font-normal">&</span> {weddingConfig.couple.bride.firstName}
          </h3>
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-neutral-400 mt-1">
            {weddingConfig.weddingDetails.dateRangeDisplay} • {weddingConfig.weddingDetails.city}, India
          </p>
          <p className="font-mono text-xs text-gold-400 tracking-wider mt-2 font-light">
            {weddingConfig.weddingDetails.hashtag}
          </p>
        </div>

        {/* Back to Top CTA */}
        <div className="mt-4">
          <button
            onClick={scrollToTop}
            aria-label="Back to top of wedding invitation"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-500/40 hover:border-gold-300 text-gold-300 text-xs font-serif uppercase tracking-widest hover:bg-gold-950/60 transition-all duration-300"
          >
            <span>Return to Beginning</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <p className="font-serif text-[11px] text-neutral-500 uppercase tracking-widest mt-12">
          Designed with royal devotion for the sacred wedding celebration • 2026
        </p>

      </div>
    </footer>
  );
};
