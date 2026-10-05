import React from 'react';
import HeroSection from './hero-section';
import TrendingSection from './trending-section';
import { Star, Shield, Clock, Headphones, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHY_US = [
  { icon: Award, title: 'Best Price Guaranteed', desc: 'We match any lower price you find. No hidden fees, ever.', color: 'bg-amber-50', iconColor: 'text-amber-600' },
  { icon: Shield, title: 'Safe & Secure Booking', desc: 'Your payments are protected with industry-standard encryption.', color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { icon: Clock, title: 'Instant Confirmation', desc: 'Get your booking confirmed in seconds. No waiting.', color: 'bg-blue-50', iconColor: 'text-blue-600' },
  { icon: Headphones, title: '24/7 Support', desc: 'Our team is available round the clock to help you.', color: 'bg-purple-50', iconColor: 'text-purple-600' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', location: 'Mumbai', text: 'Found an incredible resort in Goa at half the price! The booking process was seamless.', rating: 5, avatar: 'P' },
  { name: 'Rahul Gupta', location: 'Delhi', text: 'StayWave is my go-to for all business travel. Instant confirmation saves me so much time.', rating: 5, avatar: 'R' },
  { name: 'Ananya Patel', location: 'Bangalore', text: 'The hotel recommendations were spot on for our anniversary trip to Jaipur. Loved it!', rating: 5, avatar: 'A' },
];

const HomePage = () => {
  return (
    <div className="page-enter">
      <HeroSection />
      <TrendingSection />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 rounded-full px-4 py-1.5 mb-4">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Travel smarter with StayWave</h2>
            <p className="text-gray-500 max-w-md mx-auto">Every feature designed to make hotel search and booking effortless.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-slideUp" style={{ animationDelay: `${i * 80}ms` }}>
                <div className={`inline-flex p-3 rounded-xl ${item.color} mb-4`}><item.icon size={24} className={item.iconColor} /></div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 rounded-full px-4 py-1.5 mb-4">Guest Stories</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Loved by travellers across India</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-3">{[...Array(t.rating)].map((_, i) => <Star key={i} size={15} className="fill-amber-400 text-amber-400" />)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-700 flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                  <div><p className="font-semibold text-gray-900 text-sm">{t.name}</p><p className="text-xs text-gray-400">{t.location}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0c2340, #0e4f8a, #0284c7)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <TrendingUp size={40} className="text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to find your perfect stay?</h2>
            <p className="text-sky-200 mb-8 text-lg">Over 500 properties across India at the best prices.</p>
            <Link to="/search">
              <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-10 py-4 rounded-2xl text-lg transition-all cursor-pointer shadow-xl hover:shadow-2xl active:scale-95">
                Browse All Hotels
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


