import React from 'react';
import { weddingConfig } from '../../data/weddingConfig';
import { FloralArchHeader, CornerOrnament } from '../ornaments/MandalaBorder';
import { MapPin, Navigation, Car, Bed, Phone, UserCheck, ExternalLink } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const { primaryVenue } = weddingConfig.weddingDetails;

  return (
    <section id="venue" className="relative py-24 px-4 sm:px-6 bg-[#16111C] text-ivory overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-[#16111C] to-[#0D0912] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Header */}
        <FloralArchHeader
          hindiTitle="|| विवाह स्थल एवं मार्ग दर्शन ||"
          title="The Royal Venue"
          subtitle="A majestic palace where timeless heritage and royal hospitality welcome you"
          dark={true}
        />

        {/* Venue Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
          
          {/* Left: Venue Info & Hospitality Amenities */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Palace Card */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-neutral-950/80 border-2 border-gold-500/40 shadow-royal-lg backdrop-blur-md">
              <CornerOrnament position="top-left" size={40} className="absolute top-2 left-2 text-gold-400" />
              <CornerOrnament position="top-right" size={40} className="absolute top-2 right-2 text-gold-400" />

              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-gold-950/80 text-gold-400 border border-gold-500/30 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-script text-2xl text-gold-400 block">Imperial Destination</span>
                  <h3 className="font-serif-royal text-xl sm:text-2xl text-ivory font-bold tracking-wide">
                    {primaryVenue.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1.5 leading-relaxed">
                    {primaryVenue.address}
                  </p>
                </div>
              </div>

              {/* Quick Directions Button */}
              <div className="mt-6 pt-5 border-t border-neutral-800">
                <a
                  href={primaryVenue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-neutral-950 font-serif font-bold text-xs uppercase tracking-widest shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Navigation className="w-4 h-4 text-neutral-950" />
                  <span>Open In Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

            {/* Guest Hospitality & Logistics Amenities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Valet Parking */}
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-gold-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-gold-400 mb-2">
                  <Car className="w-4 h-4" />
                  <h5 className="font-serif text-xs uppercase tracking-wider font-semibold">
                    Valet Parking
                  </h5>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {primaryVenue.parkingInfo}
                </p>
              </div>

              {/* Accommodations */}
              <div className="p-5 rounded-2xl bg-neutral-900/60 border border-gold-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-gold-400 mb-2">
                  <Bed className="w-4 h-4" />
                  <h5 className="font-serif text-xs uppercase tracking-wider font-semibold">
                    Guest Suites
                  </h5>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {primaryVenue.accommodationInfo}
                </p>
              </div>

            </div>

            {/* Wedding Concierge Assistance Card */}
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-gold-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-gold-950 text-gold-400 border border-gold-500/30">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-serif text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Wedding Concierge & Assistance
                  </h6>
                  <p className="font-serif text-sm text-ivory font-medium mt-0.5">
                    {primaryVenue.contactPerson}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${primaryVenue.contactPhone}`}
                className="p-3 rounded-xl bg-gold-500/20 text-gold-300 hover:bg-gold-500 hover:text-neutral-950 border border-gold-500/40 transition-colors"
                title="Call Wedding Concierge"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right: Interactive Map Embed / Preview */}
          <div className="lg:col-span-7 flex">
            <div className="w-full h-full min-h-[380px] rounded-3xl overflow-hidden border-2 border-gold-500/50 shadow-royal-lg relative">
              <iframe
                title="Grand Amber Palace Indore Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.55110593795!2d75.7937973!3d22.7241097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Location Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto p-3.5 rounded-2xl bg-neutral-950/90 border border-gold-400 backdrop-blur-md flex items-center gap-3 text-xs font-serif text-gold-200 shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                <span>Indore, Madhya Pradesh • Amber Palace</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
