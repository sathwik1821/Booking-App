import React from 'react';
import HotelCard from './components/hotel-card';
import HotelCardSkeleton from './components/hotel-card-skeleton';
import { SearchX } from 'lucide-react';

const HotelsList = ({ hotels = [], isLoading, totalResults, currentPage, totalPages, onPageChange }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <HotelCardSkeleton key={i} />)}
      </div>
    );
  }

  if (!hotels.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fadeIn">
        <div className="p-5 rounded-2xl bg-secondary mb-4">
          <SearchX size={40} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-2">No hotels found</h3>
        <p className="text-muted-foreground max-w-sm">
          Try changing your dates, location, or number of rooms. We have thousands of options!
        </p>
      </div>
    );
  }

  return (
    <div>
      {totalResults > 0 && (
        <p className="text-sm text-muted-foreground mb-4">
          <span className="font-semibold text-foreground">{totalResults}</span> properties found
        </p>
      )}
      <div className="space-y-4">
        {hotels.map((hotel, index) => (
          <HotelCard key={hotel.id} {...hotel} index={index} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-secondary transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === i
                    ? 'text-white shadow-sm'
                    : 'border border-border hover:bg-secondary'
                }`}
                style={currentPage === i ? { backgroundColor: 'oklch(0.28 0.18 240)' } : {}}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage >= totalPages - 1}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-secondary transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelsList;

