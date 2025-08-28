import React from "react";
import LightRays from "./LightRays";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex justify-center items-center bg-black overflow-hidden text-white">
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-[600px] w-full text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Hi, I’m <span style={{ color: "#00ffff" }}>Altamash</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-300">
          Frontend Developer & Designer crafting modern and minimal web
          experiences.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="#projects"
            className="px-5 py-3 rounded-full transition"
            style={{ backgroundColor: "#00ffff", color: "white" }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-5 py-3 border rounded-full transition"
            style={{
              borderColor: "#00ffff",
              color: "#00ffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#00ffff";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#00ffff";
            }}
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
