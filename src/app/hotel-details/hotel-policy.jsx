import React from 'react'

const HotelPolicy = ({hotelPolicy}) => {
  return (
    <section>
      <h1 className='text-xl font-bold'>Hotel Policies</h1>

      <div className='flex mt-4 text-muted-foreground text-lg list-inside'>
        <div className='space-y-6 border-r border-border pr-4'>
          <div className=''>
            <span>Check-In</span>
          </div>
          <div className='border border-border px-2 py-1 relative before:absolute before:content-[""] before:size-4 before:rotate-[44deg]  before:-top-2 before:left-2 before:border-t before:border-l before:bg-background 
          before:border-border'>
              <p>{hotelPolicy.checkIn}</p>
          </div>
        </div>

        <div className='space-y-6 ml-4'>
          <div className=''>
            <span>Check-Out</span>
          </div>
          <div className='border border-border px-2 py-1 relative before:absolute before:content-[""] before:size-4 before:rotate-[44deg]  before:-top-2 before:left-2 before:border-t before:border-l before:bg-background 
          before:border-border'>
              <p>{hotelPolicy.checkout}</p>
          </div>
        </div>

      </div>

      <ul className='mt-6 space-y-4  list-disc'>
        {hotelPolicy.rules.map((rule,index)=>(
          <li key={index} className='text-muted-foreground'>{rule}</li>
        ))}
      </ul>
    </section>

    
  )
}

export default HotelPolicy