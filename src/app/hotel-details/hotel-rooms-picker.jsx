import React from 'react'
import icons from '@/lib/icons'
import { Button } from '@/components/ui/button';


const StarIcon=icons["star"];
const CircleCheckIcon=icons["circleCheck"];
const CheckIcon=icons["check"];

//component for each room
const Room=({id,type,photos,amenities,price,isSelected})=>{
    return (
          <div className='border border-border p-4 rounded-sm space-y-2'>

            {isSelected && (
              <div className='flex bg-brand items-center gap-2 px-4 py-1 rounded-t-lg text-white '>
                <div>
                  {StarIcon && <StarIcon size={14} className='fill-amber-500 stroke-transparent'/>}
                </div>
                <h3 className='font-bold text-xs'>SELECTED CATEGORY</h3>
              </div>
            )}

            <div>
              <div className='flex '>
                <div className='flex-1 space-y-2 '>
                  <div className='text-lg font-semibold flex gap-4 items-center'>
                    {type}
                    {isSelected && <span className='fill-green-600 '>{CircleCheckIcon && <CircleCheckIcon size={18}/>}</span>}
                  </div>
                  <div>
                  <ul className='flex flex-wrap'>
                  {
                    amenities.map((item,index)=>(
                      <div className='flex items-center min-w-[160px] gap-3'> 
                          <span>{CheckIcon && <CheckIcon size={18}/>}</span>
                          <li className='text-muted-foreground text-sm' key={index}>{item}</li>
                      </div>
                    ))
                  }
                </ul>
                  </div>
                </div>

                <div className='shrink-0'>
                  <img src={photos[0]} alt={id} className='w-[120px] h-[100px] mr-6  rounded-sm' />
                </div>
              </div>          
            </div>

            <div className='flex mt-5'>
                <div className='flex-1'>
                  <h3 className='gap-2'>₹{price} <span className='text-muted-foreground text-sm line-through'>₹{price*1.5}</span></h3>
                </div>
                <div className='shrink-0'>
                  {isSelected && <Button variant="outline" disabled={isSelected} className='flex items-center gap-2  py-1 rounded-sm bg-secondary cursor-pointer w-[180px] font-semibold disabled:opacity-80'>
                    <span className='fill-green-600 '>{CircleCheckIcon && <CircleCheckIcon size={18}/>}</span>
                    SELECTED
                    </Button>}

                    {!isSelected && <button  variant="outline"  className='text-red-400 py-1 rounded-sm bg-secondary cursor-pointer w-[180px] font-semibold hover:opacity-80'>
                    SELECT
                    </button>}
                </div>
            </div>

          </div>
        
    )
};

const HotelRoomsPicker = ({rooms}) => {
  return (
    <section className='space-y-4'>
      <h2 className='text-xl font-bold'>Choose your room</h2>
      <div className='space-y-4'>
        {rooms.map((room)=>(

          <Room {...room} key={room.id}/>
        )
        )}
      </div>
    </section>
  )
};

export default HotelRoomsPicker;