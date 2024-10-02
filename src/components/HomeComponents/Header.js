"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronUp,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  University,
  House,
  Laptop,
  School,
  Building2,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/NavMenu.js";
import ThemeSwitcher from "../ThemeSwitcher";

const Header = () => {
  const [isITOpen, setITOpen] = useState(false);
  const [isBusinessOpen, setBusinessOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu

  const toggleITMenu = () => {
    setITOpen(!isITOpen);
  };

  const toggleBusinessMenu = () => {
    setBusinessOpen(!isBusinessOpen);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Techcontent = ["BCA", "BIT", "BIM", "MCA", "MIT"];
  const businessContent = ["BBS", "BBA", "BIM", "MBA", "MBS", "MIM"];
  return (
    <div className="flex justify-around my-3 items-center">
      <Link
        href="/"
        className="text-3xl dark:text-white text-black cursor-pointer "
      >
        LOGO
      </Link>

      <div className="sm:hidden">
        <ThemeSwitcher />
      </div>

      <button
        onClick={toggleMenu}
        className="block sm:hidden dark:text-white text-black focus:outline-none"
      >
        <Menu />
      </button>

      <div className="flex gap-7 items-center justify-center text-sm max-sm:hidden dark:text-white text-black">
        <ThemeSwitcher />
        <Link href="/">Home</Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <p className="cursor-pointer">Information Technology</p>
              </NavigationMenuTrigger>

              <NavigationMenuContent className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[200px] dark:bg-[#0a0a0a] dark:text-white text-black  ">
                <div className="cursor-pointer">BCA</div>
                <div className="cursor-pointer">MCA</div>
                <div className="cursor-pointer">BIT</div>
                <div className="cursor-pointer">BIM</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link href="/college">College</Link>

        <Link href="/university">University</Link>
      </div>

      {/* Mobile Menu */}

      <div
        className={`sm:hidden flex flex-col gap-6 py-4 h-full w-[80vw]  fixed no-scrollbar overflow-auto z-20 top-0 right-0  dark:bg-[#191818] bg-gray-800 shadow-lg transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4 mx-6">
          <X
            className="text-2xl cursor-pointer dark:text-white text-gray-300"
            onClick={() => toggleMenu()}
          />
          <p className="text-lg font-bold dark:text-white text-white">Logo</p>
        </div>

        <div className="flex flex-col gap-5 mx-6">
          <Link
            className="text-lg text-gray-300 dark:text-white h-[50px] place-content-center pl-3 rounded-lg hover:bg-[#212121] hover:text-gray-100 transition-colors flex items-center gap-5 justify-start"
            href="/"
            onClick={() => setIsOpen(false)}
          >
            <House />
            Home
          </Link>

          {/* Information Technology Dropdown */}
          <div className="flex flex-col ">
            <div
              className="text-lgl text-gray-300 dark:text-white h-[50px] place-content-center pl-3 rounded-lg hover:bg-[#212121] cursor-pointer hover:text-gray-100 transition-colors flex justify-start gap-5 items-center"
              onClick={toggleITMenu}
            >
              <Laptop />
              Information Technology
              <span>{isITOpen ? <ChevronUp /> : <ChevronDown />}</span>{" "}
              {/* Collapse/Expand Indicator */}
            </div>

            {isITOpen && (
              <div
                className="pl-4 pt-2 transition-all duration-300 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                {Techcontent.map((course, index) => {
                  return (
                    <div
                      key={index}
                      className=" text-gray-400 dark:text-gray-300 h-[40px] place-content-center pl-3 rounded-lg hover:bg-[#212121] cursor-pointer hover:text-gray-200 transition-colors"
                    >
                      {course}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Business */}
          <div className="flex flex-col ">
            <div
              className="text-lgl text-gray-300 dark:text-white h-[50px] place-content-center pl-3 rounded-lg hover:bg-[#212121] cursor-pointer hover:text-gray-100 transition-colors flex justify-start gap-5 items-center"
              onClick={toggleBusinessMenu}
            >
              <Building2 />
              Business
              <span>
                {isBusinessOpen ? <ChevronUp /> : <ChevronDown />}
              </span>{" "}
              {/* Collapse/Expand Indicator */}
            </div>

            {isBusinessOpen && (
              <div
                className="pl-4 pt-2 transition-all duration-300 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                {businessContent.map((course, index) => (
                  <div
                    key={index}
                    className=" text-gray-400 dark:text-gray-300 h-[40px] place-content-center pl-3 rounded-lg hover:bg-[#212121] cursor-pointer hover:text-gray-200 transition-colors"
                  >
                    {course}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            className="text-lg text-gray-300 dark:text-white  h-[50px] place-content-center pl-3 rounded-lg hover:bg-[#212121]  hover:text-gray-100 transition-colors flex justify-start gap-5 items-center"
            href="/courses"
            onClick={() => setIsOpen(false)}
          >
            <GraduationCap />
            Courses
          </Link>

          <Link
            className="text-lg text-gray-300 dark:text-white  h-[50px] place-content-center pl-3 rounded-lg hover:bg-[#212121]  hover:text-gray-100 transition-colors flex justify-start gap-5 items-center"
            href="/college"
            onClick={() => setIsOpen(false)}
          >
            <School />
            College
          </Link>

          <Link
            className="text-lg text-gray-300 dark:text-white  h-[50px] place-content-center pl-3 rounded-lg hover:bg-[#212121]  hover:text-gray-100 transition-colors flex items-center justify-start gap-5"
            href="/university"
            onClick={() => setIsOpen(false)}
          >
            <University />
            University
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
