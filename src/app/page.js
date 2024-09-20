"use client"
import React, { useState, useEffect } from "react";
import Header from "@/components/HomeComponents/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import FloatingBalls from "../components/HomeComponents/FloatingBalls";
import {features, mission } from "../utils/staticData.js"
import ContactForm from "../components/HomeComponents/ContactForm";
import Footer from "@/components/HomeComponents/Footer";


export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("scale-div");
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the div is in the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div>
      {/* <Header /> */}

      <div className="relative">
        <Image
          className="-z-10 rounded-full ml-[10vw]"
          src="/assets/home_img.jpg"
          alt="home image"
          width={500}
          height={500}
        />
        <div className="h-full m-auto">
          <h1 className="absolute top-1/4 right-20 h-40 text-white flex items-center text-4xl py-6 rounded-xl font-bold">
            Discover Your Path to Success
          </h1>
        </div>
      </div>

      <motion.div
        id="scale-div"
        className="grid grid-cols-3 gap-4 mx-20 my-16 mt-20"
        // initial={{ scale: 50 }}  
        animate={{ scale: isVisible ? 1 : 0.2 }}
        transition={{ duration: 0.7 }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="px-5 h-fit py-2 hover:bg-[#111111] bg-[#0a0a0a] border border-white border-opacity-40 rounded-xl shadow-md cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <p className="text-sm mt-5 text-[#888]">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      <div className="flex justify-evenly gap-10 px-32 h-[90vh] m-auto items-center bg-gradient-to-b from-[#0a0a0a] to-[#191919]">
        <div className="grid grid-cols-2 gap-10 *:mb-11 *:pl-8  ">
          <div>
            <motion.spna className="text-3xl font-semibold"> 50k</motion.spna> <br /> Daily
            Visitors
          </div>

          <div>
            <spna className="text-3xl font-semibold"> 1000</spna> <br />{" "}
            Suscription
          </div>

          <div>
            <spna className="text-3xl font-semibold"> 100</spna> <br /> Our
            Courses
          </div>

          <div>
            <spna className="text-3xl font-semibold"> 4.5 </spna> <br /> Reviews
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold w-[30vw]">
            The highest quality online courses and Resources Website
          </h2>
          <button className="bg-white font-semibold mt-7 text-black hover:-translate-y-1   transition-all duration-200 rounded-lg px-6 py-2">
            Learn More
          </button>
        </div>
      </div>

      <hr className="opacity-45 " />

      <div className="flex flex-col justify-center items-center  h-[90vh] bg-gradient-to-b from-[#0a0a0a] via-[#1e1e1e] to-[#0a0a0a] relative ">
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
        <h2 className="text-center text-3xl font-semibold mb-7 ">
          Our Mission
        </h2>

        <div className="flex justify-between items-center gap-5 w-[70%] ">
          {mission.map((missionItem, index) => (
            <div
              key={index}
              className="hover:-translate-y-2 border transition-all duration-300 border-[#888] border-opacity-30 p-4 rounded-sm  bg-gradient-to-b from-[#0a0a0a] to-[#171717] "
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
