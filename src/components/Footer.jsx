import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 dark:bg-blue-950 dark:text-white">
      <div className="container mx-auto text-center space-y-4">
        {/* App Name and Description */}
        <div>
          <h1 className="text-xl font-semibold">Portfolio Tracker</h1>
          <p className="text-sm sm:text-base text-gray-400">
            Manage your investments effortlessly and track real-time stock data.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.linkedin.com/in/nikhil-s-a13543228"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition duration-200"
            aria-label="LinkedIn"
          >
            <i className="ri-linkedin-line text-2xl"></i>
          </a>
          <a
            href="https://github.com/uNik020"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition duration-200"
            aria-label="GitHub"
          >
            <i className="ri-github-line text-2xl"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition duration-200"
            aria-label="Twitter"
          >
            <i className="ri-twitter-line text-2xl"></i>
          </a>
        </div>

        {/* Your Name */}
        <div>
          <p className="text-sm text-gray-400">
            Developed by <span className="font-semibold text-white">NIKHIL</span>
          </p>
        </div>

        {/* Copyright */}
        <div>
          <p className="text-xs sm:text-sm text-gray-500">
            &copy; 2025 Portfolio Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
