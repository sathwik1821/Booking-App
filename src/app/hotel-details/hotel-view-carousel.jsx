import React from 'react'
import {Carousel,CarouselContent,CarouselItem,CarouselPrevious,CarouselNext} 
from '@/components/ui/carousel'

 

const HotelViewCarousel = ({images}) => {
  return (
    <section>
        <Carousel className="overflow-hidden rounded-lg" 
        opts = {{
            breakpoints: {
                "(min-width:1024px)": {
                    slidesToScroll: 2
                }
            }
         }}
        >
        

            <CarouselContent className="-ml-0.5">
                {
                    images.map((image,index)=>(
                        <CarouselItem key={index} className="lg:basis-1/2 pl-0.5">
                            <img src={image} alt={`image of index ${index+1}`} className='h-96 w-full object-cover'
                            />
                        </CarouselItem>
                    )
                )
                }
            </CarouselContent>
            <CarouselPrevious className="left-1 shadow-lg"/>
            <CarouselNext className="right-1 shadow-lg"/>
        </Carousel>
    </section>
  )
}

export default HotelViewCarousel