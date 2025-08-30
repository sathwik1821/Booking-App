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
import dayjs from 'dayjs'
import { Calendar } from '@/components/ui/calendar'
const CalendarIcon=icons["calendar"];



  
const DateSelect = ({form}) => {
  return (
    <Popover>
            <FormField
                control={form.control}
                name="bookingDates"
                defaultValue=""
                render={({ field }) => (
                <>
                    <PopoverTrigger asChild>
                        <FormItem className="px-4 py-2 rounded bg-background 
                        min-w-[360px] h-full">
                            <FormControl>
                                <div className="flex items-center h-full gap-2 cursor-pointer">

                                    {CalendarIcon && <CalendarIcon size="24" 
                                    className='text-muted-foreground shrink-0'/>}
                                    
                                    <div className="flex items-center flex-1 gap-1">
                                        <p className="text-sm ">
                                            {field?.value?.from ? dayjs(field.value.from).format("ddd D MMM") : "Check in date"}
                                        </p>

                                        <span aria-hidden>-</span>
                                        <p className="text-sm">
                                            {field?.value?.to ? dayjs(field.value.to).format("ddd D MMM") : "Check out date"}
                                        </p>
                                    </div>
                            </div>
                            </FormControl>
                        </FormItem>
                    </PopoverTrigger>


                    <PopoverContent
                        sideOffset="1"
                        align="start"
                        className="w-[520px]"
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                        <Calendar
                            required
                            mode="range"
                            min={2}
                            selected={field.value}
                            numberOfMonths={2}
                            fromMonth={new Date()}
                            disabled={(date) => dayjs().isAfter(dayjs(date), 'date')}
                            onSelect={(value) => {
                            field.onChange(value);
                            }}
                        />
                        </PopoverContent>
                </>
                )}
                />
        
        
    </Popover>  
  )
}

export default DateSelect