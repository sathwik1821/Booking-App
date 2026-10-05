import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axiosInstance from '@/lib/axios-instance';
import SearchBar from '@/features/search';
import { MapPin, Star, Wifi, Car, Coffee, Dumbbell, Waves, SlidersHorizontal, X, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import dayjs from 'dayjs';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&auto=format&fit=crop&q=80',
];

const getAmenityIcon = (amenity) => {
  const lower = amenity?.toLowerCase() ?? '';
  if (lower.includes('wifi') || lower.includes('wi-fi')) return Wifi;
  if (lower.includes('park') || lower.includes('car')) return Car;
  if (lower.includes('breakfast') || lower.includes('coffee')) return Coffee;
  if (lower.includes('gym') || lower.includes('fitness')) return Dumbbell;
  if (lower.includes('pool') || lower.includes('swim')) return Waves;
  return null;
};

const RATINGS_SEED = {};
const getRating = (id) => {
  if (!RATINGS_SEED[id]) RATINGS_SEED[id] = (4.0 + Math.random() * 0.9).toFixed(1);
  return RATINGS_SEED[id];
};
const getReviews = (id) => {
  if (!RATINGS_SEED[`r${id}`]) RATINGS_SEED[`r${id}`] = Math.floor(Math.random() * 800 + 80);
  return RATINGS_SEED[`r${id}`];
};

const HotelCard = ({ id, name, city, photos, amenities = [], price, index = 0 }) => {
  const [searchParams] = useSearchParams();
  const imageUrl = (photos?.length && photos[0]) ? photos[0] : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  const rating = getRating(id);
  const reviewCount = getReviews(id);
  const discount = Math.floor(Math.random() * 20 + 10);

  return (
    <Link
      to={`/hotels/${id}?${searchParams.toString()}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative sm:w-64 h-48 sm:h-auto shrink-0 overflow-hidden">
        <img
          src={imageUrl} alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.target.src = FALLBACK_IMAGES[0]; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent sm:bg-none" />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
          <Star size={11} className="fill-amber-400 text-amber-400" /> {rating} ({reviewCount})
        </div>
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
          -{discount}%
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex-1">
          <p className="flex items-center gap-1 text-xs text-gray-400 mb-1">
            <MapPin size={11} /> {city}
          </p>
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-sky-700 transition-colors line-clamp-2">
            {name}
          </h3>
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {amenities.slice(0, 4).map((amenity, i) => {
                const Icon = getAmenityIcon(amenity);
                return (
                  <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
                    {Icon && <Icon size={11} />} {amenity}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">per night from</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-gray-900">
                &#8377;{price ? Math.round(price).toLocaleString('en-IN') : 'N/A'}
              </span>
              {price && (
                <span className="text-sm text-gray-400 line-through">
                  &#8377;{Math.round(price * (1 + discount/100)).toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-0.5">+ taxes & fees</p>
          </div>
          <div className="bg-sky-700 group-hover:bg-sky-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
            View Deal
          </div>
        </div>
      </div>
    </Link>
  );
};

const HotelCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col sm:flex-row animate-pulse">
    <div className="sm:w-64 h-48 sm:h-auto bg-gray-200 shrink-0" />
    <div className="flex-1 p-5 space-y-3">
      <div className="h-3 w-20 bg-gray-200 rounded" />
      <div className="h-5 w-3/4 bg-gray-200 rounded" />
      <div className="flex gap-2 mt-3">
        {[1,2,3].map(i => <div key={i} className="h-6 w-20 bg-gray-200 rounded-lg" />)}
      </div>
      <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
        <div className="space-y-1">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-28 bg-gray-200 rounded" />
        </div>
        <div className="h-10 w-24 bg-gray-200 rounded-xl" />
      </div>
    </div>
  </div>
);

const SORT_OPTIONS = [
  { value: 'default', label: 'Recommended' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Top Rated' },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get('city') || '';
  const checkin = searchParams.get('checkin') || dayjs().format('YYYY-MM-DD');
  const checkout = searchParams.get('checkout') || dayjs().add(1, 'day').format('YYYY-MM-DD');
  const rooms = Number(searchParams.get('rooms')) || 1;
  const page = Number(searchParams.get('page')) || 0;

  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filters (client-side on results)
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);

  const nights = Math.max(1, dayjs(checkout).diff(dayjs(checkin), 'day'));

  const fetchHotels = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/hotels/search', {
        city: city || undefined,
        startDate: checkin,
        endDate: checkout,
        roomsCount: rooms,
        page,
        size: 12,
      });
      const data = response.data;
      setHotels(data.content || []);
      setTotalElements(data.totalElements || 0);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError('Failed to load hotels. Please make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  }, [city, checkin, checkout, rooms, page]);

  useEffect(() => { fetchHotels(); }, [fetchHotels]);

  const filteredHotels = useMemo(() => {
    let result = [...hotels].filter(h => !h.price || h.price <= maxPrice);
    if (sortBy === 'price_asc') result.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortBy === 'price_desc') result.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortBy === 'rating_desc') result.sort((a, b) => parseFloat(getRating(b.id)) - parseFloat(getRating(a.id)));
    return result;
  }, [hotels, sortBy, maxPrice]);

  const minPriceInResults = Math.min(...hotels.map(h => h.price || 0).filter(p => p > 0));
  const maxPriceInResults = Math.max(...hotels.map(h => h.price || 0));

  return (
    <div className="page-enter min-h-screen bg-gray-50">
      {/* Search bar */}
      <div className="py-5 px-4">
        <div className="container mx-auto">
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header + filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {city ? `Hotels in ${city}` : 'All Hotels'}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {!isLoading && `${filteredHotels.length} result${filteredHotels.length !== 1 ? 's' : ''} · `}
              {dayjs(checkin).format('DD MMM')} – {dayjs(checkout).format('DD MMM')} · {rooms} room{rooms > 1 ? 's' : ''} · {nights} night{nights > 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ArrowUpDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${showFilters ? 'bg-sky-700 text-white border-sky-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm animate-slideDown">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filter Results</h3>
              <button onClick={() => setShowFilters(false)} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="max-w-xs">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Max price per night: <span className="text-sky-700 font-bold">&#8377;{maxPrice.toLocaleString('en-IN')}</span>
              </label>
              <input
                type="range"
                min={minPriceInResults || 1000}
                max={maxPriceInResults || 50000}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-sky-700"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>&#8377;{(minPriceInResults || 1000).toLocaleString('en-IN')}</span>
                <span>&#8377;{(maxPriceInResults || 50000).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">{error}</div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3,4].map(i => <HotelCardSkeleton key={i} />)}
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-4">🏨</div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters.</p>
            <Link to="/search" className="inline-block bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-sky-800 transition-colors">
              Clear Filters
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHotels.map((h, i) => (
              <HotelCard
                key={h.id}
                id={h.id}
                name={h.name}
                city={h.city}
                photos={h.photos}
                amenities={h.amenities}
                price={h.price}
                index={i}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              disabled={page === 0}
              onClick={() => { const p = new URLSearchParams(searchParams); p.set('page', String(page-1)); setSearchParams(p); window.scrollTo({top:0,behavior:'smooth'}); }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="text-sm text-gray-500 px-4">Page {page + 1} of {totalPages}</span>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => { const p = new URLSearchParams(searchParams); p.set('page', String(page+1)); setSearchParams(p); window.scrollTo({top:0,behavior:'smooth'}); }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium disabled:opacity-40 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;


