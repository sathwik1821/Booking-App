import React from 'react'

const HeroSection = () => {
  return (
    <section className='relative h-96 w-full'>
        <img src="./assets/hero-image-1440.jpeg" alt="hero image" className='absolute inset-0 w-full h-full object-cover z-0' />

        <div className="absolute z-10 ml-32 mt-5  text-white">
            <p className="text-5xl font-extrabold leading-tight mt-4">Travel has never <br />felt this cosy</p>
            <p className='text-lg mt-4'>Book an entire place for yourself</p>

            <button className='bg-blue-600 px-2 py-2 rounded-sm mt-4 cursor-pointer hover:bg-blue-800' >Discover Holiday Rentals</button>
        </div>


    </section>
  )
}

export default HeroSection