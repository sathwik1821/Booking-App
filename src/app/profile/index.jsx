import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/lib/axios-instance';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import {
  CalendarDays, BedDouble, User2, Mail, CheckCircle2,
  Clock, XCircle, AlertTriangle, Download, X, Loader2,
  IndianRupee, TrendingUp, Star
} from 'lucide-react';

const STATUS_CONFIG = {
  CONFIRMED: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2, label: 'Confirmed' },
  RESERVED: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock, label: 'Reserved' },
  PAYMENTS_PENDING: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock, label: 'Payment Pending' },
  GUESTS_ADDED: { color: 'bg-purple-50 text-purple-700 border-purple-200', icon: CheckCircle2, label: 'Guests Added' },
  CANCELLED: { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, label: 'Cancelled' },
};

const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=400&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop&q=70',
];

const CancelModal = ({ booking, onConfirm, onClose, loading }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scaleIn">
      <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
        <AlertTriangle size={30} className="text-red-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 text-center mb-2">Cancel Booking?</h2>
      <p className="text-gray-500 text-center text-sm mb-2">
        Booking <span className="font-semibold text-gray-700">#{booking.id}</span>
      </p>
      <p className="text-gray-500 text-center text-sm mb-6">
        {booking.hotel?.name || 'Hotel'} · {dayjs(booking.checkInDate).format('DD MMM')} – {dayjs(booking.checkOutDate).format('DD MMM YYYY')}
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        ⚠️ This action cannot be undone. The room will be released back to inventory.
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          Keep Booking
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 size={15} className="animate-spin" /> Cancelling...</> : 'Yes, Cancel'}
        </button>
      </div>
    </div>
  </div>
);

