import React from 'react';
import { Check, CircleCheck, Star, Wifi, Car, Coffee, Waves, Dumbbell } from 'lucide-react';

const FALLBACK = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&auto=format&fit=crop&q=70';

const getAmenityIcon = (a) => {
  const lower = a?.toLowerCase() ?? '';
  if (lower.includes('wifi') || lower.includes('wi-fi')) return Wifi;
  if (lower.includes('park') || lower.includes('car')) return Car;
  if (lower.includes('breakfast') || lower.includes('coffee')) return Coffee;
  if (lower.includes('pool') || lower.includes('swim')) return Waves;
  if (lower.includes('gym') || lower.includes('fitness')) return Dumbbell;
  return Check;
};

const Room = ({ id, type, photos, amenities = [], price, isSelected, onSelect }) => {
  const image = photos?.[0] || FALLBACK;

  return (
    <div
      className={`border-2 rounded-2xl overflow-hidden transition-all duration-200 ${
        isSelected
          ? 'border-brand shadow-lg'
          : 'border-border hover:border-brand/40'
      }`}
      style={isSelected ? { borderColor: 'oklch(0.28 0.18 240)' } : {}}
    >
      {isSelected && (
        <div className="flex items-center gap-2 px-5 py-2 text-white text-xs font-bold tracking-wide" style={{ backgroundColor: 'oklch(0.28 0.18 240)' }}>
          <Star size={12} className="fill-amber-400 text-amber-400" />
          SELECTED ROOM
        </div>
      )}

      <div className="p-5">
        <div className="flex gap-4">
          {/* Room image */}
          <div className="shrink-0 w-32 h-24 rounded-xl overflow-hidden">
            <img
              src={image}
              alt={type}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = FALLBACK; }}
            />
          </div>

          {/* Room details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{type}</h3>
              {isSelected && <CircleCheck size={18} className="text-green-500 fill-green-100 shrink-0" />}
            </div>
            <div className="flex flex-wrap gap-y-1 gap-x-4">
              {amenities.slice(0, 6).map((am, i) => {
                const Icon = getAmenityIcon(am);
                return (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon size={12} />
                    {am}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">per night</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{price ? Math.round(price).toLocaleString('en-IN') : 'N/A'}</span>
              {price && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{Math.round(price * 1.35).toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {isSelected ? (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-5 py-2.5 rounded-xl text-sm font-semibold">
              <CircleCheck size={16} />
              Selected
            </div>
          ) : (
            <button
              onClick={() => onSelect({ id, type, photos, amenities, price })}
              className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 cursor-pointer shadow-sm"
              style={{ backgroundColor: 'oklch(0.28 0.18 240)' }}
            >
              Select Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const HotelRoomsPicker = ({ rooms = [], selectedRoomId, onSelectRoom }) => {
  if (!rooms.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>No rooms available for the selected dates.</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Choose your room</h2>
      <div className="space-y-4">
        {rooms.map((room) => (
          <Room
            key={room.id}
            {...room}
            isSelected={room.id === selectedRoomId}
            onSelect={onSelectRoom}
          />
        ))}
      </div>
    </section>
  );
};

export default HotelRoomsPicker;

