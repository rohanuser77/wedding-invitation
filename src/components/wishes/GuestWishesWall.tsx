import React, { useState, useEffect } from 'react';
import { FloralArchHeader, CornerOrnament } from '../ornaments/MandalaBorder';
import { MessageSquareHeart, Send, Heart, Sparkles } from 'lucide-react';

interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}

const INITIAL_BLESSINGS: Blessing[] = [
  {
    id: 'b-1',
    name: 'Uncle Suresh & Anita Aunty',
    relation: 'Family Elders',
    message: 'May Lord Shiva and Goddess Parvati shower both Rohan and Priya with unending peace, boundless happiness, and eternal understanding. So thrilled for both of you!',
    timestamp: '2 hours ago',
  },
  {
    id: 'b-2',
    name: 'Kabir & Sneha Mehta',
    relation: 'College Friends',
    message: 'From college all-nighters in Ahmedabad to witnessing this royal fairytale, couldn’t be happier! Counting down days for the Sangeet dance floor!',
    timestamp: 'Yesterday',
  },
  {
    id: 'b-3',
    name: 'Dr. Vivek Saxena',
    relation: 'Family Friend',
    message: 'Two wonderful souls with royal hearts coming together. May your journey ahead be as radiant as the golden palaces of Indore. Har Har Mahadev!',
    timestamp: '2 days ago',
  },
];

export const GuestWishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [name, setName] = useState<string>('');
  const [relation, setRelation] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Load from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem('rohan_priya_wishes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Blessing = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim() || 'Well-wisher',
      message: message.trim(),
      timestamp: 'Just now',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('rohan_priya_wishes', JSON.stringify(updated));

    setName('');
    setRelation('');
    setMessage('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <section id="wishes" className="relative py-24 px-4 sm:px-6 bg-[#FAF7F2] text-neutral-800 overflow-hidden">
      
      {/* Decorative Palace Jali watermark */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C59A30_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Header */}
        <FloralArchHeader
          hindiTitle="|| मंगल कामनाएं एवं आशीर्वाद ||"
          title="Guest Blessings & Wishes"
          subtitle="Leave your heartfelt thoughts, blessings, and joyful memories for the bride & groom"
        />

        {/* Post a Blessing Form */}
        <div className="max-w-2xl mx-auto mb-16 rounded-3xl p-6 sm:p-8 bg-white border-2 border-gold-300 shadow-royal relative">
          <CornerOrnament position="top-left" size={36} className="absolute top-2 left-2 text-gold-500" />
          <CornerOrnament position="top-right" size={36} className="absolute top-2 right-2 text-gold-500" />

          <h4 className="font-serif-royal text-center text-xl text-royal-maroon font-bold tracking-wider mb-4">
            Pen a Blessing for Rohan & Priya
          </h4>

          {isSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-serif text-center flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Your blessing has been lovingly added to the royal guest wall!</span>
            </div>
          )}

          <form onSubmit={handlePostWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name *"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 outline-none text-xs sm:text-sm bg-neutral-50/50"
              />
              <input
                type="text"
                placeholder="Relationship / From (e.g. Groom's Cousin)"
                value={relation}
                onChange={e => setRelation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 outline-none text-xs sm:text-sm bg-neutral-50/50"
              />
            </div>

            <textarea
              required
              rows={3}
              placeholder="Write your auspicious blessing or memory..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 outline-none text-xs sm:text-sm bg-neutral-50/50 resize-none"
            />

            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-royal-maroon font-serif font-bold text-xs uppercase tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Your Blessing</span>
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Wall Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map(wish => (
            <div
              key={wish.id}
              className="relative p-6 rounded-2xl bg-white/90 border border-gold-300/80 shadow-md flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-gold-500">
                  <MessageSquareHeart className="w-5 h-5 text-gold-600" />
                  <span className="text-[10px] font-mono text-neutral-400">{wish.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 italic font-light leading-relaxed">
                  "{wish.message}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gold-100 flex items-center justify-between">
                <div>
                  <h5 className="font-serif font-semibold text-xs sm:text-sm text-royal-maroon">
                    {wish.name}
                  </h5>
                  <span className="text-[10px] text-neutral-500 font-serif block">
                    {wish.relation}
                  </span>
                </div>
                <Heart className="w-4 h-4 text-gold-500 fill-gold-200" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
