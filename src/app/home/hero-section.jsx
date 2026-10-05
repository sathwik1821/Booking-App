import React, { useState, useEffect } from 'react';
import SearchBar from '@/features/search';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop&q=85',
];

const STATS = [
  { value: '500+', label: 'Properties' },
  { value: '50k+', label: 'Happy Guests' },
  { value: '100%', label: 'Secure Booking' },
];

const HeroSection = () => {
  const [imgIdx, setImgIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setImgIdx(i => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background carousel */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
          style={{ opacity: i === imgIdx ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            onLoad={() => i === 0 && setLoaded(true)}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/30 to-transparent" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setImgIdx(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${i === imgIdx ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 w-full px-4 flex flex-col items-center text-center transition-opacity duration-700 ${loaded || true ? 'opacity-100' : 'opacity-0'}`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 text-white/90 text-sm font-medium mb-7 animate-slideUp">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          India's most-loved hotel booking platform
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-5 animate-slideUp">
          Your perfect<br />
          <span style={{
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            stay awaits
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/80 font-light mb-10 max-w-lg animate-slideUp" style={{ animationDelay: '0.1s' }}>
          Book luxury hotels, boutique resorts & unique stays across India — no booking fees, instant confirmation.
        </p>

        {/* Search card */}
        <div className="w-full max-w-4xl animate-slideUp" style={{ animationDelay: '0.2s' }}>
          <SearchBar />
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          {['Free cancellation on most bookings', 'Best price guarantee', 'Instant confirmation'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-white/80 text-sm">
              <span className="text-emerald-400 font-bold text-base">✓</span>
              {badge}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-10 mt-12 animate-slideUp" style={{ animationDelay: '0.4s' }}>
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-white/60 mt-0.5 font-medium">{s.label}</div>
              </div>
              {i < STATS.length - 1 && <div className="w-px h-10 bg-white/20" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


