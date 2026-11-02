import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { Share2, Menu, X, Sparkles } from 'lucide-react';

interface RoyalNavbarProps {
  onOpenShareModal: () => void;
  guestName?: string;
}

export const RoyalNavbar: React.FC<RoyalNavbarProps> = ({ onOpenShareModal, guestName }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ceremonies', href: '#events' },
    { label: 'Countdown', href: '#countdown' },
    { label: 'Venue & Map', href: '#venue' },
    { label: 'Family Blessings', href: '#family' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-neutral-950/85 backdrop-blur-md py-3 border-b border-gold-500/30 shadow-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-[1.5px] shadow-sm">
              <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center">
                <span className="font-serif-royal text-gold-300 text-[11px] font-bold tracking-wider">
                  P1 & P2
                </span>
              </div>
            </div>
            {guestName && (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-950/80 border border-gold-500/40 text-gold-300 text-[11px] font-serif">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>Invited: {decodeURIComponent(guestName)}</span>
              </span>
            )}
            <div className="hidden sm:block">
              <span className="font-serif-royal text-xs font-semibold tracking-widest text-gold-200 block uppercase">
                {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
              </span>
              <span className="font-serif text-[10px] text-neutral-400 tracking-wider block">
                {weddingConfig.weddingDetails.city} • Dec 2026
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 font-serif text-xs uppercase tracking-widest text-neutral-300">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-gold-300 transition-colors py-1 relative group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Share / QR CTA */}
            <button
              onClick={onOpenShareModal}
              aria-label="Share Wedding Invitation"
              className="px-3.5 py-1.5 rounded-full border border-gold-400/60 bg-gold-950/60 hover:bg-gold-500 hover:text-neutral-950 text-gold-300 text-xs font-serif tracking-wider uppercase transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* RSVP Button */}
            <a
              href="#rsvp"
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 font-serif text-xs font-semibold uppercase tracking-wider shadow-sm hover:scale-105 transition-all"
            >
              RSVP
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gold-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-lg md:hidden flex flex-col justify-center items-center gap-6 p-8 animate-fadeIn">
          <span className="font-hindi text-gold-400 text-lg">|| श्री गणेशाय नमः ||</span>
          <h3 className="font-serif-royal text-2xl text-ivory tracking-widest uppercase">
            {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
          </h3>

          <div className="w-16 h-[1px] bg-gold-400 my-2" />

          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-base uppercase tracking-widest text-neutral-200 hover:text-gold-300 py-1"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-4 flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShareModal();
              }}
              className="w-full py-3 rounded-xl border border-gold-400 text-gold-300 text-xs font-serif uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Invitation</span>
            </button>

            <a
              href="#rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gold-500 text-neutral-950 text-xs font-serif font-bold uppercase tracking-widest text-center"
            >
              RSVP Confirmation
            </a>
          </div>
        </div>
      )}
    </>
  );
};
