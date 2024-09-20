import React from "react";

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
      <div className="flex items-start justify-evenly mt-10">
        <h2 className="text-2xl font-semibold">Logo</h2>

        {sections.map((section, index) => (
          <div key={index} className="">
            <h2 className="text-lg mb-3 font-semibold">{section.title}</h2>
            <ul className="*:mb-2 text-sm text-[#888]">
              {section.items.map((item, idx) => (
                <li key={idx}> <a href="#">{item} </a> </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="ml-16 text-[#888] text-sm my-8"> &copy; 2025 UniLearn</p>
    </div>
  );
};

export default Footer;
