import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { weddingConfig } from '../../data/weddingConfig';
import { CornerOrnament, RoyalDivider } from '../ornaments/MandalaBorder';
import { Share2, Copy, Check, X, Sparkles, MessageCircle } from 'lucide-react';

interface ShareQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareQrModal: React.FC<ShareQrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [guestInput, setGuestInput] = useState<string>('');
  const [includeFamily, setIncludeFamily] = useState<boolean>(true);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Generate current or personalized URL
  const getShareUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://person1-person2-wedding.vercel.app';
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    const baseUrl = `${origin}${path}`;
    
    if (guestInput.trim()) {
      const params = new URLSearchParams();
      params.set('guest', guestInput.trim());
      if (includeFamily) params.set('family', 'true');
      return `${baseUrl}?${params.toString()}`;
    }
    return baseUrl;
  };

  const shareUrl = getShareUrl();

  // Generate dynamic QR code
  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(shareUrl, {
      width: 240,
      margin: 2,
      color: {
        dark: '#450910', // Royal Maroon
        light: '#FAF7F2', // Warm Ivory
      },
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error('QR code generation error:', err));
  }, [isOpen, shareUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wedding Invitation — ${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}`,
          text: `|| श्री गणेशाय नमः || You are cordially invited to celebrate the royal wedding of ${weddingConfig.couple.groom.fullName} and ${weddingConfig.couple.bride.fullName}.`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `|| श्री गणेशाय नमः ||\n\nWith great joy, you are cordially invited to celebrate the royal wedding of *${weddingConfig.couple.groom.fullName}* & *${weddingConfig.couple.bride.fullName}* in Indore (${weddingConfig.weddingDetails.dateRangeDisplay}).\n\nPlease open your royal digital invitation:\n${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-ivory rounded-3xl border-2 border-gold-400 p-6 sm:p-8 shadow-2xl text-neutral-800 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <CornerOrnament position="top-left" size={32} className="absolute top-2 left-2 text-gold-600" />
        <CornerOrnament position="top-right" size={32} className="absolute top-2 right-2 text-gold-600" />

        {/* Modal Header */}
        <div className="text-center mb-5">
          <span className="font-script text-2xl text-gold-600 block">Digital Shubh Nimantran</span>
          <h3 className="font-serif-royal text-2xl text-royal-maroon font-bold tracking-wider">
            Share Royal Invitation
          </h3>
          <RoyalDivider className="my-2" />
          <p className="text-xs text-neutral-600 font-light max-w-sm mx-auto">
            Share this cinematic invitation with loved ones or generate a personalized invite with their name.
          </p>
        </div>

        {/* Personalize Invitation Option */}
        <div className="mb-5 p-3.5 rounded-2xl bg-gold-50/70 border border-gold-200">
          <label className="block text-[11px] font-serif uppercase tracking-widest text-gold-800 font-semibold mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Personalize for Specific Guest (Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Ramesh Patel, Dr. Sharma, Uncle Suresh"
            value={guestInput}
            onChange={e => setGuestInput(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-gold-300 text-xs outline-none bg-white focus:border-gold-500"
          />
          {guestInput && (
            <label className="mt-2 flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFamily}
                onChange={e => setIncludeFamily(e.target.checked)}
                className="rounded text-gold-600 focus:ring-gold-500 w-3.5 h-3.5 border-gold-300"
              />
              <span>Append "& Family" (e.g. {guestInput} & Family)</span>
            </label>
          )}
        </div>

        {/* Dynamic QR Code */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="p-3 bg-white rounded-2xl border-2 border-gold-400 shadow-md">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="Wedding QR Code" className="w-44 h-44 rounded-lg object-contain" />
            ) : (
              <div className="w-44 h-44 flex items-center justify-center text-xs text-neutral-400 font-serif">
                Generating QR...
              </div>
            )}
          </div>
          <p className="text-[11px] font-serif text-neutral-500 tracking-wider uppercase mt-2">
            Scan to view invitation on mobile
          </p>
        </div>

        {/* Copy Link Input & Buttons */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-100 border border-neutral-300 text-xs">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent flex-1 outline-none text-neutral-700 px-1 truncate font-mono text-[11px]"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-gold-500 text-neutral-950 font-serif text-xs font-semibold flex items-center gap-1.5 shrink-0 hover:bg-gold-400 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-neutral-950" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-serif text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-gold-300 border border-gold-400 font-serif text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4 text-gold-400" />
              <span>Share Link</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
