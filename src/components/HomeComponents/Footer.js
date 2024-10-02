import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";

const Footer = () => {
  const sections = [
    {
      title: "Resources",
      items: ["Docs", "Learn", "Blog", "Review"],
    },
    {
      title: "More",
      items: ["Github", "Facebook", "Team", "About Us"],
    },
    {
      title: "Links",
      items: ["Universities", "College", "Subjects", "Notes"],
    },
    {
      title: "Legal",
      items: ["Privacy Policy"],
    },
  ];

  return (
    <div>
      <div className="flex items-start max-sm:grid max-sm:grid-cols-2 max-sm:gap-7 max-sm:ml-9 justify-evenly mt-10">
        <h2 className="text-2xl font-semibold dark:text-white text-black">Logo</h2>

        {sections.map((section, index) => (
          <div key={index} className="">
            <h2 className="text-lg mb-3 font-semibold  dark:text-white text-black">{section.title}</h2>
            <ul className="*:mb-2 text-sm text-[#888]">
              {section.items.map((item, idx) => (
                <li key={idx}> <Link href="#">{item} </Link> </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <hr className="my-4"/>

      <div className="w-[60vw] m-auto max-md:w-[90vw]">
        <h4 className="text-2xl dark:text-white text-black "> Support Our Free Educational Resources!</h4> 

        <p className="text-gray-400 my-3">We’re committed to providing students with valuable resources like notes, past papers, and college recommendations—all for free. If our platform has helped you, please consider supporting us with a small donation. Your generosity will help keep the website running and free for everyone.</p>

       <Link href="#"><Button className="bg-lime-600">Donate</Button> </Link>  
      </div>

      <p className="ml-16 text-[#888] text-sm my-8"> &copy; 2025 UniLearn</p>
    </div>
  );
};

export default Footer;
