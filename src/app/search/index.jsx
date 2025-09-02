import React from 'react';
import Filter from './filter';
import SortFilter from './filter/components/sort-filter';
import Hotels from './hotels';
import PaginationFilter from './filter/components/pagination-filter';
import useQuery from '@/lib/hooks/useQuery';
import API_CONFIG from '@/config/api.config';

// Set to true for demo mode, false when backend is ready
const USE_MOCK_DATA = true;
const mockApiData = {
  data: {
    content: [
      {
        id: 'hotel-1',
        name: 'The Grand Hyatt',
        city: 'Jaipur',
        photos: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=120&h=100&fit=crop',
        ],
        amenities: ['Free Cancellation', 'Book with ₹0 Payment', 'Free Wi-Fi'],
        price: 15000,
        rating: 4.5,
        reviews: 1248,
      },
      {
        id: 'hotel-2',
        name: 'Rambagh Palace',
        city: 'Jaipur',
        photos: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&h=300&fit=crop',
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=120&h=100&fit=crop',
        ],
        amenities: ['Free Cancellation', 'Breakfast Included', 'Pool'],
        price: 25000,
        rating: 4.8,
        reviews: 892,
      },
      {
        id: 'hotel-3',
        name: 'The Oberoi Rajvilas',
        city: 'Jaipur',
        photos: [
          'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&h=300&fit=crop',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=120&h=100&fit=crop',
        ],
        amenities: ['Free Cancellation', 'Book with ₹0 Payment', 'Spa'],
        price: 35000,
        rating: 4.9,
        reviews: 654,
      },
      {
        id: 'hotel-4',
        name: 'The Leela Palace',
        city: 'Jaipur',
        photos: [
          'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop',
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=120&h=100&fit=crop',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=100&fit=crop',
        ],
        amenities: ['Free Cancellation', 'Breakfast Included', 'Gym'],
        price: 20000,
        rating: 4.6,
        reviews: 1056,
      },
    ],
  },
};

const SearchPage = () => {
  // For demo mode, just use mock data directly
  if (USE_MOCK_DATA) {
    const data = mockApiData;
    const isLoading = false;
    const error = null;
    const hotels = data.data.content; // Direct access since we know the structure
    
    return (
      <div className="container flex gap-4 mt-6 mb-12">
        <Filter />
        <section className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Jaipur: 858 properties found</h1>
            <SortFilter />
          </div>
          <Hotels error={error} isLoading={isLoading} data={hotels} />
          {hotels.length > 0 && <PaginationFilter />}
        </section>
      </div>
    );
  }

  // Real API mode
  const { data, isLoading, error } = useQuery({
    url: API_CONFIG.HOTEL.BROWSE_HOTELS,
    options: {
      params: {
        city: 'Delhi',
        startDate: '2025-03-11',
        endDate: '2025-03-13',
        roomsCount: 2,
        page: 0,
        size: 2,
      },
    },
  });
  
  const hotels = data?.data.content || [];

  return (
    <div className="container flex gap-4 mt-6 mb-12">
      <Filter />
      <section className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Jaipur: 858 properties found</h1>
          <SortFilter />
        </div>
        <Hotels error={error} isLoading={isLoading} data={hotels} />
        {hotels.length > 0 && <PaginationFilter />}
      </section>
    </div>
  );
};

export default SearchPage;