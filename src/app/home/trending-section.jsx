import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const DESTINATIONS = [
  {
    city: 'Goa',
    subtitle: 'Beach Paradise',
    hotels: '48 hotels',
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80',
  },
  {
    city: 'Jaipur',
    subtitle: 'The Pink City',
    hotels: '62 hotels',
    img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop&q=80',
  },
  {
    city: 'Mumbai',
    subtitle: 'City of Dreams',
    hotels: '95 hotels',
    img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=80',
  },
  {
    city: 'Bangalore',
    subtitle: 'Garden City',
    hotels: '78 hotels',
    img: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop&q=80',
  },
  {
    city: 'New Delhi',
    subtitle: 'Capital Grandeur',
    hotels: '110 hotels',
    img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=80',
  },
  {
    city: 'Hyderabad',
    subtitle: 'City of Nizams',
    hotels: '57 hotels',
    img: 'https://images.unsplash.com/photo-1583437344-8b7de4fe3f5a?w=800&auto=format&fit=crop&q=80',
  },
];

const TrendingSection = () => {
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    const params = new URLSearchParams({
      city,
      checkin: dayjs().format('YYYY-MM-DD'),
      checkout: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      rooms: '1',
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 rounded-full px-4 py-1.5 mb-4">
            Top Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Explore India's finest cities
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            From beach escapes to royal palaces — find the stay that's perfect for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {DESTINATIONS.map((dest, i) => (
            <button
              key={dest.city}
              type="button"
              onClick={() => handleCityClick(dest.city)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group text-left
                ${i === 0 ? 'col-span-2 sm:col-span-1 row-span-2' : ''}
                ${i === 0 ? 'h-72 sm:h-full min-h-64' : 'h-44 sm:h-48'}
              `}
            >
              <img
                src={dest.img}
                alt={dest.city}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/20 transition-colors duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white/70 text-xs font-medium mb-0.5">{dest.subtitle}</p>
                <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">{dest.city}</h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs font-semibold">{dest.hotels}</span>
                  </div>
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="text-white text-sm">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;

