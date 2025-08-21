import React from 'react'
import ICONS from '@/lib/icons'
import { HOTEL_INFO } from './hotel-details-dummy-data';

const StarIcon = ICONS['star'];
const GemIcon = ICONS['gem'];
const CurveIcon = ICONS['curve'];
const HeartIcon=ICONS['heart'];
const CheckIcon=ICONS['check'];

const HotelMetaDetails = ({hotel}) => {
  return (
    < div>
        <section className='flex'>
            <div className='flex-1 space-y-1'>
                <h1 className="text-2xl font-bold" >{hotel.name}</h1>
                <p className='text-muted-foreground' >{`${hotel.contactInfo?.address},${hotel.city}`}</p>
            </div>
            <div className='shrink-0 space-y-1'>
                <div className='flex items-center gap-2  bg-brand px-6 py-2 rounded-sm'>
                    <span className='text-white text-bold'>4.8</span>
                    {StarIcon && <StarIcon size={18}  className="text-white fill-current "/>}
                </div>
                <div className='bg-secondary rounded-b-sm px-2 py-2 flex items-center' >
                    <span className='text-sm'>663 Ratings</span>
                </div>
            </div>
        </section>

        <section>
            <div className='flex items-center gap-4 px-2 py-2 bg-secondary rounded-sm w-fit font-semibold'>
                <span>{GemIcon && <GemIcon size={14}  />}</span>
                <p className='text-sm'>Company-Serviced</p>
            </div>

            <div className='flex gap-4 mt-6'>
                <span className='-mt-1'>{CurveIcon && <CurveIcon size={14}/>}</span>
                <p>5.0 · Check-in rating &gt; Delightful experience</p>
            </div>

            <div className='text-orange-400 mt-4 flex gap-1 items-center  px-1 py-2 bg-secondary border-white rounded-sm'>
                <span>{HeartIcon && <HeartIcon size={14}/>}</span>
                <p className="text-xs">
                    Located Less Than 5 Km From Medanta Hospital | Located 3 Kms From Omaxe Celebration Mall
                </p>
            </div>

        </section>

        <section className='space-y-3 mt-8'>
            <h1 className='font-bold '>Amenities</h1>
            <ul className='flex flex-wrap'>
                {
                    hotel.amenities.map((item,index)=>(
                        <div className='flex items-center min-w-[160px] gap-3'> 
                            <span>{CheckIcon && <CheckIcon size={18}/>}</span>
                            <li className='text-muted-foreground text-sm' key={index}>{item}</li>
                        </div>
                    ))
                }
            </ul>
        </section>

        <section className='mt-8 space-y-1'>
            <h1 className='font-bold'>About this property</h1>
            <p className='text-sm text-muted-foreground'>{HOTEL_INFO.description}</p>
        </section>
    </div>
  )
}

export default HotelMetaDetails