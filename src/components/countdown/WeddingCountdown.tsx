import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { RoyalDivider, CornerOrnament } from '../ornaments/MandalaBorder';
import { Heart, Sparkles } from 'lucide-react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const WeddingCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingConfig.weddingDetails.mainWeddingDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="countdown" className="relative py-20 px-4 sm:px-6 bg-[#0B0710] text-[#FAF4EB] overflow-hidden select-none">
      {/* Dark Royal Card */}
      <div className="max-w-3xl mx-auto relative rounded-3xl border-2 border-gold-400/80 bg-gradient-to-b from-[#201026] via-[#170B1D] to-[#100714] p-7 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.7),_0_0_30px_rgba(218,180,78,0.15)] text-center">
        
        {/* Corner Filigrees */}
        <CornerOrnament position="top-left" size={36} className="absolute top-2 left-2 text-gold-400" />
        <CornerOrnament position="top-right" size={36} className="absolute top-2 right-2 text-gold-400" />
        <CornerOrnament position="bottom-left" size={36} className="absolute bottom-2 left-2 text-gold-400" />
        <CornerOrnament position="bottom-right" size={36} className="absolute bottom-2 right-2 text-gold-400" />

        {/* Auspicious badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-950/80 border border-gold-400/60 text-gold-300 text-xs font-serif tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Auspicious Muhurat Countdown</span>
        </div>

        <h3 className="font-serif-royal text-2xl sm:text-4xl text-gold-100 font-bold tracking-[0.14em] uppercase">
          {timeLeft.isPast ? "The Sacred Celebration Has Commenced" : "The Celebration Begins In"}
        </h3>
        
        <p className="font-script text-2xl sm:text-3xl text-gold-400 mt-1">
          {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}'s Wedding Muhurat
        </p>

        <RoyalDivider className="my-5" light={true} />

        {timeLeft.isPast ? (
          <div className="py-8 px-6 bg-gold-950/40 rounded-2xl border border-gold-400/50 max-w-xl mx-auto">
            <Heart className="w-10 h-10 text-royal-crimson mx-auto mb-3 animate-pulse" />
            <h4 className="font-serif-royal text-xl text-gold-100 font-semibold">
              Joined in Sacred Matrimony
            </h4>
            <p className="text-neutral-300 text-sm mt-2 leading-relaxed">
              With the blessings of our elders and Almighty God, Person 1 and Person 2 are now happily wedded! Thank you to everyone who shared their love, warm wishes, and presence.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-xl mx-auto my-6">
            
            {/* Days */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-gold-400/50 shadow-md flex flex-col items-center">
              <span className="font-serif-royal text-3xl sm:text-5xl font-bold text-gold-100 tracking-wider">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-gold-300/80 font-serif font-bold mt-1">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-gold-400/50 shadow-md flex flex-col items-center">
              <span className="font-serif-royal text-3xl sm:text-5xl font-bold text-gold-100 tracking-wider">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-gold-300/80 font-serif font-bold mt-1">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-gold-400/50 shadow-md flex flex-col items-center">
              <span className="font-serif-royal text-3xl sm:text-5xl font-bold text-gold-100 tracking-wider">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-gold-300/80 font-serif font-bold mt-1">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-gold-400/50 shadow-md flex flex-col items-center">
              <span className="font-serif-royal text-3xl sm:text-5xl font-bold text-gold-400 tracking-wider">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-gold-300/80 font-serif font-bold mt-1">
                Seconds
              </span>
            </div>

          </div>
        )}

        <p className="font-serif text-xs text-neutral-300 tracking-widest uppercase font-semibold">
          19 December 2026 • 07:35 PM IST • Indore, Madhya Pradesh
        </p>

      </div>
    </section>
  );
};
