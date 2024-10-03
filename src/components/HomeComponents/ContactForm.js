"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image';
import { Button } from "@/components/ui/Button";

const ContactForm = () => {

    const {register, handleSubmit} = useForm();

  return (
    <div className='flex justify-evenly items-center h-full mb-10 max-md:flex-col'>
        <div >
            <Image src="/assets/contact.png" alt="Contact Image" className='max-sm:w-[300px] max-sm:mb-5' width={400} height={400}/>
        </div>

        <div className='w-[30%] max-md:w-[70%]'>
            <h2 className='text-3xl font-semibold text-center mb-5 dark:text-white text-black'>Contact Us</h2>
            <form className='flex flex-col '>
                <label className='dark:text-white text-black' htmlFor='name'>Name</label>
                <input className='rounded-lg bg-transparent mb-5 focus:bg-[#e8e6e6] focus:ring-black focus:text-black text-white' type='text' {...register('name')} required />

                <label className='dark:text-white text-black' htmlFor='email'>Email</label>
                <input className='rounded-lg bg-transparent focus:bg-[#e8e6e6] focus:ring-black focus:text-black text-white mb-5' type='email' {...register('email')} required />

                <label className='dark:text-white text-black' htmlFor='message'>Message</label>
                <textarea  className='rounded-lg bg-transparent text-white  focus:bg-[#e8e6e6] resize-none focus:ring-black focus:text-black mb-5' rows={5}  {...register('message')} required />

                <Button className="w-32 dark:bg-white dark:hover:bg-gray-200 bg-gray-800 hover:bg-gray-900">Submit</Button>
            </form>

        </div>

    </div>
  )
}

export default ContactForm