import { getAssestsPath } from '@/lib/utils';
import React from 'react'

const AuthLayout = ({children, title, description}) => {
  return (
    <div className='min-h-[calc(100vh-126px)] w-full mt-6 flex justify-center items-center p-6'>
      <div className='
        w-full max-w-md mx-auto rounded-lg shadow-lg border border-gray-200
        p-8 space-y-6
        '>
        
        {/* Logo Section */}
        <div className='flex justify-center'>
          <div className='p-3 rounded-lg bg-gray-50 shadow-sm'>
            <img 
              className="w-10 h-10" 
              src={getAssestsPath("bookingcom-icon-logo.svg")} 
              alt="Booking.com Logo" 
            />
          </div>
        </div>

        {/* Header Section */}
        <div className='text-center space-y-2'>
          <h1 className='font-semibold text-2xl text-gray-900'>
            {title}
          </h1>
          {description && (
            <p className='text-sm text-muted-foreground leading-relaxed'>
              {description}
            </p>
          )}
        </div>

        {/* Content Section */}
        <div className='space-y-4'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;