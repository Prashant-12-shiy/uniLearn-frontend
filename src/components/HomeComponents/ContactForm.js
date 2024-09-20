import React from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image';
import { Button } from "@/components/ui/Button";

const ContactForm = () => {

    const {register, handleSubmit} = useForm();

  return (
    <div className='flex justify-evenly items-center h-[90vh]'>
        <div >
            <Image src="/assets/contact.png" alt="Contact Image" width={400} height={400}/>
        </div>

        <div className='w-[30%]'>
            <h2 className='text-3xl font-semibold text-center mb-5'>Contact Us</h2>
            <form className='flex flex-col '>
                <label htmlFor='name'>Name</label>
                <input className='rounded-lg bg-transparent mb-5 focus:bg-[#e8e6e6] focus:ring-black focus:text-black text-white' type='text' {...register('name')} required />

                <label  htmlFor='email'>Email</label>
                <input className='rounded-lg bg-transparent focus:bg-[#e8e6e6] focus:ring-black focus:text-black text-white mb-5' type='email' {...register('email')} required />

                <label htmlFor='message'>Message</label>
                <textarea  className='rounded-lg bg-transparent text-white  focus:bg-[#e8e6e6] resize-none focus:ring-black focus:text-black mb-5' rows={5}  {...register('message')} required />

                <Button className="w-32 bg-gray-800 hover:bg-gray-900">Submit</Button>
            </form>

        </div>
    </div>
  )
}

export default ContactForm