import React from 'react';

export const CornerOrnament: React.FC<{ 
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = "text-gold-500", size = 60 }) => {
  const transform = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }[position];

  return (
    <div 
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{ transform }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4 L4 55 C4 40 18 20 55 20 L20 20 C10 20 4 14 4 4 Z" fill="currentColor" opacity="0.15" />
        <path d="M4 4 L4 70 C4 60 12 55 20 55 C35 55 55 35 55 20 C55 12 60 4 70 4 L4 4 Z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.75" />
        <path d="M12 12 L12 40 C12 30 20 25 35 25 C40 25 45 20 45 12 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <circle cx="28" cy="28" r="2.5" fill="currentColor" />
        <circle cx="48" cy="12" r="2" fill="currentColor" />
        <circle cx="12" cy="48" r="2" fill="currentColor" />
        {/* Intricate paisley bud */}
        <path d="M22 22 C30 18 36 24 32 32 C28 40 18 30 22 22 Z" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
};

export const RoyalDivider: React.FC<{ 
  className?: string; 
  subtitle?: string;
  light?: boolean;
}> = ({ className = "my-6", subtitle, light = false }) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className={`h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent ${light ? 'to-gold-300' : 'to-gold-500'}`} />
      
      <div className="flex items-center gap-1.5 text-gold-500">
        <span className="text-xs">✦</span>
        <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold-500">
          <circle cx="20" cy="20" r="4" fill="currentColor" />
          <path d="M20 6 C20 12 14 16 8 20 C14 24 20 28 20 34 C20 28 26 24 32 20 C26 16 20 12 20 6 Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
        <span className="text-xs">✦</span>
      </div>

      <div className={`h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent ${light ? 'to-gold-300' : 'to-gold-500'}`} />
      {subtitle && <span className="sr-only">{subtitle}</span>}
    </div>
  );
};

export const FloralArchHeader: React.FC<{ 
  title: string; 
  hindiTitle?: string;
  subtitle?: string;
  dark?: boolean;
}> = ({ title, hindiTitle, subtitle, dark = false }) => {
  return (
    <div className="text-center py-6 select-none relative">
      {hindiTitle && (
        <p className="font-hindi text-base sm:text-lg text-gold-500 tracking-wider mb-1.5 opacity-90">
          {hindiTitle}
        </p>
      )}
      <h2 className={`font-serif-royal text-2xl sm:text-4xl md:text-5xl uppercase tracking-[0.18em] font-medium ${dark ? 'text-ivory' : 'text-neutral-900'}`}>
        {title}
      </h2>
      <RoyalDivider className="my-3" light={dark} />
      {subtitle && (
        <p className={`font-script text-xl sm:text-2xl md:text-3xl tracking-wide max-w-xl mx-auto ${dark ? 'text-gold-200' : 'text-neutral-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const FloatingParticles: React.FC<{ count?: number; color?: 'gold' | 'marigold' | 'rose' }> = ({ 
  count = 20,
  color = 'gold' 
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23) % 100}%`,
    size: (i % 3) + 2,
    duration: 6 + (i % 7) * 2,
    delay: (i % 5) * 0.8,
  }));

  const bgStyle = {
    gold: 'bg-gold-400 shadow-[0_0_8px_#E4CB79]',
    marigold: 'bg-amber-400 shadow-[0_0_8px_#F59E0B]',
    rose: 'bg-rose-400 shadow-[0_0_8px_#FB7185]',
  }[color];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full opacity-60 animate-float-slow ${bgStyle}`}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
