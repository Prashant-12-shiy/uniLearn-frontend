"use client"
import React, {useState} from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Techcontent = ["BCA", "BIT", "BIM", "MCA", "MIT"];
  const businessContent = ["BBS", "BBA", "BIM", "MBA", "MBS", "MIM"];
  return (
    <div className="flex justify-around my-3">
      <Link href="/" className="text-3xl text-white cursor-pointer">
        LOGO
      </Link>

      <button
          onClick={toggleMenu}
          className="block sm:hidden text-white focus:outline-none"
        >
            <Menu />
        </button>

      <div className="flex gap-7 items-center justify-center text-sm max-sm:hidden">
        <Link href="/">Home</Link>

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

        <Link href="#">College</Link>

        <Link href="/university">University</Link>
      </div>

         {/* Mobile Menu */}
         <div
        className={`sm:hidden flex flex-col gap-3 px-5 py-3 absolute z-20 right-0 h-full bg-[#0a0a0a] transition-all duration-500 ease-in-out ${
          isOpen ? "block" : "hidden"
        }`}
        
      >
        <X className="text-end" onClick={() => toggleMenu()}/>

        <div onClick={() => toggleMenu()} className="flex flex-col gap-5">


        <Link href="/">Home</Link>

        {/* Information Technology Dropdown */}
        <div className="flex flex-col" >
          <div className="cursor-pointer">Information Technology</div>
          <div className="pl-3">
            <div className="cursor-pointer">BCA</div>
            <div className="cursor-pointer">MCA</div>
            <div className="cursor-pointer">BIT</div>
            <div className="cursor-pointer">BIM</div>
          </div>
        </div>

        <Link href="#">College</Link>
        <Link href="/university">University</Link>
      </div>
        </div>
    </div>
  );
};

export default Header;
