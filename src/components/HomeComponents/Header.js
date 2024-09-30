import React from "react";
import Link from "next/link";
import DropdownHover from "../ui/DropdownHover";
import { DropdownMenu } from "../ui/DropDown";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/NavMenu.js";

const Header = () => {
  const Techcontent = ["BCA", "BIT", "BIM", "MCA", "MIT"];
  const businessContent = ["BBS", "BBA", "BIM", "MBA", "MBS", "MIM"];
  return (
    <div className="flex justify-around my-3">
      <Link href="/" className="text-3xl text-white cursor-pointer">
        LOGO
      </Link>

      <div className="flex gap-7 items-center justify-center text-sm">
        <Link href="/">Home</Link>
        {/* 
            <DropdownHover name={"Information Tech"} content={Techcontent} />

            <DropdownHover name={"Business"} content={businessContent} /> */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <p className="cursor-pointer">Information Technology</p>
              </NavigationMenuTrigger>

              <NavigationMenuContent className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[200px] bg-[#0a0a0a] text-white  ">
                <div className="cursor-pointer">BCA</div>
                <div className="cursor-pointer">MCA</div>
                <div className="cursor-pointer">BIT</div>
                <div className="cursor-pointer">BIM</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* <DropdownMenu className="w-40 ">
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
            </DropdownMenu> */}

        <Link href="#">College</Link>

        <Link href="/university">University</Link>
      </div>
    </div>
  );
};

export default Header;
