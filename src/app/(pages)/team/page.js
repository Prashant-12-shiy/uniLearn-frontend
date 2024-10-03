"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";

const Page = () => {
  const teams = [
    {
      name: "John Doe",
      position: "CEO / Developer",
      image: "/assets/dummy-person.jpg",
    },
    {
      name: "John Doe",
      position: "Designer",
      image: "/assets/dummy-person.jpg",
    },
    {
      name: "John Doe",
      position: "R&D",
      image: "/assets/dummy-person.jpg",
    },
    {
      name: "John Doe",
      position: "Project Manager",
      image: "/assets/dummy-person.jpg",
    },
  ];
  //   background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
  return (
    <div className="h-full my-20 flex flex-col items-center justify-center gap-20 text-center  ">
      <h2 className="text-5xl font-semibold dark:text-white text-black">
        Our Team
      </h2>

      <div className="flex flex-wrap justify-center  gap-10">
        {teams.map((team, index) => {
          return (
            <div key={index} className="w-1/4 max-md:w-1/3 max-sm:w-1/2">
              <div className="relative group overflow-hidden">
                <Image
                  src={team.image}
                  alt="person"
                  className="object-contain rounded-lg group-hover:opacity-50"
                  width={300}
                  height={300}
                />
                <Drawer>
                  <DrawerTrigger asChild>
                    <div className=" absolute inset-0 flex items-center justify-center">

                    <Button className=" w-fit  translate-y-[500px] group-hover:translate-y-0 transition-all duration-300 hover:bg-lime-600 hover:scale-110 ">
                      Know More
                    </Button>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="h-[60vh] bg-black bg-opacity-45">
                    <div>
                      <DrawerHeader>
                        <DrawerTitle className="text-5xl max-md:text-2xl text-center">
                          {team.name}
                        </DrawerTitle>
                        <p className="text-center">{team.position}</p>
                      </DrawerHeader>
                      <DrawerClose />

                      <div className="w-[80vw] m-auto max-sm:w-[90vw]">
                        <p className="text-lg tracking-wider leading-8 max-md:text-base  max-md:leading-6 max-sm:text-sm dark:text-white">
                          [CEO Name] is the visionary leader and driving force
                          behind [Company Name]. With over [X years] of
                          experience in the [industry or field], [he/she/they]
                          has consistently demonstrated a commitment to
                          innovation and excellence. Under [CEO Name]’s
                          leadership, [Company Name] has achieved remarkable
                          growth and recognition, establishing itself as a
                          leader in [specific area or market].
                        </p>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
              <h2 className="text-2xl font-semibold mt-5 dark:text-white text-black">
                {team.name}
              </h2>
              <p className="dark:text-white text-black">{team.position}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
