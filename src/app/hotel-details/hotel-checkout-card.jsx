import React from 'react'
import icons from '@/lib/icons';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const ZapIcon=icons["zap"];
const InfoIcon=icons["info"];



const HotelCheckOutCard = ({rooms,cancellationPolicy}) => {
  const selctedRooom=rooms.find((room)=>room.isSelected);
  return (
   

    <section>
        <div className='px-4 py-4'>
          <h1 className='gap-2 text-2xl font-bold'>₹{selctedRooom.price} <span className='text-muted-foreground text-sm line-through'>₹{selctedRooom.price*1.5}</span></h1>
        </div>

        <div className='px-4 space-y-4'>
          <div className='flex'>
            <span className='flex-1'>Your Savings</span>
            <span className='shrink-0'>₹{selctedRooom.price*0.5}</span>
          </div>

          <div className='flex'>
            <span className='flex-1'>Total Price</span>
            <span className='shrink-0'>₹{selctedRooom.price*1.5}</span>
          </div>

          <button className='bg-brand px-2 py-2 rounded-sm mt-4 cursor-pointer hover:opacity-80 w-full text-white font-bold' >Continue to Book</button>


        </div>

        <div className='mt-4 space-y-4'>
          <div className='flex items-baseline gap-2 px-2 '>
            <span className='fill-red-500 text-red-500 '>{ZapIcon && <ZapIcon size={16}/>}</span>
            <span className='text-muted-foreground'> 1k+ people booked this oyo in the last 6 months</span>
          </div>

        <div className="flex items-center gap-2">
          <HoverCard className="openDelay={0} closeDelay={0}">
            {/* Trigger element */}
            <HoverCardTrigger className="flex items-center gap-2 cursor-pointer">
              <span className="text-muted-foreground">Cancellation Policy</span>
              {InfoIcon && <InfoIcon size={16} />}
            </HoverCardTrigger>

            {/* HoverCard content */}
            <HoverCardContent side="left" align="end" className="w-60 p-4 border border-border shadow-md rounded-lg bg-gray-100 mr-4">
              <h1 className="font-medium mb-2 text-lg">Cancellation Policy</h1>
              <ul className="list-disc pl-4 space-y-1">
                {cancellationPolicy.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </HoverCardContent>
          </HoverCard>
        </div>



        </div>
    </section>
  )
}

export default HotelCheckOutCard