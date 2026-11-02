import React from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { FloralArchHeader, CornerOrnament, RoyalDivider } from '../ornaments/MandalaBorder';


export const FamilySection: React.FC = () => {
  const { groomSide, brideSide } = weddingConfig.families;

  return (
    <section id="family" className="relative py-24 px-4 sm:px-6 bg-[#FAF7F2] text-neutral-800 overflow-hidden">
      {/* Decorative Palace Jali watermark */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C59A30_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Header */}
        <FloralArchHeader
          hindiTitle="|| पारिवारिक आशीर्वाद एवं आत्मीयता ||"
          title="The Royal Families"
          subtitle="With the humble reverence and warm blessings of our ancestors and elders"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-8">
          
          {/* Groom's Family */}
          <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-white via-[#FCF9F3] to-[#F7EFE2] border-2 border-gold-400 shadow-royal overflow-hidden">
            <CornerOrnament position="top-left" size={45} className="absolute top-2 left-2 text-gold-600" />
            <CornerOrnament position="top-right" size={45} className="absolute top-2 right-2 text-gold-600" />

            <div className="text-center mb-6">
              <span className="font-script text-2xl text-gold-600 block">The Groom's Lineage</span>
              <h3 className="font-serif-royal text-2xl sm:text-3xl text-royal-maroon font-bold tracking-wide">
                {groomSide.familyTitle}
              </h3>
              <p className="font-serif text-xs text-neutral-500 uppercase tracking-widest mt-1">
                Ancestral Roots: {groomSide.ancestralHome}
              </p>
              <RoyalDivider className="my-3" />
            </div>

            <div className="space-y-5">
              {groomSide.members.map((member, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/70 border border-gold-200/70">
                  <span className="text-[11px] font-serif uppercase tracking-widest text-gold-700 font-semibold block">
                    {member.role}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-neutral-900 font-medium mt-0.5">
                    {member.names}
                  </h4>
                  {member.blessing && (
                    <p className="text-xs text-neutral-500 italic mt-1 font-light">
                      "{member.blessing}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bride's Family */}
          <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-white via-[#FCF9F3] to-[#F7EFE2] border-2 border-gold-400 shadow-royal overflow-hidden">
            <CornerOrnament position="top-left" size={45} className="absolute top-2 left-2 text-gold-600" />
            <CornerOrnament position="top-right" size={45} className="absolute top-2 right-2 text-gold-600" />

            <div className="text-center mb-6">
              <span className="font-script text-2xl text-gold-600 block">The Bride's Lineage</span>
              <h3 className="font-serif-royal text-2xl sm:text-3xl text-royal-maroon font-bold tracking-wide">
                {brideSide.familyTitle}
              </h3>
              <p className="font-serif text-xs text-neutral-500 uppercase tracking-widest mt-1">
                Ancestral Roots: {brideSide.ancestralHome}
              </p>
              <RoyalDivider className="my-3" />
            </div>

            <div className="space-y-5">
              {brideSide.members.map((member, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/70 border border-gold-200/70">
                  <span className="text-[11px] font-serif uppercase tracking-widest text-gold-700 font-semibold block">
                    {member.role}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-neutral-900 font-medium mt-0.5">
                    {member.names}
                  </h4>
                  {member.blessing && (
                    <p className="text-xs text-neutral-500 italic mt-1 font-light">
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
