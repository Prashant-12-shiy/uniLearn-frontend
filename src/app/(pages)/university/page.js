"use client";
import React from "react";
import { Button } from "@/components/ui/Button";
import { useGetUniversity } from "@/services/api/universityApi";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import choiceImage from "../../../../public/assets/choice.png";
// import DynamicBreadcrumb from "@/components/breadcrumb";

const UniversityCard = ({ university }) => (
  <div className="bg-gradient-to-b from-[#f9f9f9] to-[#e3e3e3] dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#191919] shadow-md dark:text-white  text-white dark:shadow-[#494949] shadow-gray-400 p-4 rounded-md">
    <Image
      src={university?.logo ? university.logo : "/assets/choice.png"}
      width={64}
      height={64}
      alt={university?.name || "University logo"}
      className="h-16 w-16 object-contain mx-auto"
    />
    <h3 className="text-lg font-semibold mt-2 text-center text-black dark:text-white">
      {university?.name}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
      {university?.location}
    </p>
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
      {university?.description}
    </p>

    <Link href={`/university/${university._id}`} key={university._id}>
      <Button className="mt-4 bg-black text-white dark:bg-[#ededed] hover:bg-gray-300 dark:hover:bg-[#bfbfbf] dark:text-black px-4 py-2 rounded-md">
        View More
      </Button>
    </Link>
  </div>
);

const UniversityPage = () => {
  const { data: universityData, isLoading } = useGetUniversity();
  // console.log(universityData);
  // const breadcrumbItems = [
  //   { label: 'Home', link: '/' },
  //   { label: 'University', link: '/university' }
  // ];

  return (
    <div className="dark-university-bg  university-bg  mb-32 ">
      <h1 className="text-center my-16  text-4xl dark:text-white text-black font-semibold">
        Universities
      </h1>
      {isLoading ? (
        <div className="w-full m-auto flex justify-center ">
          <LoaderCircle className="animate-spin w-32 h-32 dark:text-white text-black max-md:w-20 max-md:h-20" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-10 mx-20 max-md:mx-10 max-sm:grid-cols-1">
            {Array.isArray(universityData) && universityData.length > 0 ? (
              universityData.map((university, index) => (
                <UniversityCard key={university._id} university={university} />
              ))
            ) : (
              <p>No university data available.</p> // Optional fallback
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UniversityPage;
