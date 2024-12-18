"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import Image from "next/image";

const Footer = () => {
  const sections = [
    // {
    //   title: "Resources",
    //   items: [
    //     { text: "Docs", link: "#" },
    //     { text: "Learn", link: "#" },
    //     { text: "Blog", link: "#" },
    //     { text: "Review", link: "#" },
    //   ],
    // },
    {
      title: "More",
      items: [
        { text: "GitHub", link: "https://github.com/", target: "_blank" },
        { text: "Facebook", link: "https://facebook.com/", target: "_blank" },
        { text: "Team", link: "/team" },
        { text: "About Us", link: "#" },
      ],
    },
    {
      title: "Links",
      items: [
        { text: "Universities", link: "/university" },
        { text: "College", link: "/college" },
        { text: "Subjects", link: "#" },
        { text: "Notes", link: "#" },
      ],
    },
    {
      title: "Legal",
      items: [{ text: "Privacy Policy", link: "#" }],
    },
  ];

  return (
    <div>
      {/* <hr className="my-4 dark:bg-white bg-black border-black dark:border-white" /> */}
      <div className="flex items-start max-sm:grid max-sm:grid-cols-2 mt-10 max-sm:gap-7 max-sm:pl-9 justify-evenly bg-slate-800 pb-4">
        <>
          <Image
            src="/assets/sky_logo.png"
            alt="learnSpace"
            width={200}
            height={200}
            className="text-white "
          />

        </>

        {sections.map((section, index) => (
          <div key={index} className="mt-10">
            <h2 className="text-lg max-md:text-base mb-3 font-semibold  text-white ">
              {section.title}
            </h2>
            <ul className="*:mb-2 text-sm text-[#c9c7c7]">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  {" "}
                  <Link href={item.link} target={item?.target} scroll={true}>
                    {item.text}{" "}
                  </Link>{" "}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className=" dark:bg-white bg-black border-black dark:border-white border-opacity-40" />

        <div className="bg-slate-800 pt-4 pb-8">


      <div className="w-[60vw] m-auto max-md:w-[90vw]">
        <h4 className="text-2xl text-white  ">
          {" "}
          Support Our Free Educational Resources!
        </h4>

        <p className="text-gray-400 my-3 text-sm">
          We’re committed to providing students with valuable resources like
          notes, past papers, and college recommendations—all for free. If our
          platform has helped you, please consider supporting us with a small
          donation. Your generosity will help keep the website running and free
          for everyone.
        </p>

        <Link href="/donate">
          <Button className="bg-lime-600">Donate</Button>{" "}
        </Link>
      </div>

      <p className="ml-16 text-[#888] text-sm mt-8"> &copy; 2025 learnSpace</p>
    </div>
        </div>
  );
};

export default Footer;
