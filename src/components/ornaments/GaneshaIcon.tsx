import React from 'react';

interface GaneshaIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const GaneshaIcon: React.FC<GaneshaIconProps> = ({ 
  className = "w-16 h-16 text-gold-500", 
  size = 64,
  glow = true 
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${glow ? 'filter drop-shadow-[0_0_12px_rgba(218,180,78,0.45)]' : ''}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Lord Ganesha Sacred Icon"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E298" />
            <stop offset="45%" stopColor="#C59A30" />
            <stop offset="80%" stopColor="#DFBA55" />
            <stop offset="100%" stopColor="#966F12" />
          </linearGradient>
          <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5ECCF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C59A30" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Aura Halo */}
        <circle cx="50" cy="50" r="46" fill="url(#haloGrad)" stroke="url(#goldGrad)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="50" cy="50" r="42" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.8" />

        {/* Crown (Mukut) */}
        <path d="M42 22 L50 12 L58 22 L55 27 L45 27 Z" fill="url(#goldGrad)" stroke="#B3861B" strokeWidth="0.75" />
        <circle cx="50" cy="12" r="2.5" fill="#FFEBA7" />
        <circle cx="50" cy="20" r="1.5" fill="#FFEBA7" />

        {/* Tilak on Forehead */}
        <path d="M48 29 Q50 27 52 29 L52 35 Q50 37 48 35 Z" fill="#991B1B" />
        <circle cx="50" cy="32" r="1" fill="#FFEBA7" />

        {/* Ears (Karna) */}
        {/* Left Ear */}
        <path d="M43 32 C34 32 30 38 33 46 C35 51 40 52 43 51" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Right Ear */}
        <path d="M57 32 C66 32 70 38 67 46 C65 51 60 52 57 51" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Trunk (Sond) curving gracefully to the left with auspicious Modak */}
        <path 
          d="M48 36 C48 44 47 52 49 57 C50 60 48 64 43 65 C38 66 37 61 40 58 C42 56 45 57 45 59" 
          stroke="url(#goldGrad)" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Single Tusk (Ekadanta) */}
        <path d="M55 46 L60 45" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />

        {/* Auspicious Modak / Ladoo */}
        <ellipse cx="37" cy="59" rx="3.5" ry="4" fill="url(#goldGrad)" stroke="#966F12" strokeWidth="0.5" />
        
        {/* Divine Belly & Lotus Base */}
        <path d="M37 67 C37 76 63 76 63 67" stroke="url(#goldGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        
        {/* Lotus Petals Base */}
        <path d="M32 80 C40 76 46 80 50 83 C54 80 60 76 68 80 C60 84 56 86 50 85 C44 86 40 84 32 80 Z" fill="url(#goldGrad)" opacity="0.9" />
      </svg>
    </div>
  );
};
