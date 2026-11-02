import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../../data/weddingConfig';
import { FloralArchHeader, CornerOrnament } from '../ornaments/MandalaBorder';
import { CheckCircle2, Send, Sparkles, User, Users, AlertCircle, Edit3 } from 'lucide-react';

interface RsvpFormData {
  guestName: string;
  guestCount: number;
  attendance: 'accept' | 'decline' | 'unsure';
  eventsAttending: string[];
  dietaryNote: string;
  wishes: string;
  phoneOrEmail: string;
}

export const RsvpSection: React.FC<{ initialGuestName?: string }> = ({ initialGuestName = '' }) => {
  const [formData, setFormData] = useState<RsvpFormData>({
    guestName: initialGuestName ? decodeURIComponent(initialGuestName) : '',
    guestCount: 2,
    attendance: 'accept',
    eventsAttending: weddingConfig.events.map(e => e.id),
    dietaryNote: '',
    wishes: '',
    phoneOrEmail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Check existing submission in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('rohan_priya_wedding_rsvp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        setIsSubmitted(true);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleEventToggle = (eventId: string) => {
    setFormData(prev => {
      const exists = prev.eventsAttending.includes(eventId);
      return {
        ...prev,
        eventsAttending: exists
          ? prev.eventsAttending.filter(id => id !== eventId)
          : [...prev.eventsAttending, eventId]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.guestName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);

    // Optional Supabase/Firebase webhook sync if configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/rsvps`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guest_name: formData.guestName,
            guest_count: formData.guestCount,
            attendance: formData.attendance,
            events: formData.eventsAttending,
            dietary_note: formData.dietaryNote,
            wishes: formData.wishes,
            contact: formData.phoneOrEmail,
            created_at: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn('Backend sync failed, storing locally:', err);
      }
    }

    // Always persist to localStorage for the user
    setTimeout(() => {
      localStorage.setItem('rohan_priya_wedding_rsvp', JSON.stringify(formData));
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Royal Gold & Rose Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ECC872', '#C59A30', '#991B1B', '#F59E0B'],
      });
    }, 600);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 sm:px-6 bg-[#FAF7F2] text-neutral-800 overflow-hidden">
      
      {/* Decorative Palace Jali watermark */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C59A30_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto z-10">

        {/* Header */}
        <FloralArchHeader
          hindiTitle="|| उपस्थिति की सादर स्वीकृति ||"
          title="RSVP & Guest Blessings"
          subtitle="Kindly grace us with your response by 1st December 2026 to help us prepare royal arrangements"
        />

        {/* RSVP Card */}
        <div className="mt-8 rounded-3xl p-6 sm:p-10 bg-white border-2 border-gold-400 shadow-royal-lg relative overflow-hidden">
          <CornerOrnament position="top-left" size={45} className="absolute top-2 left-2 text-gold-600" />
          <CornerOrnament position="top-right" size={45} className="absolute top-2 right-2 text-gold-600" />
          <CornerOrnament position="bottom-left" size={45} className="absolute bottom-2 left-2 text-gold-600" />
          <CornerOrnament position="bottom-right" size={45} className="absolute bottom-2 right-2 text-gold-600" />

          {isSubmitted ? (
            /* Submitted Confirmation State */
            <div className="py-8 text-center animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="font-script text-3xl text-gold-600 block">With Deepest Gratitude</span>
              <h3 className="font-serif-royal text-2xl sm:text-3xl text-royal-maroon font-bold tracking-wider mt-1">
                Thank You, {formData.guestName}!
              </h3>
              
              <p className="text-sm text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed">
                {formData.attendance === 'accept'
                  ? `Your confirmation for ${formData.guestCount} guest(s) has been recorded with honor. We look forward to welcoming you in Indore!`
                  : formData.attendance === 'unsure'
                  ? "We have noted your tentative plan. We hope you will be able to make it to celebrate with us!"
                  : "We will miss your presence dearly, and hold your blessings and love close to our hearts."}
              </p>

              <div className="my-6 p-4 rounded-xl bg-gold-50/70 border border-gold-200 text-xs font-serif text-neutral-700 max-w-md mx-auto">
                <p><strong>Response:</strong> {formData.attendance === 'accept' ? 'Joyfully Attending' : formData.attendance === 'decline' ? 'Regretfully Declining' : 'Tentative / Unsure'}</p>
                {formData.attendance === 'accept' && (
                  <p className="mt-1"><strong>Ceremonies:</strong> {formData.eventsAttending.length} of {weddingConfig.events.length} Selected</p>
                )}
                {formData.wishes && <p className="mt-1 italic text-neutral-500">"{formData.wishes}"</p>}
              </div>

              <button
                onClick={handleEdit}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-400 text-gold-800 text-xs font-serif uppercase tracking-widest hover:bg-gold-50 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Update Response</span>
              </button>
            </div>
          ) : (
            /* Interactive RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Guest Name & Number of Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-serif uppercase tracking-widest text-neutral-700 font-semibold mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gold-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.guestName}
                      onChange={e => setFormData({ ...formData, guestName: e.target.value })}
                      placeholder="e.g. Rajesh & Sunita Patel"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-sm bg-neutral-50/50"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-serif uppercase tracking-widest text-neutral-700 font-semibold mb-2">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-gold-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.guestCount}
                      onChange={e => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-sm bg-neutral-50/50"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Attendance Radio Options */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-neutral-700 font-semibold mb-2">
                  Will you be able to attend?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'accept', label: 'Joyfully Accepts', emoji: '✨' },
                    { id: 'unsure', label: 'Tentative / Maybe', emoji: '🌸' },
                    { id: 'decline', label: 'Regretfully Declines', emoji: '💌' },
                  ].map(option => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-2.5 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        formData.attendance === option.id
                          ? 'bg-royal-maroon text-gold-100 border-gold-500 shadow-sm'
                          : 'bg-neutral-50 border-gold-200 text-neutral-700 hover:border-gold-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={option.id}
                        checked={formData.attendance === option.id}
                        onChange={() => setFormData({ ...formData, attendance: option.id as any })}
                        className="sr-only"
                      />
                      <span>{option.emoji}</span>
                      <span className="text-xs font-serif tracking-wider font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ceremony Attendance Checkboxes (shown if accepting or unsure) */}
              {formData.attendance !== 'decline' && (
                <div>
                  <label className="block text-xs font-serif uppercase tracking-widest text-neutral-700 font-semibold mb-2">
                    Ceremonies You Plan to Attend
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {weddingConfig.events.map(event => {
                      const isChecked = formData.eventsAttending.includes(event.id);
                      return (
                        <label
                          key={event.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-gold-50/90 border-gold-400 text-royal-maroon font-semibold'
                              : 'bg-neutral-50/60 border-neutral-200 text-neutral-600 hover:border-gold-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleEventToggle(event.id)}
                            className="rounded text-gold-600 focus:ring-gold-500 w-4 h-4 border-gold-300"
                          />
                          <div>
                            <span className="block">{event.name}</span>
                            <span className="text-[10px] text-neutral-500 font-normal">{event.displayDate}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Phone or Email for Concierge Updates */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-neutral-700 font-semibold mb-2">
                  Contact Phone / WhatsApp (For Concierge Updates)
                </label>
                <input
                  type="text"
                  value={formData.phoneOrEmail}
                  onChange={e => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-sm bg-neutral-50/50"
                />
              </div>

              {/* Dietary Note */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-neutral-700 font-semibold mb-2">
                  Dietary / Hospitality Preferences (Optional)
                </label>
                <input
                  type="text"
                  value={formData.dietaryNote}
                  onChange={e => setFormData({ ...formData, dietaryNote: e.target.value })}
                  placeholder="e.g. Jain food, Vegan, Wheelchair assistance required"
                  className="w-full px-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-sm bg-neutral-50/50"
                />
              </div>

              {/* Personal Blessing / Message */}
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-neutral-700 font-semibold mb-2">
                  Personal Blessing for Person 1 & Person 2 (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.wishes}
                  onChange={e => setFormData({ ...formData, wishes: e.target.value })}
                  placeholder="Share a heartfelt blessing or message for the couple..."
                  className="w-full px-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none text-sm bg-neutral-50/50 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-royal-maroon font-serif font-bold text-xs uppercase tracking-widest shadow-royal hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming Your Blessings...' : 'Confirm RSVP Response'}</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
