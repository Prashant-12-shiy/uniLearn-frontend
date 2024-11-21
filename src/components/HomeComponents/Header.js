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
  Telescope,
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
import Image from "next/image.js";
import { useGetAllCategories } from "@/services/api/catagoriesApi.js";
import cookies from "js-cookie";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog.js";
import { Button } from "../ui/Button.js";
import { useRouter } from "next/navigation.js";
import { toast } from "react-toastify";

const Header = () => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

  const router = useRouter();
  // Toggle category open/close

  const [isBusinessOpen, setBusinessOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle mobile menu
  const { data: catagoriesData } = useGetAllCategories();
  const role = cookies.get("admin");

  const handleLogout = () => {
    cookies.remove("admin");
    router.push("/");
    toast.success("Logout successfull");
  };

  // console.log(catagoriesData);

  const toggleCategory = (index) => {
    // If the same category is clicked, close it by setting to null; otherwise, open it
    if (openCategoryIndex === index) {
      setOpenCategoryIndex(null); // Close if the same category is clicked again
    } else {
      setOpenCategoryIndex(index); // Open the clicked category
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Techcontent = ["BCA", "BIT", "BIM", "MCA", "MIT"];
  const businessContent = ["BBS", "BBA", "BIM", "MBA", "MBS", "MIM"];
  return (
    <div className="flex justify-around mb-3 items-center">
      <Link
        href="/"
        className="text-3xl dark:text-white text-black cursor-pointer flex items-center justify-center gap-0 "
      >
        <Image
          src="/assets/logo.png"
          alt="learnSpace"
          width={100}
          height={100}
          className="text-white dark:hidden max-md:w-20 max-md:h-20"
        />

        {/* Dark theme logo */}
        <Image
          src="/assets/dark_logo.png"
          alt="learnSpace"
          width={100}
          height={100}
          className="text-white hidden dark:block max-md:w-20 max-md:h-20"
        />
        <p className="text-xs -translate-x-5 pt-2 logo max-md:text-[8px]">
          Learn <br /> Space
        </p>
      </Link>

      <div className="sm:hidden flex items-center">
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

        {catagoriesData?.map((catagory, index) => (
          <NavigationMenu key={index}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <p className="cursor-pointer">{catagory.title}</p>
                </NavigationMenuTrigger>

                <NavigationMenuContent className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[200px] dark:bg-[#0a0a0a] dark:text-white text-black  ">
                  {catagory?.courses.map((course, index) => (
                    <Link href={`/course/${course._id}`} key={index}>
                      <div className="cursor-pointer hover:text-purple-700 ">
                        {course.shortName}
                      </div>
                    </Link>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ))}

        <Link href="/courses">Courses</Link>

        <Link href="/university">University</Link>

        {role && (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Logout</Button>
    </DialogTrigger>
    <DialogContent className=" ">
      <DialogTitle>Are you sure you want to logout?</DialogTitle>
      
      {/* Wrap both buttons inside a single container */}
      <div className="flex justify-between mt-4">
        <DialogClose asChild>
          <Button onClick={() => handleLogout()}>Yes</Button>
        </DialogClose>

        <DialogClose asChild>
          <Button>No</Button>
        </DialogClose>
      </div>
    </DialogContent>
  </Dialog>
)}

       
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

          {/* Dark theme logo */}
          <Image
            src="/assets/dark_logo.png"
            alt="learnSpace"
            width={70}
            height={70}
            className="text-white "
          />
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
          {catagoriesData?.map((catagory, index) => (
            <div key={index} className="flex flex-col ">
              <div
                className="text-lgl text-gray-300 dark:text-white h-[50px] place-content-center pl-3 rounded-lg hover:bg-[#212121] cursor-pointer hover:text-gray-100 transition-colors flex justify-start gap-5 items-center"
                onClick={() => toggleCategory(index)}
              >
                {catagory?.title === "Information Technology" ? (
                  <Laptop />
                ) : catagory?.title === "Science" ? (
                  <Telescope />
                ) : (
                  <Building2 />
                )}

                {catagory?.title}
                <span>
                  {openCategoryIndex === index ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </span>

                {/* Collapse/Expand Indicator */}
              </div>

              {openCategoryIndex === index && (
                <div
                  className="pl-4 pt-2 transition-all duration-300 ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  {catagory?.courses?.map((course, index) => {
                    return (
                      <Link href={`/course/${course._id}`} key={index}>
                        <div className=" text-gray-400 dark:text-gray-300 h-[40px] place-content-center pl-3 rounded-lg hover:bg-[#212121] cursor-pointer hover:text-gray-200 transition-colors">
                          {course.shortName}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

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
