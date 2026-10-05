import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Car, Dumbbell, Waves, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../lib/axios-instance';
import HotelCheckOutCard from './hotel-checkout-card';
import HotelRoomsPicker from './hotel-rooms-picker';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
];

const amenityIconMap = {
  'WiFi': Wifi, 'Wifi': Wifi, 'Free WiFi': Wifi,
  'Restaurant': Coffee, 'Coffee': Coffee, 'Breakfast': Coffee,
  'Parking': Car, 'Free Parking': Car,
  'Gym': Dumbbell, 'Fitness': Dumbbell,
  'Pool': Waves, 'Swimming Pool': Waves,
};

const getAmenityIcon = (amenity) => {
  const key = Object.keys(amenityIconMap).find(k => amenity?.toLowerCase().includes(k.toLowerCase()));
  return key ? amenityIconMap[key] : null;
};

const DetailsSkeleton = () => (
  <div className="min-h-screen">
    <div className="h-80 bg-gray-200 animate-pulse" />
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-200 rounded-xl animate-pulse w-2/3" />
          <div className="h-4 bg-gray-200 rounded-xl animate-pulse w-1/3" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded-xl animate-pulse" />)}
          </div>
        </div>
        <div className="lg:w-80">
          <div className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const HotelDetailsPage = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const checkin  = searchParams.get('checkin')  || new Date().toISOString().slice(0, 10);
  const checkout = searchParams.get('checkout') || new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const rooms    = Number(searchParams.get('rooms') || 1);

  const [hotel, setHotel]           = useState(null);
  const [roomsList, setRoomsList]   = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError]     = useState('');
  const [activePhoto, setActivePhoto]       = useState(0);

  useEffect(() => {
    const fetchHotelInfo = async () => {
      setIsLoading(true);
      try {
        const body = { startDate: checkin, endDate: checkout, roomsCount: rooms };
        const response = await axiosInstance.post(`/hotels/${hotelId}/info`, body);
        const data = response.data?.data || response.data;
        setHotel(data.hotel);
        setRoomsList(data.rooms || []);
      } catch (err) {
        setError('Failed to load hotel details. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelInfo();
  }, [hotelId, checkin, checkout, rooms]);

  const handleBook = async (useStripe = false) => {
    if (!isAuthenticated) {
      navigate(`/signin?next=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }
    if (!selectedRoom) return;

    setBookingLoading(true);
    setBookingError('');
    try {
      // Step 1: Init booking
      const initResponse = await axiosInstance.post('/bookings/init', {
        hotelId: Number(hotelId),
        roomId: selectedRoom.id,
        checkInDate: checkin,
        checkOutDate: checkout,
        roomsCount: rooms,
      });
      const rawInit = initResponse.data?.data || initResponse.data;
      const bookingId = rawInit?.id;

      if (!bookingId) {
        throw new Error('Failed to create booking - no booking ID returned');
      }

      if (useStripe) {
        // Open stripe in new tab so Chrome doesnt crash
        try {
          const paymentResponse = await axiosInstance.post(`/bookings/${bookingId}/payments`);
          const rawPayment = paymentResponse.data?.data || paymentResponse.data;
          const sessionUrl = rawPayment?.sessionUrl || rawPayment;
          if (sessionUrl && typeof sessionUrl === 'string') {
            window.open(sessionUrl, '_blank', 'noopener,noreferrer');
            navigate(`/payments/${bookingId}/status`);
            return;
          }
        } catch (stripeErr) {
          console.error('Stripe redirect failed, falling back to test confirmation', stripeErr);
          // Fall through to instant confirmation
        }
      }

      // Step 2: Confirm booking via test endpoint (no Stripe needed)
      await axiosInstance.post(`/bookings/${bookingId}/confirmTestPayment`);
      navigate(`/payments/${bookingId}/status`);

    } catch (err) {
      console.error('Booking error:', err);
      const msg = err?.response?.data?.error?.message
        || err?.response?.data?.message
        || err?.message
        || 'Booking failed. Please try again.';
      setBookingError(msg);
    } finally {
      setBookingLoading(false);
    }
  };

  if (isLoading) return <DetailsSkeleton />;
  if (error) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-red-600 mb-4">{error}</p>
      <button onClick={() => navigate(-1)} className="text-brand hover:underline cursor-pointer">Go back</button>
    </div>
  );
  if (!hotel) return null;

  const photos = hotel.photos?.length ? hotel.photos : FALLBACK_IMAGES;

  return (
    <div className="page-enter min-h-screen">
      {/* Photo gallery header */}
      <div className="relative h-80 sm:h-[420px] overflow-hidden">
        <img
          src={photos[activePhoto] || FALLBACK_IMAGES[0]}
          alt={hotel.name}
          className="w-full h-full object-cover transition-opacity duration-500"
          onError={e => { e.target.src = FALLBACK_IMAGES[0]; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium hover:bg-white/30 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Photo thumbnails */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
            {photos.slice(0, 5).map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${activePhoto === i ? 'border-white scale-110' : 'border-white/40 opacity-70 hover:opacity-100'}`}
              >
                <img src={p} className="w-full h-full object-cover" onError={e => { e.target.src = FALLBACK_IMAGES[0]; }} />
              </button>
            ))}
          </div>
        )}

        {/* Hotel name overlay */}
        <div className="absolute bottom-16 sm:bottom-8 left-4 sm:left-8 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg">{hotel.name}</h1>
          <p className="flex items-center gap-1 mt-1 text-white/90">
            <MapPin size={14} />
            {hotel.city}
            {hotel.contactInfo?.address && <span> &middot; {hotel.contactInfo.address}</span>}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Rating strip */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
                <Star size={16} className="fill-amber-500 text-amber-500" />
                <span className="font-bold">4.8</span>
                <span className="text-muted-foreground text-sm">(312 reviews)</span>
              </div>
              {hotel.contactInfo?.phoneNumber && (
                <div className="flex items-center gap-1.5 border border-border rounded-xl px-4 py-2 text-sm text-muted-foreground">
                  <Phone size={14} />
                  {hotel.contactInfo.phoneNumber}
                </div>
              )}
              {hotel.contactInfo?.email && (
                <div className="flex items-center gap-1.5 border border-border rounded-xl px-4 py-2 text-sm text-muted-foreground">
                  <Mail size={14} />
                  {hotel.contactInfo.email}
                </div>
              )}
            </div>

            {/* Amenities */}
            {hotel.amenities?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hotel.amenities.map((amenity, i) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <div key={i} className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
                        {Icon ? <Icon size={18} style={{ color: 'oklch(0.28 0.18 240)' }} /> : <span style={{ color: 'oklch(0.28 0.18 240)' }} className="text-sm">✓</span>}
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Booking error */}
            {bookingError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {bookingError}
              </div>
            )}

            {/* Room picker */}
            <HotelRoomsPicker
              rooms={roomsList}
              selectedRoomId={selectedRoom?.id}
              onSelectRoom={setSelectedRoom}
            />
          </div>

          {/* Checkout sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-24">
              <HotelCheckOutCard
                hotel={hotel}
                selectedRoom={selectedRoom}
                checkin={checkin}
                checkout={checkout}
                rooms={rooms}
                onBook={handleBook}
                bookingLoading={bookingLoading}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;

