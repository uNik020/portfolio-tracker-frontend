import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import axios from "axios"; // For making API calls

const Dashboard = () => {
  const dashboardRef = useRef(null); // Ref for the dashboard container
  const sectionRefs = useRef([]); // Array of refs for the sections
  const gsapContext = useRef(); // GSAP context for cleanup

  useEffect(() => {
    // Use gsap.context for React-friendly animations
    gsapContext.current = gsap.context(() => {
      const tl = gsap.timeline();

      // Dashboard container animation
      tl.from(dashboardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.out",
      }).from(
        sectionRefs.current,
        {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.5" // Overlap with the previous animation by 0.5 seconds
      );
    });

    // Cleanup GSAP context on unmount
    return () => {
      gsapContext.current.revert();
    };
  }, []); // Empty dependency array to run only once on mount

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/dashboard"); // backend URL
        setDashboardData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Placeholder values for rendering when the data is not available
  const placeholderData = {
    totalPortfolioValue: 0,
    topPerformingStock: { stockname: "N/A", gain: 0 },
    portfolioDistribution: [],
  };

  // Use placeholder data if no data is fetched or if there is an error
  const { totalPortfolioValue, topPerformingStock, portfolioDistribution } =
    error || isLoading ? placeholderData : dashboardData;

  // Safe check before calling toFixed
  const safeToFixed = (value, decimals = 2) => {
    if (typeof value === "number") {
      return value.toFixed(decimals);
    }
    return "0.00"; // Return a fallback value if value is not a number
  };

  return (
    <div
      ref={dashboardRef}
      className="p-6 z-0 bg-gray-100 rounded-xl bg-gradient-to-r from-sky-300 to-indigo-400 dark:from-zinc-700 dark:to-zinc-900"
    >
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Portfolio Dashboard <i className="ri-funds-line"></i>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div
          ref={(el) => (sectionRefs.current[0] = el)} // Assign ref to first section
          className="section bg-white p-4 rounded shadow dark:bg-slate-300"
        >
          <h3 className="text-xl font-semibold">Total Portfolio Value</h3>
          <p className="text-2xl font-bold text-green-600">
          ${safeToFixed(totalPortfolioValue)}
          </p>
        </div>
        <div
          ref={(el) => (sectionRefs.current[1] = el)} // Assign ref to second section
          className="section bg-white p-4 rounded shadow dark:bg-slate-300"
        >
          <h3 className="text-xl font-semibold">Top-Performing Stock</h3>
          <p className="text-lg font-medium">{topPerformingStock.stockName}</p>
          <p className="text-lg font-medium"> Gain: {safeToFixed(topPerformingStock.gain)}</p>
        </div>
        <div
          ref={(el) => (sectionRefs.current[2] = el)} // Assign ref to third section
          className="section bg-white p-4 rounded shadow dark:bg-slate-300"
        >
          <h3 className="text-xl font-semibold">Portfolio Distribution</h3>
          <ul className="text-lg font-medium">
          {portfolioDistribution.length > 0 ? (
            <ul className="mt-2">
              {portfolioDistribution.map((stock, index) => (
                <li key={index} className="text-md text-gray-800">
                  {stock.stockName}: {safeToFixed(stock.percentage)}%
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-md text-gray-600">No data available</p>
          )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
