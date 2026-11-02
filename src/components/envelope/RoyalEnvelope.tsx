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

    // Golden sparkles / confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ECC872', '#C59A30', '#F5ECCF', '#966F12', '#FFFFFF'],
      disableForReducedMotion: true,
    });

    // Step 2: Card emerges after flap opens
    setTimeout(() => {
      setIsCardEmerging(true);
    }, 700);

    // Step 3: Card expands into view
    setTimeout(() => {
      setIsCardExpanded(true);
      confetti({
        particleCount: 35,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#ECC872', '#C59A30'],
        disableForReducedMotion: true,
      });
    }, 1400);

    // Step 4: Complete transition into main website
    setTimeout(() => {
      onOpenComplete();
    }, 2400);
  };

  const formattedGuest = guestName 
    ? `${decodeURIComponent(guestName)}${hasFamily ? ' & Family' : ''}`
    : 'Our Esteemed Family & Friends';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#150F16] overflow-hidden select-none">
      {/* Royal ambient background lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-[#1C1221] to-[#0D0A10]" />
      
      {/* Floating golden dust particles */}
      <FloatingParticles count={25} color="gold" />

      {/* Skip Intro button */}
      <button
        onClick={onOpenComplete}
        className="absolute top-6 right-6 z-40 text-xs sm:text-sm font-serif tracking-widest text-gold-300/80 hover:text-gold-200 uppercase px-4 py-1.5 rounded-full border border-gold-500/30 hover:border-gold-400 bg-neutral-900/60 backdrop-blur-sm transition-all duration-300"
      >
        Skip Intro ➔
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-lg px-4 sm:px-6 flex flex-col items-center">
        
        {/* Divine Sanskrit Header */}
        <div className={`transition-all duration-700 text-center mb-6 ${isOpening ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
          <div className="flex justify-center mb-2">
            <GaneshaIcon size={64} />
          </div>
          <p className="font-hindi text-gold-400 text-lg tracking-widest drop-shadow-[0_2px_8px_rgba(218,180,78,0.3)]">
            {weddingConfig.blessingsText.sanskritInvoking}
          </p>
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-neutral-400 mt-1">
            With the divine blessings of Lord Ganesha
          </p>
          
          {/* Personalized Guest Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-950/70 border border-gold-500/40 text-gold-300 text-xs sm:text-sm font-serif tracking-wider shadow-inner-gold">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Cordially Invited: <strong className="text-gold-200 font-semibold">{formattedGuest}</strong></span>
          </div>
        </div>

        {/* 3D Envelope Presentation */}
        <div className="relative w-full aspect-[1.42/1] max-w-[440px] perspective-1000">
          
          {/* Emergent Invitation Card Inside */}
          <div
            className={`absolute inset-x-4 top-2 rounded-xl bg-ivory border-2 border-gold-400 shadow-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out z-20 ${
              isCardExpanded 
                ? 'scale-110 -translate-y-16 opacity-100 shadow-[0_25px_60px_rgba(0,0,0,0.6)]' 
                : isCardEmerging 
                  ? '-translate-y-24 scale-95 opacity-95' 
                  : 'translate-y-0 opacity-0 pointer-events-none'
            }`}
          >
            <CornerOrnament position="top-left" size={32} className="absolute top-2 left-2 text-gold-600" />
            <CornerOrnament position="top-right" size={32} className="absolute top-2 right-2 text-gold-600" />
            <CornerOrnament position="bottom-left" size={32} className="absolute bottom-2 left-2 text-gold-600" />
            <CornerOrnament position="bottom-right" size={32} className="absolute bottom-2 right-2 text-gold-600" />

            <span className="font-hindi text-gold-600 text-sm font-medium">|| श्री गणेशाय नमः ||</span>
            <p className="font-serif text-[11px] uppercase tracking-[0.2em] text-neutral-600 mt-1">
              Together with their families
            </p>
            <h3 className="font-serif-royal text-2xl sm:text-3xl text-royal-maroon font-bold tracking-widest my-1.5">
              {weddingConfig.couple.groom.firstName} <span className="font-script text-gold-600 text-3xl font-normal">&</span> {weddingConfig.couple.bride.firstName}
            </h3>
            <p className="font-serif text-[10px] tracking-widest uppercase text-neutral-700">
              {weddingConfig.weddingDetails.dateRangeDisplay} • {weddingConfig.weddingDetails.city}
            </p>
          </div>

          {/* Envelope Body (Pocket) */}
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-royal-maroon via-[#450910] to-[#2B0408] border-2 border-gold-500 shadow-royal-lg overflow-hidden flex flex-col justify-end p-6 z-10">
            {/* Subtle Royal Damask / Filigree pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ECC872_1px,_transparent_1px)] [background-size:16px_16px]" />
            
            {/* Corner Filigrees on envelope face */}
            <CornerOrnament position="bottom-left" size={50} className="absolute bottom-2 left-2 text-gold-400" />
            <CornerOrnament position="bottom-right" size={50} className="absolute bottom-2 right-2 text-gold-400" />

            {/* Front Royal Flap Trim & Foil Monogram */}
            <div className="relative z-10 text-center mb-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-[2px] shadow-lg mb-2">
                <div className="w-full h-full rounded-full bg-royal-maroon flex items-center justify-center border border-gold-300">
                  <span className="font-serif-royal text-gold-300 text-lg sm:text-xl font-bold tracking-wider">
                    {weddingConfig.couple.groom.firstName[0]} & {weddingConfig.couple.bride.firstName[0]}
                  </span>
                </div>
              </div>
              
              <p className="font-script text-2xl sm:text-3xl text-gold-200">
                The Royal Wedding Invitation
              </p>
              <p className="font-serif text-xs text-gold-300/80 uppercase tracking-[0.2em] mt-1">
                {weddingConfig.weddingDetails.city}, India
              </p>
            </div>

            {/* Top Flap with 3D Flip */}
            <div 
              className={`absolute top-0 inset-x-0 h-1/2 origin-top transition-transform duration-700 ease-in-out preserve-3d z-30 ${
                isOpening ? '[transform:rotateX(180deg)]' : '[transform:rotateX(0deg)]'
              }`}
            >
              {/* Triangular Flap front */}
              <div 
                className="w-full h-full bg-gradient-to-b from-[#610E17] to-[#450910] border-b border-gold-400 [clip-path:polygon(0_0,100%_0,50%_100%)] flex items-center justify-center filter drop-shadow-md backface-hidden"
              >
                {/* Golden Wax Seal */}
                <div className="absolute bottom-1 w-11 h-11 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 border border-gold-200 shadow-md flex items-center justify-center text-royal-maroon cursor-pointer group hover:scale-105 transition-transform">
                  <span className="text-xs font-serif font-black tracking-tighter">|| ॐ ||</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: "OPEN YOUR INVITATION" */}
        <div className={`mt-8 transition-all duration-500 ${isOpening ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
          <button
            onClick={handleOpenEnvelope}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-royal-maroon font-serif font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm shadow-royal hover:shadow-[0_0_30px_rgba(218,180,78,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MailOpen className="w-4 h-4 text-royal-maroon group-hover:rotate-12 transition-transform duration-300" />
            <span>Open Your Invitation</span>
            <Sparkles className="w-4 h-4 text-royal-maroon animate-spin" style={{ animationDuration: '4s' }} />
          </button>
          
          <p className="text-center font-serif text-[11px] text-neutral-400 tracking-wider mt-3">
            Touch or click to open the royal envelope
          </p>
        </div>

      </div>
    </div>
  );
};
