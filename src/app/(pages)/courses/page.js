"use client";
import React from "react";
import UnderConstruction from "@/components/UnderConstruction"; // Keep if needed, otherwise remove
import {
  Cpu,
  Briefcase,
  Megaphone,
  DollarSign,
  Heart,
  PenTool,
  BookOpen,
  Drill,
  Music,
  Globe,
  User,
  FlaskConical,
  Gavel,
  Brain,
} from "lucide-react";
import Link from "next/link";

const Page = () => {
  const courseCategories = [
    { name: "Information Technology", icon: <Cpu />, bgColor: "bg-[#66B2FF]" }, // Light Blue
    { name: "Business", icon: <Briefcase />, bgColor: "bg-[#8FD6A5]" }, // Light Green
    { name: "Marketing", icon: <Megaphone />, bgColor: "bg-[#FFE09D]" }, // Light Yellow
    { name: "Finance", icon: <DollarSign />, bgColor: "bg-[#66C8D2]" }, // Light Teal
    { name: "Health & Wellness", icon: <Heart />, bgColor: "bg-[#F8B2B8]" }, // Light Red
    { name: "Design", icon: <PenTool />, bgColor: "bg-[#D3A6E0]" }, // Light Purple
    { name: "Education", icon: <BookOpen />, bgColor: "bg-[#A67BFF]" }, // Light Indigo
    { name: "Engineering", icon: <Drill />, bgColor: "bg-[#F2A6B7]" }, // Light Pink
    { name: "Art & Music", icon: <Music />, bgColor: "bg-[#FECBAA]" }, // Light Orange
    { name: "Languages", icon: <Globe />, bgColor: "bg-[#99E3D8]" }, // Light Mint
    { name: "Personal Development", icon: <User />, bgColor: "bg-[#B2B2B2]" }, // Light Gray
    { name: "Science", icon: <FlaskConical />, bgColor: "bg-[#A0D5E6]" }, // Light Blue
    { name: "Law", icon: <Gavel />, bgColor: "bg-[#C1C1C1]" }, // Light Gray
    { name: "Psychology", icon: <Brain />, bgColor: "bg-[#FFC3C3]" }, // Light Red
  ];

  const formatCourseName = (name) => {
    const decodedString = decodeURIComponent(name);
    // Replace '&' with 'and' or remove it
    const formattedString = decodedString
      .trim()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-")
      .toLowerCase();
    return encodeURIComponent(formattedString);
  };

  return (
    <div className="mx-10">
      <h2 className="text-center text-4xl font-semibold mb-5 max-md:text-2xl max-sm:text-xl dark:text-white text-black">
        Categories
      </h2>

      <div className="grid grid-cols-4 gap-5 max-md:grid-cols-3 max-sm:grid-cols-2">
        {courseCategories.map((course, index) => {
          return (
            <Link
              href={`/courses/${formatCourseName(course.name)}`}
              key={index}
            >
              <div className="flex flex-col h-[200px] max-md:h-[150px] rounded-lg cursor-pointer hover:scale-105 transition-all mt-3 duration-300 ease-in-out relative group overflow-hidden">
                <div
                  className={`h-[150px] max-md:h-[115px] flex justify-center items-center rounded-t-lg ${course.bgColor} group-hover:bg-opacity-70  `}
                >
                  <p className="*:text-black *:w-14 *:h-14 "> {course.icon} </p>
                </div>
                <div className="justify-center text-lg font-semibold max-md:text-base max-sm:text-xs text-black flex items-center bg-gray-300 rounded-b-lg h-[50px]">
                  {course.name}
                </div>
                <div className=" absolute inset-1 mb-4 flex items-center justify-center">
                  <p className=" w-fit font-semibold  -translate-x-[500px] group-hover:translate-x-0 transition-all duration-300 text-xl ">
                    0 Course
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
