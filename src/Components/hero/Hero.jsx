import React from 'react'
import Hyperspeed from './Hyperspeed';
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className='w-screen h-screen relative bg-black'>
        <div className='absolute inset-0 z-0'>
        <Hyperspeed
  effectOptions={{
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0xFFFFFF,
      brokenLines: 0xFFFFFF,
      leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
      rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
      sticks: 0x03B3C3,
    }
  }}
/></div>
  <section className="relative  text-white min-h-screen flex flex-col justify-center items-center px-6">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 " />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Crafting Digital Experiences
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-8">
          I’m a passionate developer creating sleek, modern, and high-performance websites & apps.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/#projects"
            className="px-6 py-3 rounded-2xl bg-[#63C8FF] hover:text-white text-black  hover:bg-[#2C2C2C] transition"
            aria-label="View my projects"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-2xl border border-gray-500 hover:bg-white hover:text-black transition"
            aria-label="Contact me"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
    </div>
  )
}

export default Hero