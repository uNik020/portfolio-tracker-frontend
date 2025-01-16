import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import StockManagement from "./pages/StockManagement";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hero from "./pages/Hero";
import { DarkModeProvider } from "./components/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        {/* Outer container with min-height and responsive padding */}
        <div className="flex flex-col min-h-screen dark:bg-gray-800">
          {/* Navbar should be responsive (already done in Navbar component) */}
          <Navbar />
          {/* Main content area with responsive padding */}
          <main className="flex-grow p-4 sm:p-6 lg:p-8">
            <Routes>
              {/* Define routes for different pages */}
              <Route path="/" element={<Hero />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stock-management" element={<StockManagement />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
