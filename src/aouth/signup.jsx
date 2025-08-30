import React from 'react'
import { Button } from '@/components/ui/button';
import { useFormField,
          Form,
          FormItem,
          FormLabel,
          FormControl,
          FormDescription,
          FormMessage,
          FormField, } from "@/components/ui/form"

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { email } from 'zod';

const SignUp=() => {

  const form=useForm({
    defaultValues:{
      name:'',
      email:'',
      password:'',
    }
  });

  const onSubmit=(data)=>{
    console.log("Got the data",data);
  }

  return (
    <>
    <Form {...form} >
      <form className='space-y-2' onSubmit={form.handleSubmit(onSubmit)}>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input autoComplete="username"  {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input autoComplete="email" type={"email"}  {...field} />
            </FormControl>
          </FormItem>
        )}
      />



      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type={"password"} autoComplete="new-password" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <button type="submit" className="bg-brand w-full cursor-pointer hover:opacity-90 px-2 py-2 rounded-sm text-white text-lg font-medium">Create New Account</button>
      <div className='space-x-2'>
        <span className='text-muted-foreground'>Already have an Account?</span>
        <a className='hover:underline text-blue-600 font-medium' href="#"> Sign in</a>
      </div>
      </form>
    </Form>
    </>
  )
}

export default SignUp