const BookingCard = ({ booking, index, onCancel }) => {
  const status = booking.bookingStatus || 'RESERVED';
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.RESERVED;
  const StatusIcon = cfg.icon;
  const nights = Math.max(1, dayjs(booking.checkOutDate).diff(dayjs(booking.checkInDate), 'day'));
  const imgUrl = booking.hotel?.photos?.[0] || HOTEL_IMAGES[index % HOTEL_IMAGES.length];

  const handleDownload = () => {
    const content = `
StayWave - BOOKING CONFIRMATION
================================
Booking ID:    #${booking.id}
Status:        ${cfg.label}
Hotel:         ${booking.hotel?.name || 'N/A'}
City:          ${booking.hotel?.city || 'N/A'}
Room Type:     ${booking.room?.type || 'N/A'}
Check-in:      ${dayjs(booking.checkInDate).format('DD MMM YYYY')}
Check-out:     ${dayjs(booking.checkOutDate).format('DD MMM YYYY')}
Duration:      ${nights} night${nights > 1 ? 's' : ''}
Rooms Booked:  ${booking.roomsCount}
--------------------------------
Amount:        Rs. ${booking.amount ? Number(booking.amount).toLocaleString('en-IN') : 'N/A'}
Taxes (18%):   Rs. ${booking.amount ? Math.round(Number(booking.amount) * 0.18).toLocaleString('en-IN') : 'N/A'}
================================
Thank you for choosing StayWave!
    `.trim();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StayWave-Booking-${booking.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fadeIn" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="flex flex-col sm:flex-row">
        {/* Hotel image */}
        <div className="sm:w-48 h-36 sm:h-auto shrink-0 overflow-hidden">
          <img
            src={imgUrl}
            alt={booking.hotel?.name || 'Hotel'}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = HOTEL_IMAGES[0]; }}
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-5">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Booking #{booking.id}</p>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">
                {booking.hotel?.name || 'Hotel Booking'}
              </h3>
              {booking.hotel?.city && (
                <p className="text-sm text-gray-500 mt-0.5">{booking.hotel.city}</p>
              )}
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.color}`}>
              <StatusIcon size={12} /> {cfg.label}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-0.5"><CalendarDays size={10} /> Check-in</p>
              <p className="font-semibold text-gray-900 text-sm">{dayjs(booking.checkInDate).format('DD MMM YY')}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-0.5"><CalendarDays size={10} /> Check-out</p>
              <p className="font-semibold text-gray-900 text-sm">{dayjs(booking.checkOutDate).format('DD MMM YY')}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-0.5"><BedDouble size={10} /> Rooms</p>
              <p className="font-semibold text-gray-900 text-sm">{booking.roomsCount}r · {nights}n</p>
            </div>
            <div className="bg-sky-50 rounded-xl p-3">
              <p className="text-xs text-sky-400 mb-0.5">Total</p>
              <p className="font-bold text-sky-700 text-sm">&#8377;{booking.amount ? Number(booking.amount).toLocaleString('en-IN') : 'N/A'}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {status === 'CONFIRMED' && (
              <>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 cursor-pointer transition-colors"
                >
                  <Download size={13} /> Download Receipt
                </button>
                <button
                  type="button"
                  onClick={() => onCancel(booking)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer transition-colors"
                >
                  <X size={13} /> Cancel Booking
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState('');

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/users/myBookings');
      setBookings(response.data || []);
    } catch (err) {
      setError('Failed to load bookings.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancelConfirm = async () => {
    if (!cancelTarget) return;
    setCancelLoading(true);
    setCancelError('');
    try {
      await axiosInstance.delete(`/bookings/${cancelTarget.id}`);
      setBookings(prev => prev.map(b => b.id === cancelTarget.id ? { ...b, bookingStatus: 'CANCELLED' } : b));
      setCancelTarget(null);
    } catch (err) {
      setCancelError(err?.response?.data?.error?.message || 'Failed to cancel booking. Please try again.');
    } finally {
      setCancelLoading(false);
    }
  };

  const confirmedCount = bookings.filter(b => b.bookingStatus === 'CONFIRMED').length;
  const totalNights = bookings
    .filter(b => b.bookingStatus === 'CONFIRMED')
    .reduce((sum, b) => sum + Math.max(1, dayjs(b.checkOutDate).diff(dayjs(b.checkInDate), 'day')), 0);
  const totalSpent = bookings
    .filter(b => b.bookingStatus === 'CONFIRMED')
    .reduce((sum, b) => sum + (Number(b.amount) || 0), 0);

  return (
    <div className="page-enter min-h-screen bg-gray-50">
      {/* Profile hero */}
      <div className="relative py-12 px-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c2340, #0e4f8a, #1e7fb5)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute bottom-0 left-20 w-60 h-60 rounded-full bg-white" />
        </div>
        <div className="container mx-auto relative">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-extrabold text-white border-2 border-white/30 shadow-xl">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-extrabold">{user?.name}</h1>
              <div className="flex items-center gap-1.5 mt-1 text-white/70 text-sm">
                <Mail size={13} /> {user?.email}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg">
            {[
              { icon: BedDouble, label: 'Bookings', value: confirmedCount },
              { icon: CalendarDays, label: 'Nights', value: totalNights },
              { icon: IndianRupee, label: 'Spent', value: `₹${(totalSpent/1000).toFixed(0)}k` },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <s.icon size={18} className="text-white/70 mx-auto mb-1" />
                <div className="text-xl font-extrabold text-white">{s.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {[
              { key: 'bookings', label: 'My Bookings', icon: BedDouble },
              { key: 'profile', label: 'Profile Info', icon: User2 },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'border-sky-700 text-sky-700'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-200'
                }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'bookings' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Your Bookings
                {bookings.length > 0 && <span className="ml-2 text-sm font-normal text-gray-400">({bookings.length})</span>}
              </h2>
            </div>

            {cancelError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-sm">{cancelError}</div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-sm">{error}</div>
            )}

            {isLoading ? (
              <div className="space-y-4">
                {[1,2].map(i => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse flex">
                    <div className="w-48 h-36 bg-gray-200 shrink-0" />
                    <div className="flex-1 p-5 space-y-3">
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                      <div className="h-5 w-48 bg-gray-200 rounded" />
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {[1,2,3,4].map(j => <div key={j} className="h-14 bg-gray-200 rounded-xl" />)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 rounded-3xl bg-sky-50 flex items-center justify-center mx-auto mb-5">
                  <BedDouble size={36} className="text-sky-400" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-500 mb-6">Start exploring and make your first booking!</p>
                <Link to="/search" className="inline-block bg-sky-700 hover:bg-sky-800 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-colors">
                  Browse Hotels
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b, i) => (
                  <BookingCard key={b.id} booking={b} index={i} onCancel={setCancelTarget} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-lg">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Full Name</label>
                  <p className="mt-1 font-bold text-gray-900 text-lg">{user?.name || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email Address</label>
                  <p className="mt-1 font-semibold text-gray-900">{user?.email || '—'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Account Type</label>
                  <p className="mt-1 font-semibold text-gray-900 capitalize">{user?.role?.toLowerCase() || 'Guest'}</p>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sky-700 font-semibold text-sm mb-1">
                  <Star size={14} className="fill-sky-600" /> Member since
                </div>
                <p className="text-sky-600 text-sm">StayWave Beta Member</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {cancelTarget && (
        <CancelModal
          booking={cancelTarget}
          onConfirm={handleCancelConfirm}
          onClose={() => { setCancelTarget(null); setCancelError(''); }}
          loading={cancelLoading}
        />
      )}
    </div>
  );
};

export default ProfilePage;



