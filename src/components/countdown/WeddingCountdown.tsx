import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { RoyalDivider } from '../ornaments/MandalaBorder';
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
    <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE3] to-[#FAF7F2] text-neutral-800 overflow-hidden">
      {/* Decorative Palace Jali Border */}
      <div className="max-w-4xl mx-auto relative rounded-3xl border-2 border-gold-400/80 bg-gradient-to-b from-white/90 via-[#FDFBF7]/90 to-white/90 p-8 sm:p-14 royal-card-shadow text-center">
        
        {/* Subtle auspicious badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-100/70 border border-gold-300 text-gold-800 text-xs font-serif tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>Auspicious Muhurat Countdown</span>
        </div>

        <h3 className="font-serif-royal text-2xl sm:text-4xl text-royal-maroon font-bold tracking-[0.16em] uppercase">
          {timeLeft.isPast ? "The Sacred Celebration Has Commenced" : "The Celebration Begins In"}
        </h3>
        
        <p className="font-script text-2xl sm:text-3xl text-gold-600 mt-1">
          {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}'s Wedding Muhurat
        </p>

        <RoyalDivider className="my-5" />

        {timeLeft.isPast ? (
          <div className="py-8 px-6 bg-gold-50/60 rounded-2xl border border-gold-300 max-w-xl mx-auto">
            <Heart className="w-10 h-10 text-royal-crimson mx-auto mb-3 animate-pulse" />
            <h4 className="font-serif-royal text-xl text-royal-maroon font-semibold">
              Joined in Sacred Matrimony
            </h4>
            <p className="text-neutral-700 text-sm mt-2 leading-relaxed">
              With the blessings of our elders and Almighty God, Rohan and Priya are now happily wedded! Thank you to everyone who shared their love, warm wishes, and presence.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto my-8">
            
            {/* Days */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-ivory to-gold-50 border border-gold-300/80 shadow-md flex flex-col items-center">
              <span className="font-serif-royal text-3xl sm:text-5xl font-bold text-royal-maroon tracking-wider">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 font-serif mt-1">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-ivory to-gold-50 border border-gold-300/80 shadow-md flex flex-col items-center">
              <span className="font-serif-royal text-3xl sm:text-5xl font-bold text-royal-maroon tracking-wider">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 font-serif mt-1">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-ivory to-gold-50 border border-gold-300/80 shadow-md flex flex-col items-center">
              <span className="font-serif-royal text-3xl sm:text-5xl font-bold text-royal-maroon tracking-wider">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 font-serif mt-1">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-ivory to-gold-50 border border-gold-300/80 shadow-md flex flex-col items-center">
              <span className="font-serif-royal text-3xl sm:text-5xl font-bold text-gold-600 tracking-wider">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 font-serif mt-1">
                Seconds
              </span>
            </div>

          </div>
        )}

        <p className="font-serif text-xs text-neutral-500 tracking-widest uppercase">
          19 December 2026 • 07:35 PM IST • Indore, Madhya Pradesh
        </p>

      </div>
    </section>
  );
};
