import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,} from '@/components/ui/form'
import icons from '@/lib/icons'
import { Input } from '@/components/ui/input'
import { DESTINATIONS } from '@/config/app.config'


const BedIcon=icons["bed"]
const LocationIcon=icons["location"];
const CrossIcon=icons["close"];



  
const LocationSelect = ({form}) => {

    const[popOverOpen,setPopOverOpen]=useState(false);

    const city=form.watch("city");

    const citySelectHandler = (e, index) => {
        e.preventDefault();
        const selectedDestination = DESTINATIONS[index];
        form.setValue("city", selectedDestination?.city || "");
        setPopOverOpen(false);
    }

    const clearCity = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent triggering the popover
        form.setValue("city", "");
    }
    
  return (
    <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
        <PopoverTrigger className="h-full">
            <div className='flex items-center px-4 py-2 rounded bg-background 
            min-w-[360px] gap-2 h-full'>   

                {BedIcon && <BedIcon className='shrink-0  text-muted-foreground' size={"24"}/>}
                
                <FormField
                control={form.control}
                name="city"
                defaultValue=""
                render={({ field }) => (
                    <FormItem className="w-full h-[31px]">
                        <Input className="w-full h-full px-2 text-sm border-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent placeholder:font-normal placeholder:text-foreground focus:placeholder-muted-foreground"
                        placeholder="Where are you going?" {...field} />
                    </FormItem>
                )}
                />
                {city && CrossIcon && (
                        <CrossIcon 
                            size="24"
                            className="text-muted-foreground cursor-pointer shrink-0 hover:text-foreground transition-colors"
                            onClick={clearCity}
                        />
                )}
                
            </div>
        </PopoverTrigger>
        <PopoverContent sideOffset="1" align='start'  className="w-[420px]" onOpenAutoFocus={(e)=>e.preventDefault()}>
            <div>
                <p className='text-sm font-semibold p-3'>Popular Destination  nearby</p>
            </div>
            <div className='max-h-[300px] overflow-y-auto scrollbar'

            >
                {
                    DESTINATIONS.map((destination,index)=>(
                        <div className='flex items-center px-3 py-2 gap-4 hover:bg-accent cursor-pointer transition-colors duration-200 border-b border-border '
                        onClick={(e) => citySelectHandler(e, index)} key={index }>
                            {LocationIcon && <LocationIcon/>}
                            <div>
                                <p className='text-sm font-semibold'>{destination.city}</p>
                                <p className='text-sm text-muted-foreground'>{destination.country}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default LocationSelect