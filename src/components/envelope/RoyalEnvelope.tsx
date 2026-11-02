import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GaneshaIcon } from '../ornaments/GaneshaIcon';
import { CornerOrnament, FloatingParticles } from '../ornaments/MandalaBorder';
import { weddingConfig } from '../../data/weddingConfig';
import { Sparkles, MailOpen } from 'lucide-react';

interface RoyalEnvelopeProps {
  onOpenComplete: () => void;
  guestName?: string;
  hasFamily?: boolean;
}

export const RoyalEnvelope: React.FC<RoyalEnvelopeProps> = ({ 
  onOpenComplete,
  guestName,
  hasFamily = true
}) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [isCardEmerging, setIsCardEmerging] = useState<boolean>(false);
  const [isCardExpanded, setIsCardExpanded] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ECC872', '#C59A30', '#F5ECCF', '#FFF'],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      setIsCardEmerging(true);
    }, 600);

    setTimeout(() => {
      setIsCardExpanded(true);
      confetti({
        particleCount: 30,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#ECC872', '#C59A30'],
        disableForReducedMotion: true,
      });
    }, 1200);

    setTimeout(() => {
      onOpenComplete();
    }, 2100);
  };

  const formattedGuest = guestName 
    ? `${decodeURIComponent(guestName)}${hasFamily ? ' & Family' : ''}`
    : 'Our Esteemed Family & Friends';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0810] overflow-hidden select-none h-[100dvh]">
      {/* Royal ambient background lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-[#160D1C] to-[#0A060E]" />
      
      {/* Floating golden dust particles */}
      <FloatingParticles count={18} color="gold" />

      {/* Skip Intro button */}
      <button
        onClick={onOpenComplete}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 text-[11px] sm:text-xs font-serif tracking-widest text-gold-300/80 hover:text-gold-200 uppercase px-3.5 py-1.5 rounded-full border border-gold-500/30 hover:border-gold-400 bg-neutral-900/70 backdrop-blur-sm transition-all duration-300"
      >
        Skip Intro ➔
      </button>

      {/* Main Container — Strictly sized for mobile viewports */}
      <div className="relative w-full max-w-sm sm:max-w-md px-4 flex flex-col items-center justify-center max-h-[96dvh]">
        
        {/* Divine Sanskrit Header */}
        <div className={`transition-all duration-700 text-center mb-3 sm:mb-5 ${isOpening ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
          <div className="flex justify-center mb-1.5">
            <GaneshaIcon size={52} />
          </div>
          <p className="font-hindi text-gold-400 text-base sm:text-lg tracking-widest drop-shadow-[0_2px_8px_rgba(218,180,78,0.3)]">
            {weddingConfig.blessingsText.sanskritInvoking}
          </p>
          <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-400 mt-0.5">
            With the blessings of Lord Ganesha
          </p>
          
          {/* Personalized Guest Badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-950/80 border border-gold-500/40 text-gold-300 text-[11px] sm:text-xs font-serif tracking-wider shadow-inner-gold">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span className="truncate max-w-[260px]">Invited: <strong className="text-gold-200 font-semibold">{formattedGuest}</strong></span>
          </div>
        </div>

        {/* 3D Envelope Presentation */}
        <div className="relative w-full aspect-[1.45/1] max-w-[340px] sm:max-w-[420px] perspective-1000">
          
          {/* Emergent Invitation Card Inside */}
          <div
            className={`absolute inset-x-3 sm:inset-x-4 top-2 rounded-xl bg-ivory border-2 border-gold-400 shadow-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out z-20 ${
              isCardExpanded 
                ? 'scale-105 sm:scale-110 -translate-y-12 sm:-translate-y-16 opacity-100 shadow-[0_25px_60px_rgba(0,0,0,0.6)]' 
                : isCardEmerging 
                  ? '-translate-y-16 sm:-translate-y-24 scale-95 opacity-95' 
                  : 'translate-y-0 opacity-0 pointer-events-none'
            }`}
          >
            <CornerOrnament position="top-left" size={28} className="absolute top-1.5 left-1.5 text-gold-600" />
            <CornerOrnament position="top-right" size={28} className="absolute top-1.5 right-1.5 text-gold-600" />
            <CornerOrnament position="bottom-left" size={28} className="absolute bottom-1.5 left-1.5 text-gold-600" />
            <CornerOrnament position="bottom-right" size={28} className="absolute bottom-1.5 right-1.5 text-gold-600" />

            <span className="font-hindi text-gold-600 text-xs sm:text-sm font-semibold">|| श्री गणेशाय नमः ||</span>
            <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-neutral-600 mt-0.5">
              Together with their families
            </p>
            <h3 className="font-serif-royal text-xl sm:text-2xl text-royal-maroon font-bold tracking-wider my-1">
              PERSON 1 <span className="font-script text-gold-600 text-2xl font-normal">&</span> PERSON 2
            </h3>
            <p className="font-serif text-[9px] sm:text-[10px] tracking-widest uppercase text-neutral-700">
              {weddingConfig.weddingDetails.dateRangeDisplay} • {weddingConfig.weddingDetails.city}
            </p>
          </div>

          {/* Envelope Body (Pocket) */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-royal-maroon via-[#450910] to-[#2B0408] border-2 border-gold-500 shadow-royal-lg overflow-hidden flex flex-col justify-end p-4 sm:p-6 z-10">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ECC872_1px,_transparent_1px)] [background-size:16px_16px]" />
            
            <CornerOrnament position="bottom-left" size={40} className="absolute bottom-2 left-2 text-gold-400" />
            <CornerOrnament position="bottom-right" size={40} className="absolute bottom-2 right-2 text-gold-400" />

            {/* Front Royal Flap Trim & Foil Monogram */}
            <div className="relative z-10 text-center mb-1 sm:mb-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-[2px] shadow-lg mb-1.5">
                <div className="w-full h-full rounded-full bg-royal-maroon flex items-center justify-center border border-gold-300">
                  <span className="font-serif-royal text-gold-300 text-sm sm:text-base font-bold tracking-wider">
                    P1 & P2
                  </span>
                </div>
              </div>
              
              <p className="font-script text-xl sm:text-2xl text-gold-200">
                The Royal Wedding Invitation
              </p>
              <p className="font-serif text-[10px] text-gold-300/80 uppercase tracking-[0.2em] mt-0.5">
                {weddingConfig.weddingDetails.city}, India
              </p>
            </div>

            {/* Top Flap with 3D Flip */}
            <div 
              className={`absolute top-0 inset-x-0 h-1/2 origin-top transition-transform duration-700 ease-in-out preserve-3d z-30 ${
                isOpening ? '[transform:rotateX(180deg)]' : '[transform:rotateX(0deg)]'
              }`}
            >
              <div 
                className="w-full h-full bg-gradient-to-b from-[#610E17] to-[#450910] border-b border-gold-400 [clip-path:polygon(0_0,100%_0,50%_100%)] flex items-center justify-center filter drop-shadow-md backface-hidden"
              >
                <div className="absolute bottom-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 border border-gold-200 shadow-md flex items-center justify-center text-royal-maroon">
                  <span className="text-[11px] font-serif font-black tracking-tighter">|| ॐ ||</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: "OPEN YOUR INVITATION" */}
        <div className={`mt-5 sm:mt-7 transition-all duration-500 ${isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
          <button
            onClick={handleOpenEnvelope}
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-royal-maroon font-serif font-bold uppercase tracking-[0.18em] text-xs sm:text-sm shadow-royal hover:shadow-[0_0_30px_rgba(218,180,78,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MailOpen className="w-4 h-4 text-royal-maroon group-hover:rotate-12 transition-transform duration-300" />
            <span>Open Your Invitation</span>
            <Sparkles className="w-3.5 h-3.5 text-royal-maroon animate-spin" style={{ animationDuration: '4s' }} />
          </button>
          
          <p className="text-center font-serif text-[10px] text-neutral-400 tracking-wider mt-2">
            Touch or click to open the royal envelope
          </p>
        </div>

      </div>
    </div>
  );
};
