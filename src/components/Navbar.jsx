import React, { useEffect, useRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { DarkModeContext } from "./DarkModeContext";

const Navbar = () => {
  const navbarRef = useRef(null); // Ref for the navbar
  const linksRef = useRef([]); // Array of refs for the links
  const gsapContext = useRef(); // GSAP context for cleanup

  // Dark mode context
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // GSAP animation
    gsapContext.current = gsap.context(() => {
      const tl = gsap.timeline();

      // Navbar animation
      tl.from(navbarRef.current, {
        y: -30,
        duration: 1,
        opacity: 0,
        ease: "power3.out",
      })
        .from(
          linksRef.current,
          {
            y: -20,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );
    });

    // Cleanup GSAP context on unmount
    return () => {
      gsapContext.current.revert();
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={`bg-white p-4 text-black flex flex-col lg:flex-row items-center justify-between relative dark:bg-gray-800 dark:text-white transition-all duration-300 ease-in-out ${
        menuOpen ? "h-auto pb-4" : "h-16"
      }`}
    >
      {/* Menu toggle button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-700 dark:text-gray-200 p-2 focus:outline-none items-start absolute left-4"
        aria-label="Toggle Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Logo */}
      <div className="">
        <Link to="/">
          <h1 className="font-bold text-xl lg:text-2xl hover:cursor-pointer">
            <i className="ri-stock-line"></i> STOCKER
          </h1>
        </Link>
      </div>

      {/* Nav Links */}
      <ul
        className="hidden lg:flex flex-1 justify-center gap-16 text-base lg:text-lg z-50"
        ref={(el) => (linksRef.current = el)}
      >
        {["Dashboard", "Stock Management", "About", "Contact"].map((item, index) => (
          <li key={index}>
            <Link
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className="hover:text-blue-400 dark:hover:text-yellow-400"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle */}
      <button
  onClick={() => setDarkMode(!darkMode)}
  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 text-black shadow-md hover:bg-cyan-300 dark:bg-white dark:hover:bg-yellow-300 absolute right-4 cursor-pointer"
  aria-label="Toggle Dark Mode"
  style={{ pointerEvents: "auto" }}
>
  {darkMode ? (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ) : (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )}
</button>



      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="lg:hidden w-full dark:bg-gray-800 dark:text-white flex flex-col items-center text-base py-4 gap-4">
          {["Dashboard", "Stock Management", "About", "Contact"].map((item, index) => (
            <li key={index}>
              <Link
                to={`/${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-blue-400 dark:hover:text-yellow-400"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
