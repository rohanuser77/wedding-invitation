import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../../data/weddingConfig';
import { GaneshaIcon } from '../ornaments/GaneshaIcon';
import { CornerOrnament, RoyalDivider } from '../ornaments/MandalaBorder';

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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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

      // Step 1: Central card zooms slightly, and spiritual overlay fades
      tl.to(centerSpiritualRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 0.6,
        ease: 'power2.out',
      })
      // Step 2: Decorative wings slide outward
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
      // Step 3: Bride & Groom royal card profiles reveal smoothly
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAF7F2] py-16 px-4 sm:px-6"
    >
      {/* Decorative Palace Wall Jali Texture */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#c59a30_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Main Centered Stage */}
      <div 
        ref={cardRef} 
        className="relative w-full max-w-5xl mx-auto perspective-1000 z-10"
      >
        {/* Central Spiritual Ganesh Vandana & Main Invitation Face */}
        <div 
          ref={centerSpiritualRef}
          className="w-full max-w-3xl mx-auto bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#F7EFE1] border-2 border-gold-500 rounded-3xl p-6 sm:p-12 text-center royal-card-shadow relative overflow-hidden"
        >
          {/* Gold Ornamental Corners */}
          <CornerOrnament position="top-left" size={56} className="absolute top-3 left-3 text-gold-600" />
          <CornerOrnament position="top-right" size={56} className="absolute top-3 right-3 text-gold-600" />
          <CornerOrnament position="bottom-left" size={56} className="absolute bottom-3 left-3 text-gold-600" />
          <CornerOrnament position="bottom-right" size={56} className="absolute bottom-3 right-3 text-gold-600" />

          {/* Golden Ganesha */}
          <div className="flex justify-center mb-3">
            <GaneshaIcon size={68} />
          </div>

          <p className="font-hindi text-royal-crimson text-xl sm:text-2xl font-bold tracking-widest drop-shadow-sm">
            {weddingConfig.blessingsText.sanskritInvoking}
          </p>
          <p className="font-hindi text-xs sm:text-sm text-neutral-700 mt-1 max-w-xl mx-auto leading-relaxed font-medium">
            {weddingConfig.blessingsText.sanskritShlok}
          </p>
          <p className="font-serif text-[11px] sm:text-xs text-neutral-500 italic mt-0.5 max-w-lg mx-auto">
            "{weddingConfig.blessingsText.sanskritTranslation}"
          </p>

          <RoyalDivider className="my-5" />

          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.2em] text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Together with their families,
          </p>

          <div className="my-6">
            <h1 className="font-serif-royal text-3xl sm:text-6xl text-royal-maroon font-bold tracking-[0.08em]">
              {weddingConfig.couple.groom.firstName.toUpperCase()}
            </h1>
            <div className="my-2 flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 bg-gold-400" />
              <span className="font-script text-3xl sm:text-4xl text-gold-600">&</span>
              <span className="h-[1px] w-12 bg-gold-400" />
            </div>
            <h1 className="font-serif-royal text-3xl sm:text-6xl text-royal-maroon font-bold tracking-[0.08em]">
              {weddingConfig.couple.bride.firstName.toUpperCase()}
            </h1>
          </div>

          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.15em] text-neutral-800 max-w-xl mx-auto leading-relaxed font-medium">
            Request the honour of your gracious presence to celebrate their wedding
          </p>

          <div className="mt-8 pt-6 border-t border-gold-300/70 inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 font-serif text-xs sm:text-sm tracking-wider text-neutral-900 font-semibold">
            <span className="flex items-center gap-2">
              <span className="text-gold-600">✦</span>
              {weddingConfig.weddingDetails.dateRangeDisplay}
            </span>
            <span className="hidden sm:inline text-gold-400">•</span>
            <span className="flex items-center gap-2">
              <span className="text-gold-600">✦</span>
              {weddingConfig.weddingDetails.city}, {weddingConfig.weddingDetails.state}
            </span>
          </div>

          <div className="mt-6 flex justify-center items-center gap-2 text-xs font-serif text-gold-700 uppercase tracking-widest font-semibold animate-bounce">
            <span>Scroll down to unfold the royal invitation</span>
            <span>↓</span>
          </div>
        </div>

        {/* Outer Split Wings */}
        <div 
          ref={leftWingRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-royal-maroon to-[#6B0D18] border-r-2 border-gold-400 rounded-l-3xl shadow-2xl pointer-events-none -z-10 opacity-0"
        />
        <div 
          ref={rightWingRef}
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-royal-maroon to-[#6B0D18] border-l-2 border-gold-400 rounded-r-3xl shadow-2xl pointer-events-none -z-10 opacity-0"
        />

        {/* Revealed Layer: Bride & Groom Royal Heritage Showcase */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 pointer-events-auto">
          
          {/* Groom Card */}
          <div 
            ref={groomCardRef}
            className="w-full md:w-1/2 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F4EBD9] border-2 border-gold-400 rounded-3xl p-6 sm:p-8 royal-card-shadow relative overflow-hidden"
          >
            <CornerOrnament position="top-left" size={36} className="absolute top-2 left-2 text-gold-600" />
            <CornerOrnament position="top-right" size={36} className="absolute top-2 right-2 text-gold-600" />
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Royal Arch Frame */}
              <div className="relative w-32 h-44 sm:w-36 sm:h-52 shrink-0 arch-window overflow-hidden border-2 border-gold-500 shadow-md">
                <img 
                  src={weddingConfig.couple.groom.photo} 
                  alt={weddingConfig.couple.groom.fullName} 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Groom Details */}
              <div className="text-center sm:text-left flex-1">
                <span className="font-script text-2xl text-gold-600 block">The Groom</span>
                <h3 className="font-serif-royal text-2xl sm:text-3xl text-royal-maroon font-bold tracking-wide">
                  {weddingConfig.couple.groom.fullName}
                </h3>
                
                <div className="my-2 h-[1px] w-12 bg-gold-400 mx-auto sm:mx-0" />

                <div className="text-xs font-serif text-neutral-800 space-y-1.5 pt-1 leading-relaxed">
                  <p>
                    <strong className="text-neutral-900 font-semibold">Grandson of:</strong><br />
                    <span className="text-neutral-700">{weddingConfig.couple.groom.grandParents}</span>
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-semibold">Son of:</strong><br />
                    <span className="text-neutral-700">{weddingConfig.couple.groom.fatherName} & {weddingConfig.couple.groom.motherName}</span>
                  </p>
                  <p className="text-[11px] text-gold-800 font-medium italic pt-1">
                    {weddingConfig.couple.groom.familyHeritage}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bride Card */}
          <div 
            ref={brideCardRef}
            className="w-full md:w-1/2 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F4EBD9] border-2 border-gold-400 rounded-3xl p-6 sm:p-8 royal-card-shadow relative overflow-hidden"
          >
            <CornerOrnament position="top-left" size={36} className="absolute top-2 left-2 text-gold-600" />
            <CornerOrnament position="top-right" size={36} className="absolute top-2 right-2 text-gold-600" />

            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Royal Arch Frame */}
              <div className="relative w-32 h-44 sm:w-36 sm:h-52 shrink-0 arch-window overflow-hidden border-2 border-gold-500 shadow-md">
                <img 
                  src={weddingConfig.couple.bride.photo} 
                  alt={weddingConfig.couple.bride.fullName} 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Bride Details */}
              <div className="text-center sm:text-left flex-1">
                <span className="font-script text-2xl text-gold-600 block">The Bride</span>
                <h3 className="font-serif-royal text-2xl sm:text-3xl text-royal-maroon font-bold tracking-wide">
                  {weddingConfig.couple.bride.fullName}
                </h3>

                <div className="my-2 h-[1px] w-12 bg-gold-400 mx-auto sm:mx-0" />

                <div className="text-xs font-serif text-neutral-800 space-y-1.5 pt-1 leading-relaxed">
                  <p>
                    <strong className="text-neutral-900 font-semibold">Granddaughter of:</strong><br />
                    <span className="text-neutral-700">{weddingConfig.couple.bride.grandParents}</span>
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-semibold">Daughter of:</strong><br />
                    <span className="text-neutral-700">{weddingConfig.couple.bride.fatherName} & {weddingConfig.couple.bride.motherName}</span>
                  </p>
                  <p className="text-[11px] text-gold-800 font-medium italic pt-1">
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
