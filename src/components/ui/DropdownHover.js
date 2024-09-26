"use client";
import React, { useEffect } from "react";
import useFlowbite from "@/hooks/flowbite";
import Link from "next/link";

const DropdownHover = ({ name, content }) => {
  // useEffect(() => {
  //   // Make sure Flowbite's dropdown JavaScript is initialized
  //   if (typeof window !== "undefined") {
  //     import("flowbite");
  //   }
  // }, []);
  useFlowbite();

  return (
    <div>
      <p
        id={`${name}-dropdownHoverButton`} // Unique ID for each dropdown
        data-dropdown-toggle={`${name}-dropdownHover`}
        data-dropdown-trigger="hover"
        className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
        type="button"
      >
        {name}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </p>

      <div
        id={`${name}-dropdownHover`}
        className="z-10 hidden bg-black divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-white dark:text-black"
          aria-labelledby="dropdownHoverButton"
        >
          {content.map((content, index) => (
            <li key={index}>
              <Link
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-700 dark:hover:bg-gray-400 dark:hover:text-black"
              >
                {content}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownHover;
