import React from 'react';
import { CalendarDays, Users, Loader2, Lock, LogIn, Sparkles, CheckCircle2 } from 'lucide-react';
import dayjs from 'dayjs';

const HotelCheckOutCard = ({ hotel, selectedRoom, checkin, checkout, rooms, onBook, bookingLoading, isAuthenticated }) => {
  const nights = (checkin && checkout)
    ? Math.max(1, dayjs(checkout).diff(dayjs(checkin), 'day'))
    : 1;

  const pricePerNight = selectedRoom?.price ?? 0;
  const subtotal = pricePerNight * nights * rooms;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onBook(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-xl p-6 space-y-5">
      <div>
        <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Selected Room</p>
        <h3 className="font-bold text-lg text-gray-900">{selectedRoom ? selectedRoom.type : '— Select a room'}</h3>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary rounded-xl p-3">
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <CalendarDays size={11} />Check-in
          </p>
          <p className="font-semibold text-sm">{checkin ? dayjs(checkin).format('DD MMM YYYY') : '—'}</p>
        </div>
        <div className="bg-secondary rounded-xl p-3">
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <CalendarDays size={11} />Check-out
          </p>
          <p className="font-semibold text-sm">{checkout ? dayjs(checkout).format('DD MMM YYYY') : '—'}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-secondary rounded-xl p-3">
        <Users size={14} className="text-muted-foreground" />
        <p className="text-sm font-medium">{rooms} room{rooms > 1 ? 's' : ''} &middot; {nights} night{nights > 1 ? 's' : ''}</p>
      </div>

      {/* Price breakdown */}
      {selectedRoom && (
        <div className="space-y-2 text-sm pt-2">
          <div className="flex justify-between text-muted-foreground">
            <span>&#8377;{Math.round(pricePerNight).toLocaleString('en-IN')} &times; {nights} night{nights > 1 ? 's' : ''} &times; {rooms} room{rooms > 1 ? 's' : ''}</span>
            <span>&#8377;{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Taxes &amp; fees (18% GST)</span>
            <span>&#8377;{taxes.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-border text-gray-900">
            <span>Total Amount</span>
            <span>&#8377;{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Book button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleClick}
          disabled={(!selectedRoom && isAuthenticated) || bookingLoading}
          className="w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:opacity-90 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #0e4f8a, #0284c7)' }}
        >
          {bookingLoading ? (
            <><Loader2 size={16} className="animate-spin" /> Confirming Booking...</>
          ) : !isAuthenticated ? (
            <><LogIn size={16} /> Sign in to Book</>
          ) : !selectedRoom ? (
            'Select a room to continue'
          ) : (
            <><Sparkles size={16} /> Book Now &mdash; &#8377;{total.toLocaleString('en-IN')}</>
          )}
        </button>
      </div>

      {/* What happens next */}
      {isAuthenticated && selectedRoom && !bookingLoading && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-3 space-y-1.5">
          <p className="text-xs font-semibold text-green-800 flex items-center gap-1.5">
            <CheckCircle2 size={13} /> What happens when you book:
          </p>
          <ul className="text-xs text-green-700 space-y-1 pl-5 list-disc">
            <li>Room inventory is locked instantly</li>
            <li>Booking appears in your profile</li>
            <li>Confirmation shown immediately</li>
          </ul>
        </div>
      )}

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock size={11} />
        Secure reservation &middot; Instant confirmation
      </div>
    </div>
  );
};

export default HotelCheckOutCard;


