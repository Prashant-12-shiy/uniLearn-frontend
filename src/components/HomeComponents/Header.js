import React from 'react'
import Link from 'next/link'
import DropdownHover from "../ui/DropdownHover";
import { DropdownMenu } from '../ui/DropDown';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';


const Header = () => {
  const Techcontent = ['BCA', 'BIT', 'BIM', 'MCA', 'MIT'];
  const businessContent = ['BBS', 'BBA', 'BIM', 'MBA', 'MBS', 'MIM'];
  return (
    <div className='flex justify-around my-3'>
        <Link href="/" className='text-3xl text-white cursor-pointer'>LOGO</Link>

        <div className='flex gap-7 items-center justify-center text-sm' >
            <Link href="/">
                Home
            </Link>
{/* 
            <DropdownHover name={"Information Tech"} content={Techcontent} />

            <DropdownHover name={"Business"} content={businessContent} /> */}
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <p className='cursor-pointer'>Information Technology</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-40  rounded-md px-2 py-2 *:mb-2 bg-[#252525] cursor-pointer'>
                <DropdownMenuItem>
                  BCA
                </DropdownMenuItem>
                <DropdownMenuItem>
                  MCA
                </DropdownMenuItem>
                <DropdownMenuItem>
                  BIT
                </DropdownMenuItem>
                <DropdownMenuItem>
                  BIM
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            <DropdownMenu className="w-40 ">
              <DropdownMenuTrigger asChild>
                <p className='cursor-pointer'>Business</p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-40  rounded-md px-2 py-2 *:mb-2 bg-[#252525] cursor-pointer'>
                <DropdownMenuItem>
                  BBA
                </DropdownMenuItem>
                <DropdownMenuItem>
                  BBS
                </DropdownMenuItem>
                <DropdownMenuItem>
                  MBA
                </DropdownMenuItem>
                <DropdownMenuItem>
                  MBS
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="#">
            College
            </Link>

            <Link href="/university">
            University
            </Link>
        </div>
    </div>
  )
}

export default Header