import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { FloralArchHeader, CornerOrnament } from '../ornaments/MandalaBorder';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin } from 'lucide-react';

export const CoupleStoryGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === 'all'
    ? weddingConfig.gallery
    : weddingConfig.gallery.filter(p => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <section id="story-gallery" className="relative py-24 px-4 sm:px-6 bg-[#FAF7F2] text-neutral-800 overflow-hidden">
      
      {/* Decorative Palace Jali watermark */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C59A30_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">

        {/* 1. Couple Story Section */}
        <div className="mb-24">
          <FloralArchHeader
            hindiTitle="|| हमारी प्रेम कहानी ||"
            title="Our Love Story"
            subtitle="Two souls, countless conversations, and a lifetime destined to be one"
          />

          {/* Timeline of Milestones */}
          <div className="relative mt-12 max-w-5xl mx-auto">
            {/* Center Vertical Gold Line */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300" />

            <div className="space-y-12 sm:space-y-16">
              {weddingConfig.story.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div 
                    key={milestone.id}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Visual Card */}
                    <div className="w-full md:w-1/2">
                      <div className="relative arch-window overflow-hidden border-2 border-gold-400 shadow-royal group aspect-[4/3] max-w-md mx-auto">
                        <img 
                          src={milestone.image} 
                          alt={milestone.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-sm text-gold-300 font-serif text-xs border border-gold-500/40">
                          {milestone.year}
                        </div>
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-neutral-900/80 backdrop-blur-sm text-ivory font-serif text-xs flex items-center gap-1 border border-gold-500/40">
                          <MapPin className="w-3 h-3 text-gold-400" />
                          <span>{milestone.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Center Node */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gold-500 border-4 border-ivory shadow-md items-center justify-center text-ivory text-xs font-bold z-10">
                      ✦
                    </div>

                    {/* Story Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left px-4">
                      <div className="p-6 sm:p-8 rounded-2xl bg-white/80 border border-gold-200 royal-card-shadow relative">
                        <CornerOrnament position="top-right" size={28} className="absolute top-2 right-2 text-gold-500 opacity-60" />
                        <span className="font-script text-2xl sm:text-3xl text-gold-600 block mb-1">
                          {milestone.subtitle}
                        </span>
                        <h4 className="font-serif-royal text-xl sm:text-2xl text-royal-maroon font-bold tracking-wide">
                          {milestone.title}
                        </h4>
                        <div className="my-2 h-[1px] w-12 bg-gold-400 mx-auto md:mx-0" />
                        <p className="text-neutral-600 font-light text-xs sm:text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Photo Gallery Section */}
        <div className="pt-12 border-t border-gold-200">
          <FloralArchHeader
            hindiTitle="|| संजोई हुई यादें ||"
            title="Cherished Moments"
            subtitle="Glimpses of love, family warmth, and joyful memories captured forever"
          />

          {/* Filter Categories */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {[
              { id: 'all', label: 'All Photographs' },
              { id: 'couple', label: 'Rohan & Priya' },
              { id: 'ceremony', label: 'Ceremonies' },
              { id: 'prewedding', label: 'Pre-Wedding' },
              { id: 'family', label: 'Family & Loved Ones' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-serif text-xs tracking-wider uppercase transition-all duration-300 border ${
                  selectedCategory === cat.id
                    ? 'bg-royal-maroon text-gold-200 border-gold-400 shadow-md font-semibold'
                    : 'bg-white/80 text-neutral-600 border-gold-200 hover:border-gold-400 hover:text-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Asymmetrical Editorial Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => {
              const isLarge = index % 5 === 0;
              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden border-2 border-gold-300/80 bg-white royal-card-shadow transition-all duration-500 hover:-translate-y-1.5 hover:shadow-royal ${
                    isLarge ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                  }`}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient & Caption Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-script text-2xl text-gold-300">{photo.title}</span>
                        {photo.caption && (
                          <p className="font-serif text-xs text-neutral-200 line-clamp-2 mt-0.5 font-light">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                      <div className="p-2.5 rounded-full bg-gold-500/80 text-neutral-950">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* 3. Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900/80 border border-gold-400 text-gold-300 hover:text-white transition-all z-50 hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Photo */}
          <button
            onClick={prevPhoto}
            aria-label="Previous photograph"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-neutral-900/80 border border-gold-400 text-gold-300 hover:text-white transition-all z-50 hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Photo */}
          <button
            onClick={nextPhoto}
            aria-label="Next photograph"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-neutral-900/80 border border-gold-400 text-gold-300 hover:text-white transition-all z-50 hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Box */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold-400 shadow-2xl max-h-[75vh]">
              <img
                src={filteredPhotos[lightboxIndex].image}
                alt={filteredPhotos[lightboxIndex].title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>
            
            <div className="text-center mt-4">
              <h5 className="font-serif-royal text-xl sm:text-2xl text-gold-300 tracking-wider">
                {filteredPhotos[lightboxIndex].title}
              </h5>
              {filteredPhotos[lightboxIndex].caption && (
                <p className="font-serif text-sm text-neutral-300 font-light mt-1 max-w-lg mx-auto">
                  {filteredPhotos[lightboxIndex].caption}
                </p>
              )}
              <span className="font-serif text-xs text-neutral-500 uppercase tracking-widest mt-2 block">
                {lightboxIndex + 1} of {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
