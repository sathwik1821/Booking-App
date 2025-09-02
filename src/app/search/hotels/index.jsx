import React from 'react'
import HotelCard from './components/hotel-card'
import HotelCardSkeleton from './components/hotel-card-skeleton'

const Hotels = ({isLoading, data, error}) => {
  if(isLoading) {
    return (
      <div className="space-y-4">
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
        <HotelCardSkeleton />
      </div>
    );
  }

  if(error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading hotels: {error.message || 'Something went wrong'}</p>
      </div>
    );
  }

  if(!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No hotels found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
}

export default Hotels