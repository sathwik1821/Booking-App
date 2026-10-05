import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, description }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left panel – decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop&q=80)',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/90 via-brand/60 to-purple-900/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl p-2">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L3 9v14l13 7 13-7V9L16 2z" fill="white" fillOpacity="0.95"/>
                <path d="M16 2v30M3 9l13 7 13-7" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
              </svg>
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">StayWave</span>
          </Link>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your perfect stay<br />awaits you.
            </h2>
            <p className="text-white/70 text-lg">
              Discover thousands of hotels, resorts, and unique stays across India and the world.
            </p>

            <div className="flex gap-6 pt-4">
              {[
                { num: '50K+', label: 'Hotels' },
                { num: '2M+', label: 'Guests' },
                { num: '4.9★', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.num}</p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/40 text-xs">© 2025 StayWave. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background">
        <div className="w-full max-w-md animate-slideUp">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="bg-brand rounded-xl p-2">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L3 9v14l13 7 13-7V9L16 2z" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-xl text-brand">StayWave</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="mt-2 text-muted-foreground">{description}</p>
            )}
          </div>

          {/* Form content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

