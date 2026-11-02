import React, { useState, useEffect } from 'react';
import { RoyalEnvelope } from './components/envelope/RoyalEnvelope';
import { RoyalNavbar } from './components/navigation/RoyalNavbar';
import { ScrollTransformInvitation } from './components/invitation/ScrollTransformInvitation';
import { WeddingCountdown } from './components/countdown/WeddingCountdown';
import { WeddingEventsSection } from './components/events/WeddingEventsSection';
import { CoupleStoryGallery } from './components/story/CoupleStoryGallery';
import { VenueSection } from './components/venue/VenueSection';
import { FamilySection } from './components/family/FamilySection';
import { RsvpSection } from './components/rsvp/RsvpSection';
import { GuestWishesWall } from './components/wishes/GuestWishesWall';
import { GrandClosingSection } from './components/closing/GrandClosingSection';
import { RoyalMusicPlayer } from './components/audio/RoyalMusicPlayer';
import { ShareQrModal } from './components/share/ShareQrModal';

export const App: React.FC = () => {
  const [envelopeOpened, setEnvelopeOpened] = useState<boolean>(false);
  const [musicTriggered, setMusicTriggered] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [hasFamily, setHasFamily] = useState<boolean>(true);

  // Parse personalized URL parameters on mount (?guest=Name&family=true)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get('guest');
      const family = params.get('family');
      
      if (guest) {
        setGuestName(guest);
      }
      if (family === 'false') {
        setHasFamily(false);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleOpenEnvelopeComplete = () => {
    setEnvelopeOpened(true);
    setMusicTriggered(true);
  };

  return (
    <div className="relative min-h-screen bg-ivory text-neutral-800 selection:bg-gold-500 selection:text-white">
      
      {/* 1. Full-screen Opening Experience — Royal Envelope */}
      {!envelopeOpened && (
        <RoyalEnvelope
          onOpenComplete={handleOpenEnvelopeComplete}
          guestName={guestName}
          hasFamily={hasFamily}
        />
      )}

      {/* 2. Main Luxury Invitation Website Experience */}
      <div className={`transition-opacity duration-1000 ${envelopeOpened ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Sticky Luxury Navigation */}
        <RoyalNavbar
          onOpenShareModal={() => setShareModalOpen(true)}
          guestName={guestName}
        />

        {/* Section 4 & 5: Spiritual Ganesh Vandana & Scroll-Based Invitation Transformation */}
        <ScrollTransformInvitation />

        {/* Section 9: Auspicious Muhurat Live Countdown */}
        <WeddingCountdown />

        {/* Section 8: Wedding Events — Individual Cinematic Chapters */}
        <WeddingEventsSection />

        {/* Section 7: Couple's Story & Curated Photo Gallery */}
        <CoupleStoryGallery />

        {/* Section 10: Venue & Hospitality Navigation */}
        <VenueSection />

        {/* Section 13C: Family Heritage & Ancestral Blessings */}
        <FamilySection />

        {/* Section 12: RSVP — Guest Confirmation */}
        <RsvpSection initialGuestName={guestName} />

        {/* Section 13D: Guest Wishes & Blessings Wall */}
        <GuestWishesWall />

        {/* Section 14: Grand Closing Experience */}
        <GrandClosingSection />

        {/* Persistent Royal Ambient Audio Player */}
        <RoyalMusicPlayer autoPlayTriggered={musicTriggered} />

        {/* Digital Invitation Sharing & Dynamic QR Code Modal */}
        <ShareQrModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
        />

      </div>

    </div>
  );
};

export default App;
