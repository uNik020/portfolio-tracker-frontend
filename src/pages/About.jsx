import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const About = () => {
  const sectionsRef = useRef([]); // Array of refs for the sections
  const gsapContext = useRef(); // GSAP context for cleanup

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin
  
    gsapContext.current = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power4.out" } });
  
      // Debug: Log sectionsRef to ensure all sections are assigned correctly
      console.log("Registered Sections:", sectionsRef.current);
  
      sectionsRef.current.forEach((section, index) => {
        if (section) { // Check if the section exists
          const direction = Math.random() > 0.5 ? 1 : -1; // Randomize the direction (left or right)
  
          tl.from(section, {
            opacity: 0,
            x: direction * 100,
            scrollTrigger: {
              trigger: section,
              start: "top 100%", // Adjust these values as needed
              end: "bottom 10%",
              scrub: true,
            },
          });
        } else {
          console.warn(`Section at index ${index} is not defined.`);
        }
      });
    });
  
    return () => {
      gsapContext.current.revert(); // Cleanup GSAP context on unmount
    };
  }, []);
  

  return (
    <div className="p-8 rounded-xl min-h-screen bg-gradient-to-r from-sky-300 to-indigo-400 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-cyan-600 dark:text-yellow-400">
          About the Application
        </h1>

        {/* Overview Section */}
        <section ref={(el) => (sectionsRef.current[0] = el)} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            <i className="ri-gallery-view-2"></i> Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This application allows users to manage and track stock data in real time. Users can
            add, update, delete, and view their stock portfolio, while leveraging live stock prices
            fetched from the Alpha Vantage API. Built with <span className="font-bold">React</span>
            for the frontend and <span className="font-bold">Spring Boot</span> for the backend, the app ensures a
            seamless user experience with dynamic updates and robust functionality.
          </p>
        </section>

        {/* Tech Stack Section */}
        <section ref={(el) => (sectionsRef.current[1] = el)} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            <i className="ri-stack-line"></i> Tech Stack
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><span className="font-semibold">Frontend:</span> React, Tailwind CSS</li>
            <li><span className="font-semibold">Backend:</span> Spring Boot, Java</li>
            <li><span className="font-semibold">Database:</span> MySQL</li>
            <li><span className="font-semibold">API:</span> Alpha Vantage (for real-time stock data)</li>
            <li><span className="font-semibold">Tools:</span> Eclipse IDE, Visual Studio Code</li>
          </ul>
        </section>

        {/* Features Section */}
        <section ref={(el) => (sectionsRef.current[2] = el)} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            <i className="ri-list-check"></i> Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Add, update, and delete stock details.</li>
            <li>Display real-time stock prices using the Alpha Vantage API.</li>
            <li>Calculate total portfolio value dynamically.</li>
            <li>Responsive UI designed with Tailwind CSS.</li>
          </ul>
        </section>

         {/* Key Methods Section */}
         <section ref={(el) => (sectionsRef.current[3] = el)} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"><i className="ri-pushpin-line"></i> Important Methods</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><span className="font-semibold">Frontend:</span> Axios for API integration, React hooks for state management.</li>
            <li><span className="font-semibold">Backend:</span> 
              <ul className="list-inside pl-4">
                <li><code>fetchRealTimePrice(String ticker):</code> Fetches real-time stock prices from Alpha Vantage API.</li>
                <li><code>CRUD endpoints:</code> Add, update, delete, and retrieve stock data.</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Database Section */}
        <section ref={(el) => (sectionsRef.current[4] = el)} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"><i className="ri-database-2-line"></i> Database</h2>
          <p className="text-gray-700 dark:text-gray-300">
            The application uses <span className="font-bold">MySQL</span> to store stock details, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><span className="font-semibold">Stock Table:</span> Stores stock name, ticker, quantity, buy price, and ID.</li>
            <li><span className="font-semibold">User Table:</span> (Optional) For multi-user functionality in future versions.</li>
          </ul>
        </section>

        {/* API Section */}
        <section ref={(el) => (sectionsRef.current[5] = el)} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"><i className="ri-code-box-line"></i> API</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><span className="font-semibold">Alpha Vantage:</span> Provides real-time stock price data.</li>
            <li><span className="font-semibold">Endpoints Used:</span> 
              <ul className="list-inside pl-4">
                <li><code>GLOBAL_QUOTE:</code> Fetches live stock prices using ticker symbols.</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Extensions Section */}
        <section ref={(el) => (sectionsRef.current[6] = el)} className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"><i className="ri-attachment-fill"></i> Extensions</h2>
          <p className="text-gray-700 dark:text-gray-200 mb-2">
            The app uses the following libraries and extensions:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><span className="font-semibold">Axios:</span> For API requests in the frontend.</li>
            <li><span className="font-semibold">RestTemplate:</span> For API requests in the backend.</li>
            <li><span className="font-semibold">Tailwind CSS:</span> For responsive and modern UI design.</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Built with ❤️ by NIKHIL.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
