import React from 'react'
import HotelViewCarousel from './hotel-view-carousel'
import HotelMetaDetails from './hotel-meta-details'
import HotelRoomsPicker from './hotel-rooms-picker'
import HotelPolicy from './hotel-policy'
import HotelCheckOutCard from './hotel-checkout-card'
import { HOTEL_DATA } from './hotel-details-dummy-data'
import { HOTEL_INFO } from './hotel-details-dummy-data'

const hotelData=HOTEL_DATA
const hotelInfo=HOTEL_INFO

const HotelDetails = () => {
  return (
    <div className=" mt-6 mb-12  ml-24 mr-24">
        <HotelViewCarousel images={hotelData.hotel.photos}/>
        <div className='flex gap-6 mt-6'>
            <div className='flex-1 space-y-8'>
                <HotelMetaDetails hotel={hotelData.hotel}/>
                <HotelRoomsPicker rooms={hotelData.rooms}/>
                <HotelPolicy hotelPolicy={hotelInfo.hotelPolicy}/>
            </div>
            <aside className='shrink-0  w-[320px] border border-border shadow-md rounded-lg sticky top-4 h-min px-2 py-2'>
                <HotelCheckOutCard rooms={hotelData.rooms} cancellationPolicy={hotelInfo.cancellationPolicy}/>
            </aside>
        </div>



    </div>
  )
}

export default HotelDetails


