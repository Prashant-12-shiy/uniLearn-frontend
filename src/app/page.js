"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/HomeComponents/Header";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import FloatingBalls from "../components/HomeComponents/FloatingBalls";
import { features, mission } from "../utils/staticData.js";
import ContactForm from "../components/HomeComponents/ContactForm";
import Footer from "@/components/HomeComponents/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel.js";
import Counter from "@/components/HomeComponents/Couter";


export default function Home() {
  const homeCard = [
    {
      button: "Explore University",
      image: "/assets/university.png",
      border: "#FF4C30",
    },
    {
      button: "Explore Courses",
      image: "/assets/online-learning.png",
      border: "#93E26B",
    },
    {
      button: "Explore Colleges",
      image: "/assets/college.png",
      border: "#856BE2",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <div>
      {/* <Header /> */}

      <div className="flex flex-col justify-center  h-full mt-20 m-auto ">
        <div className="flex justify-around mx-10 max-md:flex-col gap-10 items-center h-full">
          {homeCard.map((card, index) => {
            return (
              <motion.div
                key={index}
                className="w-full h-[300px] rounded-lg flex flex-col items-center justify-center border-4"
                style={{ borderColor: card.border }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ duration: 0.5, delay: index * 0.2 }} // Delayed animations
              >
                <Image src={card.image} alt="Image" width={150} height={150} />
                <motion.div variants={buttonVariants} whileHover="hover">
                  <Button className="text-2xl font-semibold mt-10">
                    {card.button}
                  </Button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        <h2 className="text-center dark:text-white text-black text-5xl mt-14 font-bold">
          Discover Your Path to Success
        </h2>
        <p className="text-center w-[60vw] mx-auto dark:text-gray-600 text-[#888]  mt-2 font-medium">
          Your future starts here! We provide all the resources you need to make
          the right decision for your education and career. Whether you&apos;re
          just starting or looking to upgrade your skills, we&apos;re here to
          help you succeed.
        </p>
      </div>

      <div id="scale-div" className=" mx-20 my-16 mt-24 max-md:mx-10 h-full flex flex-col justify-center">
        <h2 className="text-5xl dark:text-white text-black text-center mb-6 font-semibold">Feature</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-[80vw] m-auto"
        >
          <CarouselContent >
            {features.map((feature, index) => (
              <CarouselItem
                key={index}
                className="px-5 mr-8 max-sm:basis-full md:basis-1/2 lg:basis-1/3 h-[300px] py-2 dark:hover:bg-[#111111] hover:bg-slate-100 dark:bg-[#0a0a0a] bg-white border dark:border-white border-black border-opacity-40 rounded-xl shadow-md cursor-pointer text-black dark:text-white max-md:w-[100px]"
              >
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="text-sm mt-5 text-[#888]">
                  {feature.description}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-black dark:bg-white dark:hover:bg-black dark:text-black dark:hover:text-white" />
          <CarouselNext className="bg-black dark:bg-white dark:hover:bg-black dark:text-black dark:hover:text-white" />
        </Carousel>
      </div>

      <div className="flex justify-evenly gap-10 px-32 h-[90vh] max-md:px-10 m-auto items-center dark:bg-gradient-to-b from-[#0a0a0a] to-[#191919] max-md:flex-col dark:text-white text-black" >
        <div className="grid grid-cols-2 gap-10 *:mb-11 *:pl-8  ">
          <div>
          <Counter endValue={500} suffix="" duration={2} />
            <br /> Daily Visitors
          </div>

          <div>
          <Counter endValue={1000} suffix="" duration={2} /> <br />
            Suscription
          </div>

          <div>
          <Counter endValue={100} suffix="" duration={2} /> <br />
            Courses
          </div>

          <div>
          <Counter endValue={4.5} suffix="" duration={2} /> <br />
          Rating
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold w-[30vw] max-md:w-[70vw] max-sm:m-auto max-sm:text-center">
            The highest quality online courses and Resources Website
          </h2>
          <button className="dark:bg-white bg-[#0a0a0a] text-white font-semibold mt-7 dark:text-black hover:-translate-y-1  max-sm:ml-8 transition-all duration-200 rounded-lg px-6 py-2">
            Learn More
          </button>
        </div>
      </div>

      <hr className="opacity-45 " />

      <div className="flex flex-col justify-center items-center  h-[90vh] dark:bg-gradient-to-b from-[#0a0a0a] via-[#1e1e1e] to-[#0a0a0a] relative overflow-hidden max-sm:h-full max-sm:my-10">
        <FloatingBalls
          color="bg-slate-500"
          size="w-40 h-40"
          top="5%"
          left="0"
          delay={0}
        />
        <FloatingBalls
          color="bg-slate-500"
          size="w-40 h-40"
          top="25%"
          left="70%"
          delay={0}
        />
        <h2 className="text-center dark:text-white text-black text-3xl font-semibold mb-7 ">
          Our Mission
        </h2>

        <div className="flex justify-between items-center gap-5 w-[70%] max-md:w-[90%] max-sm:flex-col">
          {mission.map((missionItem, index) => (
            <div
              key={index}
              className="hover:-translate-y-2 border transition-all duration-300 border-[#888] border-opacity-30 p-4 rounded-sm  dark:bg-gradient-to-b from-[#0a0a0a] to-[#171717] max-md:h-full bg-lime-800 "
            >
              <Image
                src={missionItem.image}
                alt="Image"
                width={70}
                height={70}
              />
              <h3 className="text-xl my-3 font-semibold">
                {missionItem.title}
              </h3>
              <p className="text-sm text-gray-400">{missionItem.content}</p>
            </div>
          ))}
        </div>
      </div>

      <ContactForm />

      <hr className="opacity-45 " />

      {/* <Footer/> */}
    </div>
  );
}
