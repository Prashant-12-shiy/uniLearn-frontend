"use client"
import React from 'react'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'

const Page = () => {
  return (
    <div>
    <div className="h-screen  flex justify-center gap-10 items-center mt-8 max-md:flex-col-reverse mx-10">
      <div className="max-md:text-center">
        <h2 className="text-5xl max-md:text-2xl font-bold dark:text-white text-black ">
        Why We Need Your Help
        <br />
          {/* <span className="text-2xl dark:text-gray-300 text-black">
            
          </span> */}
        </h2>
        <p className='mt-8 max-md:text-sm w-[50vw] max-md:w-full dark:text-white text-black'>
        Running and maintaining this platform comes with costs, including hosting, development , and content creation.  To keep this site free and ensure we can continue improving and expanding, we rely on the generosity of people like you.
          </p>
        <p className="mt-8 dark:text-[#888]  text-gray-600">
          Help us grow and keep this resource available to all. Thank you for your support!
        </p>

       <Dialog>
        <DialogTrigger>
        <Button className="mt-6 font-semibold bg-[#30ac38] hover:bg-[#42d553] hover:scale-110 transition-all duration-200 ease-in-out">
            Donate Now
          </Button>{" "}
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Payment Information</DialogTitle>
          <DialogDescription></DialogDescription>
          <p> Esewa: 9874502136</p>
          <div>
          <p>Scanner</p>
          <Image src="/assets/scan.jpg" alt='scanner' width={300} height={300}/>
          </div>
        </DialogContent>
       </Dialog>
        
        
      </div>
      <div>
        <Image
          className="max-md:h-[230px] max-md:w-[230px]"
          src="/assets/donate.png"
          alt="UnderCOnstruction"
          height={400}
          width={400}
        />
      </div>
    </div>
  </div>
  )
}

export default Page