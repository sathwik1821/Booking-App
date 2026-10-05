import React from 'react';

const HotelCardSkeleton = () => (
  <div className="bg-card rounded-2xl overflow-hidden border border-border flex flex-col sm:flex-row animate-pulse">
    <div className="sm:w-72 h-52 sm:h-auto shrink-0 skeleton-shimmer" />
    <div className="flex-1 p-5 space-y-3">
      <div className="h-3 w-24 skeleton-shimmer rounded" />
      <div className="h-5 w-3/4 skeleton-shimmer rounded" />
      <div className="h-4 w-1/2 skeleton-shimmer rounded" />
      <div className="flex gap-2 mt-3">
        {[1,2,3].map(i => <div key={i} className="h-6 w-16 skeleton-shimmer rounded-md" />)}
      </div>
      <div className="pt-4 border-t border-border flex justify-between items-end">
        <div className="space-y-1.5">
          <div className="h-3 w-16 skeleton-shimmer rounded" />
          <div className="h-7 w-28 skeleton-shimmer rounded" />
        </div>
        <div className="h-10 w-28 skeleton-shimmer rounded-xl" />
      </div>
    </div>
  </div>
);

export default HotelCardSkeleton;
