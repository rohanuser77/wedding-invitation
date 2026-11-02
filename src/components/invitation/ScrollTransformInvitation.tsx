import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../data/weddingConfig';
import { GaneshaIcon } from '../ornaments/GaneshaIcon';
import { CornerOrnament, RoyalDivider, FloatingParticles } from '../ornaments/MandalaBorder';

gsap.registerPlugin(ScrollTrigger);

export const ScrollTransformInvitation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const leftWingRef = useRef<HTMLDivElement | null>(null);
  const rightWingRef = useRef<HTMLDivElement | null>(null);
  const centerSpiritualRef = useRef<HTMLDivElement | null>(null);
  const groomCardRef = useRef<HTMLDivElement | null>(null);
  const brideCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only apply complex scroll pinning on desktop screens (>= 768px)
    // On mobile, native smooth scroll without premature fade provides 100% lag-free perfection!
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(centerSpiritualRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to(leftWingRef.current, {
        xPercent: -45,
        rotationY: -12,
        opacity: 0.2,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=0.3')
      .to(rightWingRef.current, {
        xPercent: 45,
        rotationY: 12,
        opacity: 0.2,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '<')
      .fromTo([groomCardRef.current, brideCardRef.current], 
        { opacity: 0, scale: 0.9, y: 25 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.15, duration: 1.2, ease: 'power2.out' },
        '-=0.8'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#0D0812] py-8 sm:py-16 px-3.5 sm:px-6"
    >
      {/* Royal Palace Dark Texture */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ECC872_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <FloatingParticles count={16} color="gold" />

      {/* Main Centered Stage */}
      <div 
        ref={cardRef} 
        className="relative w-full max-w-4xl mx-auto perspective-1000 z-10 flex flex-col items-center"
      >
        {/* Central Spiritual Ganesh Vandana & Main Invitation Face */}
        {/* Strictly fitted for 100% mobile screen visibility without overflow */}
        <div 
          ref={centerSpiritualRef}
          className="w-full max-w-2xl sm:max-w-3xl bg-gradient-to-b from-[#22122B] via-[#1A0E22] to-[#120818] border-2 border-gold-400/90 rounded-2xl sm:rounded-3xl p-5 sm:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8),_0_0_40px_rgba(218,180,78,0.2)] relative overflow-hidden"
        >
          {/* Gold Ornamental Corners */}
          <CornerOrnament position="top-left" size={36} className="absolute top-2 left-2 text-gold-400" />
          <CornerOrnament position="top-right" size={36} className="absolute top-2 right-2 text-gold-400" />
          <CornerOrnament position="bottom-left" size={36} className="absolute bottom-2 left-2 text-gold-400" />
          <CornerOrnament position="bottom-right" size={36} className="absolute bottom-2 right-2 text-gold-400" />

          {/* Golden Ganesha */}
          <div className="flex justify-center mb-2 sm:mb-3">
            <GaneshaIcon size={58} />
          </div>

          <p className="font-hindi text-gold-300 text-lg sm:text-2xl font-bold tracking-widest drop-shadow-[0_2px_12px_rgba(218,180,78,0.5)]">
            {weddingConfig.blessingsText.sanskritInvoking}
          </p>
          <p className="font-hindi text-xs sm:text-sm text-gold-100/90 mt-1 max-w-lg mx-auto font-semibold leading-relaxed">
            {weddingConfig.blessingsText.sanskritShlok}
          </p>

          <RoyalDivider className="my-3 sm:my-5" light={true} />

          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.2em] text-gold-300/90 max-w-xl mx-auto font-semibold">
            Together with their families,
          </p>

          {/* Couple Names — Grand, Clear, Legible with Standard Numerals */}
          <div className="my-3 sm:my-6">
            <h1 className="font-serif-royal text-3xl sm:text-6xl text-gold-100 font-bold tracking-wider drop-shadow-lg">
              PERSON 1
            </h1>
            <div className="my-1.5 sm:my-2 flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-gold-400" />
              <span className="font-script text-3xl sm:text-4xl text-gold-400">&</span>
              <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-gold-400" />
            </div>
            <h1 className="font-serif-royal text-3xl sm:text-6xl text-gold-100 font-bold tracking-wider drop-shadow-lg">
              PERSON 2
            </h1>
          </div>

          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.12em] text-neutral-200 max-w-xl mx-auto font-medium">
            Request the honour of your gracious presence to celebrate their wedding
          </p>

          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gold-500/30 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 font-serif text-xs sm:text-sm tracking-wider text-gold-200 font-bold">
            <span className="flex items-center gap-1.5">
              <span className="text-gold-400">✦</span>
              {weddingConfig.weddingDetails.dateRangeDisplay}
            </span>
            <span className="hidden sm:inline text-gold-500">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-gold-400">✦</span>
              {weddingConfig.weddingDetails.city}, {weddingConfig.weddingDetails.state}
            </span>
          </div>

          <div className="mt-4 sm:mt-6 flex justify-center items-center gap-1.5 text-[11px] sm:text-xs font-serif text-gold-400 uppercase tracking-widest font-bold">
            <span>Scroll down for wedding ceremonies</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>

        {/* Outer Split Wings (Desktop Only) */}
        <div 
          ref={leftWingRef}
          className="hidden md:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#2B0E1E] to-[#1C0913] border-r-2 border-gold-400 rounded-l-3xl shadow-2xl pointer-events-none -z-10 opacity-0"
        />
        <div 
          ref={rightWingRef}
          className="hidden md:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#2B0E1E] to-[#1C0913] border-l-2 border-gold-400 rounded-r-3xl shadow-2xl pointer-events-none -z-10 opacity-0"
        />

        {/* Revealed Layer on Desktop / Scroll Down Cards on Mobile */}
        <div className="w-full mt-6 md:mt-0 md:absolute md:inset-0 flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-8 pointer-events-auto">
          
          {/* Groom Card */}
          <div 
            ref={groomCardRef}
            className="w-full md:w-1/2 bg-gradient-to-b from-[#22122B] via-[#1A0E22] to-[#120818] border-2 border-gold-400/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden"
          >
            <CornerOrnament position="top-left" size={28} className="absolute top-2 left-2 text-gold-400" />
            <CornerOrnament position="top-right" size={28} className="absolute top-2 right-2 text-gold-400" />
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="relative w-28 h-36 sm:w-36 sm:h-48 shrink-0 arch-window overflow-hidden border-2 border-gold-400 shadow-md">
                <img 
                  src={weddingConfig.couple.groom.photo} 
                  alt={weddingConfig.couple.groom.fullName} 
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="text-center sm:text-left flex-1">
                <span className="font-script text-xl sm:text-2xl text-gold-400 block">The Groom</span>
                <h3 className="font-serif-royal text-xl sm:text-2xl text-gold-100 font-bold tracking-wide">
                  {weddingConfig.couple.groom.fullName}
                </h3>
                
                <div className="my-1.5 h-[1px] w-10 bg-gold-400 mx-auto sm:mx-0" />

                <div className="text-xs font-serif text-neutral-200 space-y-1.5 pt-0.5 leading-relaxed">
                  <p>
                    <strong className="text-gold-300 font-semibold">Grandson of:</strong><br />
                    <span className="text-neutral-300">{weddingConfig.couple.groom.grandParents}</span>
                  </p>
                  <p>
                    <strong className="text-gold-300 font-semibold">Son of:</strong><br />
                    <span className="text-neutral-300">{weddingConfig.couple.groom.fatherName} & {weddingConfig.couple.groom.motherName}</span>
                  </p>
                  <p className="text-[11px] text-gold-400 font-semibold italic pt-0.5">
                    {weddingConfig.couple.groom.familyHeritage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bride Card */}
          <div 
            ref={brideCardRef}
            className="w-full md:w-1/2 bg-gradient-to-b from-[#22122B] via-[#1A0E22] to-[#120818] border-2 border-gold-400/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden"
          >
            <CornerOrnament position="top-left" size={28} className="absolute top-2 left-2 text-gold-400" />
            <CornerOrnament position="top-right" size={28} className="absolute top-2 right-2 text-gold-400" />

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="relative w-28 h-36 sm:w-36 sm:h-48 shrink-0 arch-window overflow-hidden border-2 border-gold-400 shadow-md">
                <img 
                  src={weddingConfig.couple.bride.photo} 
                  alt={weddingConfig.couple.bride.fullName} 
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div className="text-center sm:text-left flex-1">
                <span className="font-script text-xl sm:text-2xl text-gold-400 block">The Bride</span>
                <h3 className="font-serif-royal text-xl sm:text-2xl text-gold-100 font-bold tracking-wide">
                  {weddingConfig.couple.bride.fullName}
                </h3>

                <div className="my-1.5 h-[1px] w-10 bg-gold-400 mx-auto sm:mx-0" />

                <div className="text-xs font-serif text-neutral-200 space-y-1.5 pt-0.5 leading-relaxed">
                  <p>
                    <strong className="text-gold-300 font-semibold">Granddaughter of:</strong><br />
                    <span className="text-neutral-300">{weddingConfig.couple.bride.grandParents}</span>
                  </p>
                  <p>
                    <strong className="text-gold-300 font-semibold">Daughter of:</strong><br />
                    <span className="text-neutral-300">{weddingConfig.couple.bride.fatherName} & {weddingConfig.couple.bride.motherName}</span>
                  </p>
                  <p className="text-[11px] text-gold-400 font-semibold italic pt-0.5">
                    {weddingConfig.couple.bride.familyHeritage}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
