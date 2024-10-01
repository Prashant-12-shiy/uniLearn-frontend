"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { useGetUniversity } from "@/services/api/universityApi";
import Link from "next/link";
import Image from "next/image";
// import choiceImage from "../../../../public/assets/choice.png";
// import DynamicBreadcrumb from "@/components/breadcrumb";


const UniversityCard = ({ university }) => (
  <div className="bg-gradient-to-b from-[#0a0a0a] to-[#191919] shadow-md text-white shadow-[#494949] p-4 rounded-md">
  <Image
    src={university?.logo ? university.logo : "/assets/choice.png"}
    width={64}
    height={64}
    alt={university?.name || "University logo"}
    className="h-16 w-16 object-contain mx-auto"
  />
    <h3 className="text-lg font-semibold mt-2 text-center">
      {university?.name}
    </h3>
    <p className="text-sm text-gray-600 text-center">
      {university?.location}
    </p>
    <p className="mt-2 text-sm text-gray-500">{university?.description}</p>
    <Link href={`/university/${university._id}`} key={university._id}>
    <Button className="mt-4 bg-[#ededed] hover:bg-[#bfbfbf] text-black px-4 py-2 rounded-md">
      View More
    </Button>
    </Link>
  </div>
);

const UniversityPage = () => {
  const { data: universityData } = useGetUniversity();
  // console.log(universityData);
  // const breadcrumbItems = [
  //   { label: 'Home', link: '/' },
  //   { label: 'University', link: '/university' }
  // ];

  return (
    <div className="university-bg  mb-32 ">
      <h1 className="text-center my-16  text-4xl font-semibold">
        Universities
      </h1>
      <div className="grid grid-cols-2 gap-10 mx-20 max-md:mx-10 max-sm:grid-cols-1">
        {Array.isArray(universityData) && universityData.length > 0 ? (
          universityData.map((university, index) => (
            <UniversityCard key={university._id} university={university} />
          ))
        ) : (
          <p>No university data available.</p> // Optional fallback
        )}
      </div>
    </div>
  );
};

export default UniversityPage;
