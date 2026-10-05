import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Star, Wifi, Car, Coffee, Dumbbell, Waves } from 'lucide-react';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=600&auto=format&fit=crop&q=70',
];

const AMENITY_ICONS = {
  wifi: Wifi, parking: Car, breakfast: Coffee, gym: Dumbbell, pool: Waves,
};

const getAmenityIcon = (amenity) => {
  const lower = amenity?.toLowerCase() ?? '';
  if (lower.includes('wifi') || lower.includes('wi-fi')) return Wifi;
  if (lower.includes('park') || lower.includes('car')) return Car;
  if (lower.includes('breakfast') || lower.includes('coffee')) return Coffee;
  if (lower.includes('gym') || lower.includes('fitness')) return Dumbbell;
  if (lower.includes('pool') || lower.includes('swim')) return Waves;
  return null;
};

const HotelCard = ({ id, name, city, photos, amenities = [], price, index = 0 }) => {
  const [searchParams] = useSearchParams();

  const imageUrl = (photos && photos.length > 0 && photos[0])
    ? photos[0]
    : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  const rating = (4.0 + Math.random() * 0.9).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 800 + 100);

  const detailsUrl = `/hotels/${id}?${searchParams.toString()}`;

  return (
    <Link
      to={detailsUrl}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-brand/30 hotel-card-hover shadow-sm hover:shadow-lg transition-all duration-300 animate-fadeIn flex flex-col sm:flex-row"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <div className="relative sm:w-72 h-52 sm:h-auto shrink-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = FALLBACK_IMAGES[0]; }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2 py-1 rounded-lg shadow-sm">
            ⭐ {rating} ({reviewCount})
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            FREE CANCEL
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 p-5 flex flex-col">
        <div className="flex-1">
          <p className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <MapPin size={12} />
            {city}
          </p>
          <h3 className="font-bold text-lg text-foreground leading-tight group-hover:text-brand transition-colors line-clamp-2" style={{ '--tw-text-opacity': 1 }}>
            {name}
          </h3>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {amenities.slice(0, 5).map((amenity, i) => {
                const Icon = getAmenityIcon(amenity);
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                  >
                    {Icon && <Icon size={11} />}
                    {amenity}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">per night from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                ₹{price ? Math.round(price).toLocaleString('en-IN') : 'N/A'}
              </span>
              {price && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{Math.round(price * 1.3).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-xs text-green-600 font-medium mt-0.5">+taxes & fees</p>
          </div>
          <div
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
            style={{ backgroundColor: 'oklch(0.28 0.18 240)' }}
          >
            View deal
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;

