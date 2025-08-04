import { TRENDING_DESTINATIONS } from '@/config/app.config'
import { getAssestsPath } from '@/lib/utils'
import React from 'react'

const TrendingSection = () => {
  return (
    <div className='container mt-16 pl-16 pr-8'>
      <div className='mb-4 space-y-1'>
        <p className='text-2xl font-bold leading-tight'>Trending Destinations</p>
        <p className='text-muted-foreground'>Most popular choices from travellers of India</p>
      </div>

      <div className='grid grid-cols-6 gap-6'>
      {
        TRENDING_DESTINATIONS.map((destination, index) => (
          <div key={index} className={`h-[270px] rounded-lg overflow-hidden relative z-0 ${destination.className}`}>
            <img src={getAssestsPath(destination.image)} alt={destination.title} />
  
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-purple-900/80 to-transparent z-10" >

              <div className='absolute z-20 text-white  font-bold ml-3 mt-3 '>
                <p >{destination.title}</p>
              </div>
            </div>
           
          </div>
        ))
      }
      </div>

    </div>
  )
}

export default TrendingSection