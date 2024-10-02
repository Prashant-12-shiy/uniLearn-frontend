"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const UnderConstruction = () => {
  return (
    <div>
      <div className="h-[80vh] flex justify-center gap-10 items-center mt-8 max-md:flex-col-reverse ">
        <div className="max-md:text-center">
          <h2 className="text-7xl font-bold dark:text-white text-black ">
            Opps! <br />
            <span className="text-3xl dark:text-gray-300 text-black">
              Under Construction
            </span>
          </h2>
          <p className="mt-4 text-[#888] ">
            <p>
              We&apos;re sorry, but this page is currently under construction.
              We&apos;ll be back soon!
            </p>
          </p>

          <Link href="/">
            {" "}
            <Button className="mt-6 bg-[#a026a0] hover:bg-[#c341cd]">
              Head Back
            </Button>{" "}
          </Link>
        </div>
        <div>
          <Image
            className="max-md:h-[200px] max-md:w-[200px]"
            src="/assets/underConstruction.png"
            alt="UnderCOnstruction"
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
