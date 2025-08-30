import React from 'react'
import LocationSelect from './location-select'
import DateSelect from './date-select'
import OccupancySelect from './occupancy-select'
import { useForm } from 'react-hook-form'
import {useFormField,
        Form,
        FormItem,
        FormLabel,
        FormControl,
        FormDescription,
        FormMessage,
        FormField,} from '@/components/ui/form'
import { Input } from '@/components/ui/input'


const Search = () => {

    const form=useForm();

    const onSubmit=(data)=>{
        console.log("Go the data",data);
    }

    return (
        <section  className='max-w-6xl mx-auto px-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-1 p-1 bg-yellow-500  items-center rounded-lg h-16'>
                    <LocationSelect form={form}/>
                    <DateSelect form={form}/>
                    <OccupancySelect form={form}/>
                    <button className='bg-brand text-white hover:opacity-90 font-medium px-6 h-full cursor-pointer text-l rounded-lg'>Search</button>
                </form>
            </Form>
        </section>

        
    )
}

export default Search