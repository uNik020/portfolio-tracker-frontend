import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const words = ["portfolio tracking", "stock analysis", "real-time updates"];
    const timeline = gsap.timeline({ repeat: -1 });

    words.forEach((word, index) => {
      timeline.to(
        textRef.current,
        {
          textContent: word,
          duration: 1.5,
          ease: "power1.inOut",
          delay: index === 0 ? 0 : 0.5,
        },
        "+=0.5"
      );
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] min-h-screen bg-gradient-to-r from-sky-300 to-indigo-400 dark:from-gray-700 dark:to-gray-900 rounded-2xl">
      {/* Content Container */}
      <div className="text-center p-4 w-full max-w-7xl">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black dark:text-white">
          MANAGE YOUR <span className="text-yellow-300">STOCKS</span> EFFICIENTLY
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-lg md:text-2xl lg:text-3xl font-medium text-yellow-950 dark:text-white">
          Your one-stop platform for{" "}
          <span
            ref={textRef}
            className="text-yellow-400 font-bold hover:text-black dark:hover:text-white"
          >
            portfolio tracking
          </span>
          .
        </p>

        {/* Call to Action */}
        <div className="mt-8">
          <Link to="/stock-management">
            <button className="bg-yellow-400 text-blue-900 px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-500">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
