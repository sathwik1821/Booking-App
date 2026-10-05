import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, CalendarDays, Users, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import dayjs from 'dayjs';

const CITIES = ['Goa', 'Jaipur', 'Mumbai', 'Bangalore', 'Hyderabad', 'New Delhi'];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function CalendarPicker({ value, onChange, minDate }) {
  const today = minDate || new Date();
  const [viewDate, setViewDate] = useState(value ? new Date(value) : today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (d) => {
    if (!d) return true;
    const dt = new Date(year, month, d);
    return dt < new Date(today.toDateString());
  };

  const isSelected = (d) => {
    if (!d || !value) return false;
    const dt = new Date(year, month, d);
    return dayjs(dt).format('YYYY-MM-DD') === value;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-72">
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <ChevronLeft size={16} />
        </button>
        <span className="font-semibold text-sm text-gray-800">{MONTHS[month]} {year}</span>
        <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {['S','M','T','W','T','F','S'].map((d,i) => (
          <div key={i} className="text-xs font-medium text-gray-400 py-1">{d}</div>
        ))}
        {cells.map((d, i) => (
          <button
            key={i}
            type="button"
            disabled={isDisabled(d)}
            onClick={() => {
              if (!d || isDisabled(d)) return;
              onChange(dayjs(new Date(year, month, d)).format('YYYY-MM-DD'));
            }}
            className={`h-8 w-8 mx-auto rounded-full text-xs font-medium transition-all cursor-pointer
              ${!d ? '' : isDisabled(d) ? 'text-gray-300 cursor-not-allowed' :
              isSelected(d) ? 'bg-sky-700 text-white shadow-md' :
              'hover:bg-sky-100 text-gray-700'}`}
          >
            {d || ''}
          </button>
        ))}
      </div>
    </div>
  );
}

const SearchBar = ({ compact = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [city, setCity] = useState(searchParams.get('city') || '');
  const [checkin, setCheckin] = useState(searchParams.get('checkin') || dayjs().format('YYYY-MM-DD'));
  const [checkout, setCheckout] = useState(searchParams.get('checkout') || dayjs().add(1,'day').format('YYYY-MM-DD'));
  const [rooms, setRooms] = useState(Number(searchParams.get('rooms')) || 1);

  const [showCity, setShowCity] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showRooms, setShowRooms] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowCity(false); setShowCheckin(false); setShowCheckout(false); setShowRooms(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const nights = Math.max(1, dayjs(checkout).diff(dayjs(checkin), 'day'));

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    params.set('checkin', checkin);
    params.set('checkout', checkout);
    params.set('rooms', String(rooms));
    navigate(`/search?${params.toString()}`);
    setShowCity(false); setShowCheckin(false); setShowCheckout(false); setShowRooms(false);
  };

  const openOnly = (fn) => {
    setShowCity(false); setShowCheckin(false); setShowCheckout(false); setShowRooms(false);
    fn(true);
  };

  const filteredCities = city ? CITIES.filter(c => c.toLowerCase().includes(city.toLowerCase())) : CITIES;

  return (
    <form onSubmit={onSubmit} ref={ref} className="relative">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-visible border border-gray-100">

        {/* Location */}
        <div className="relative flex-1 min-w-0">
          <button
            type="button"
            onClick={() => openOnly(setShowCity)}
            className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors rounded-2xl sm:rounded-none sm:rounded-l-2xl cursor-pointer"
          >
            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">
              <MapPin size={12} /> Destination
            </div>
            <div className={`text-sm font-semibold ${city ? 'text-gray-900' : 'text-gray-400'}`}>
              {city || 'Where are you going?'}
            </div>
          </button>
          {showCity && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden">
              <div className="p-3 border-b border-gray-100">
                <input
                  autoFocus
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Search city..."
                  className="w-full text-sm outline-none text-gray-800 placeholder-gray-400"
                />
              </div>
              <div className="py-2 max-h-60 overflow-y-auto">
                {filteredCities.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setCity(c); setShowCity(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-2 cursor-pointer"
                  >
                    <MapPin size={14} className="text-sky-400" /> {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden sm:block w-px bg-gray-100 self-stretch" />

        {/* Check-in */}
        <div className="relative">
          <button
            type="button"
            onClick={() => openOnly(setShowCheckin)}
            className="w-full sm:w-44 text-left px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">
              <CalendarDays size={12} /> Check-in
            </div>
            <div className="text-sm font-semibold text-gray-900">{dayjs(checkin).format('DD MMM YYYY')}</div>
          </button>
          {showCheckin && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <CalendarPicker value={checkin} onChange={v => { setCheckin(v); if(dayjs(v).isAfter(dayjs(checkout))) setCheckout(dayjs(v).add(1,'day').format('YYYY-MM-DD')); setShowCheckin(false); setShowCheckout(true); }} minDate={new Date()} />
            </div>
          )}
        </div>

        <div className="hidden sm:block w-px bg-gray-100 self-stretch" />

        {/* Check-out */}
        <div className="relative">
          <button
            type="button"
            onClick={() => openOnly(setShowCheckout)}
            className="w-full sm:w-44 text-left px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">
              <CalendarDays size={12} /> Check-out
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {dayjs(checkout).format('DD MMM YYYY')}
              <span className="text-xs text-gray-400 ml-1">({nights}n)</span>
            </div>
          </button>
          {showCheckout && (
            <div className="absolute top-full left-0 mt-2 z-50">
              <CalendarPicker value={checkout} onChange={v => { setCheckout(v); setShowCheckout(false); }} minDate={new Date(dayjs(checkin).add(1,'day').toDate())} />
            </div>
          )}
        </div>

        <div className="hidden sm:block w-px bg-gray-100 self-stretch" />

        {/* Rooms */}
        <div className="relative">
          <button
            type="button"
            onClick={() => openOnly(setShowRooms)}
            className="w-full sm:w-36 text-left px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">
              <Users size={12} /> Rooms
            </div>
            <div className="text-sm font-semibold text-gray-900">{rooms} Room{rooms > 1 ? 's' : ''}</div>
          </button>
          {showRooms && (
            <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-52">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Number of Rooms</p>
              <div className="flex items-center justify-between">
                <button type="button" onClick={() => setRooms(r => Math.max(1, r-1))} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-sky-100 hover:text-sky-700 font-bold text-lg flex items-center justify-center cursor-pointer transition-colors">−</button>
                <span className="text-xl font-bold text-gray-900">{rooms}</span>
                <button type="button" onClick={() => setRooms(r => Math.min(10, r+1))} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-sky-100 hover:text-sky-700 font-bold text-lg flex items-center justify-center cursor-pointer transition-colors">+</button>
              </div>
            </div>
          )}
        </div>

        {/* Search button */}
        <div className="p-2">
          <button
            type="submit"
            className="h-full w-full sm:w-auto bg-sky-700 hover:bg-sky-800 text-white font-bold px-7 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl whitespace-nowrap active:scale-95"
          >
            <Search size={18} />
            <span className="hidden sm:block">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;

