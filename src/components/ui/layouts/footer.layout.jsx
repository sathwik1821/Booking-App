import React from 'react';
import { FOOTER_SECTION, SOCIAL_LINKS } from '@/config/app.config';
import { Twitter, Instagram, Youtube, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOCIAL_ICONS = { twitter: Twitter, instagram: Instagram, youtube: Youtube, pinterest: MapPin };

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        {/* Brand + description */}
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand rounded-lg p-1.5" style={{ backgroundColor: 'oklch(0.28 0.18 240)' }}>
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <path d="M16 2L3 9v14l13 7 13-7V9L16 2z" fill="white"/>
                </svg>
              </div>
              <span className="text-white font-bold text-lg">StayWave</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted hotel booking platform with thousands of verified properties across India and beyond.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.icon] ?? Twitter;
                return (
                  <a
                    key={link.icon}
                    href={link.href}
                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-brand transition-colors flex items-center justify-center"
                    style={{ '--hover-bg': 'oklch(0.28 0.18 240)' }}
                    aria-label={link.title}
                  >
                    <Icon size={16} className="text-gray-400 hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links sections */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {FOOTER_SECTION.map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-semibold text-sm mb-4">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.text}>
                      <a
                        href={link.href || '#'}
                        className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© 2025 StayWave. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


