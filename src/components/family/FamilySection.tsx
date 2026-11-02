import React from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { FloralArchHeader, CornerOrnament, RoyalDivider } from '../ornaments/MandalaBorder';

export const FamilySection: React.FC = () => {
  const { groomSide, brideSide } = weddingConfig.families;

  return (
    <section id="family" className="relative py-20 px-4 sm:px-6 bg-[#0E0914] text-[#FAF4EB] overflow-hidden select-none">
      {/* Decorative Jali watermark */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C59A30_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
        
        {/* Header */}
        <FloralArchHeader
          hindiTitle="|| पारिवारिक आशीर्वाद एवं आत्मीयता ||"
          title="The Royal Families"
          subtitle="With the humble reverence and warm blessings of our ancestors and elders"
          dark={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6">
          
          {/* Groom's Family */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#22122B] via-[#1A0E22] to-[#120818] border-2 border-gold-400/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
            <CornerOrnament position="top-left" size={36} className="absolute top-2 left-2 text-gold-400" />
            <CornerOrnament position="top-right" size={36} className="absolute top-2 right-2 text-gold-400" />

            <div className="text-center mb-5">
              <span className="font-script text-2xl text-gold-400 block">The Groom's Lineage</span>
              <h3 className="font-serif-royal text-2xl sm:text-3xl text-gold-100 font-bold tracking-wide">
                {groomSide.familyTitle}
              </h3>
              <p className="font-serif text-xs text-gold-300/80 uppercase tracking-widest mt-1">
                Ancestral Roots: {groomSide.ancestralHome}
              </p>
              <RoyalDivider className="my-2" light={true} />
            </div>

            <div className="space-y-3.5">
              {groomSide.members.map((member, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-neutral-950/70 border border-gold-400/30">
                  <span className="text-[11px] font-serif uppercase tracking-widest text-gold-400 font-bold block">
                    {member.role}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-gold-100 font-semibold mt-0.5">
                    {member.names}
                  </h4>
                  {member.blessing && (
                    <p className="text-xs text-neutral-300 italic mt-1 font-light leading-relaxed">
                      "{member.blessing}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bride's Family */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#22122B] via-[#1A0E22] to-[#120818] border-2 border-gold-400/80 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
            <CornerOrnament position="top-left" size={36} className="absolute top-2 left-2 text-gold-400" />
            <CornerOrnament position="top-right" size={36} className="absolute top-2 right-2 text-gold-400" />

            <div className="text-center mb-5">
              <span className="font-script text-2xl text-gold-400 block">The Bride's Lineage</span>
              <h3 className="font-serif-royal text-2xl sm:text-3xl text-gold-100 font-bold tracking-wide">
                {brideSide.familyTitle}
              </h3>
              <p className="font-serif text-xs text-gold-300/80 uppercase tracking-widest mt-1">
                Ancestral Roots: {brideSide.ancestralHome}
              </p>
              <RoyalDivider className="my-2" light={true} />
            </div>

            <div className="space-y-3.5">
              {brideSide.members.map((member, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-neutral-950/70 border border-gold-400/30">
                  <span className="text-[11px] font-serif uppercase tracking-widest text-gold-400 font-bold block">
                    {member.role}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-gold-100 font-semibold mt-0.5">
                    {member.names}
                  </h4>
                  {member.blessing && (
                    <p className="text-xs text-neutral-300 italic mt-1 font-light leading-relaxed">
                      "{member.blessing}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
