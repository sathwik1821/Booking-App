import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User2, ChevronDown, Menu, X } from 'lucide-react';

const WaveLogo = ({ size = 22, white = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={white ? "white" : "#0e4f8a"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 15 Q5 10 8 13 Q11 16 14 11 Q17 6 20 9 Q22 11 22 11" />
    <path d="M2 19 Q5 14 8 17 Q11 20 14 15 Q17 10 20 13 Q22 15 22 15" strokeWidth="2" opacity="0.5" />
  </svg>
);

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleLogout = () => { logout(); setUserMenuOpen(false); navigate('/'); };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Explore Hotels', to: '/search' },
  ];

  const isTransparent = isHome && !scrolled;
  const bg = isTransparent ? 'bg-transparent' : 'bg-white/96 backdrop-blur-md shadow-sm border-b border-gray-100';
  const textBase = isTransparent ? 'text-white' : 'text-gray-800';
  const logoText = isTransparent ? 'text-white' : 'text-sky-700';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
        <div className="container mx-auto px-4 flex items-center h-16 gap-6">

          {/* Wave Logo */}
          <Link to="/" className={`shrink-0 flex items-center gap-2.5 font-extrabold text-xl tracking-tight ${logoText}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${isTransparent ? 'bg-white/20' : 'bg-sky-700'}`}>
              <WaveLogo size={20} white />
            </div>
            StayWave
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? isTransparent ? 'bg-white/20 text-white' : 'bg-sky-50 text-sky-700'
                    : isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >{link.label}</Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                    isTransparent ? 'bg-white/15 hover:bg-white/25 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isTransparent ? 'bg-white/30 text-white' : 'bg-sky-700 text-white'}`}>
                    {user.name?.charAt(0)?.toUpperCase() ?? 'U'}
                  </div>
                  <span className="hidden sm:block max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-slideDown">
                      <div className="px-4 py-3 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)' }}>
                        <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                      </div>
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 transition-colors">
                        <User2 size={16} className="text-sky-600" /> My Profile & Bookings
                      </Link>
                      <div className="border-t border-gray-100" />
                      <button onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left cursor-pointer">
                        <LogOut size={16} /> Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isTransparent ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
                  }`}>Sign in</button>
                </Link>
                <Link to="/signup">
                  <button className="bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-sm">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(v => !v)}
            className={`md:hidden p-2 rounded-lg cursor-pointer ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col md:hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #0c2340, #0e4f8a)' }}>
              <div className="flex items-center gap-2 text-white font-extrabold text-lg">
                <WaveLogo size={20} white /> StayWave
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 cursor-pointer text-white/80 hover:text-white"><X size={22} /></button>
            </div>

            {isAuthenticated && user && (
              <div className="px-5 py-4 bg-sky-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-700 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0)?.toUpperCase() ?? 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <nav className="flex-1 px-3 py-4 space-y-1">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-colors">
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <Link to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-colors">
                  <User2 size={16} /> My Bookings
                </Link>
              )}
            </nav>

            <div className="px-4 py-5 border-t border-gray-100 space-y-2">
              {isAuthenticated ? (
                <button onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-red-600 border border-red-100 hover:bg-red-50 cursor-pointer">
                  <LogOut size={16} /> Sign Out
                </button>
              ) : (
                <>
                  <Link to="/signin" className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-sky-700 border border-sky-200 hover:bg-sky-50">Sign In</Link>
                  <Link to="/signup" className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {!isHome && <div className="h-16" />}
    </>
  );
};

export default Header;
