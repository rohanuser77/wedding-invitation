import React, { useState, useEffect } from 'react';
import { RoyalEnvelope } from './components/envelope/RoyalEnvelope';
import { RoyalNavbar } from './components/navigation/RoyalNavbar';
import { ScrollTransformInvitation } from './components/invitation/ScrollTransformInvitation';
import { RoyalEventsDeckSection } from './components/events/RoyalEventsDeckSection';
import { WeddingCountdown } from './components/countdown/WeddingCountdown';
import { VenueSection } from './components/venue/VenueSection';
import { FamilySection } from './components/family/FamilySection';
import { RsvpSection } from './components/rsvp/RsvpSection';
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

      {/* 2. Main Royal Invitation Website Experience */}
      <div className={`transition-opacity duration-1000 ${envelopeOpened ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Sticky Luxury Navigation */}
        <RoyalNavbar
          onOpenShareModal={() => setShareModalOpen(true)}
          guestName={guestName}
        />

        {/* Section 1: Sacred Ganesh Vandana & Bride & Groom Royal Unfold */}
        <ScrollTransformInvitation />

        {/* Section 2: Royal Stacked Event Cards (Smooth Scroll Deck Animation) */}
        <RoyalEventsDeckSection />

        {/* Section 3: Auspicious Muhurat Live Countdown */}
        <WeddingCountdown />

        {/* Section 4: Palace Venue & Google Maps Navigation */}
        <VenueSection />

        {/* Section 5: Family Lineage & Ancestral Blessings */}
        <FamilySection />

        {/* Section 6: RSVP — Guest Confirmation */}
        <RsvpSection initialGuestName={guestName} />

        {/* Section 7: Grand Royal Closing Experience */}
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
