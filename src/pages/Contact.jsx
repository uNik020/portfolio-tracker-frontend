import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const gsapContext = useRef(); // GSAP context for cleanup
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    if (!isValidEmail(formData.email)) {
      setStatus({ success: false, message: "Please enter a valid email address." });
      return;
    }

    if (
      !process.env.REACT_APP_EMAILJS_SERVICE_ID ||
      !process.env.REACT_APP_EMAILJS_TEMPLATE_ID ||
      !process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    ) {
      console.error("Missing EmailJS environment variables!");
      setStatus({ success: false, message: "Configuration error. Please contact support." });
      return;
    }

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus({ success: true, message: "Message sent successfully!" });
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus({
            success: false,
            message: "Failed to send the message. Please try again later.",
          });
        }
      );
  };
  

  useEffect(() => {
    // GSAP animation logic that runs when the component is mounted
    gsapContext.current = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline.from(".contact-form-container", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power4.out",
      });

      timeline.from(".contact-form-title", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power4.out",
        delay: 0.3,
      });

      timeline.from(".contact-form-description", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power4.out",
        delay: 0.5,
      });

      timeline.from(".contact-form-input", {
        opacity: 0,
        x: -100,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.8,
      });

      timeline.from(".contact-form-button", {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "bounce.out",
        delay: 1,
      });
    });

    // Cleanup GSAP context on unmount
    return () => {
      gsapContext.current.revert();
    };
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen rounded-lg bg-gradient-to-r from-sky-300 to-indigo-400 dark:from-gray-700 dark:to-gray-900">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-600 dark:to-gray-500 contact-form-container">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center contact-form-title dark:text-yellow-400">Contact Us</h1>
        <p className="text-gray-700 mb-6 contact-form-description dark:text-white">
          Have questions or feedback? Fill out the form below and we’ll get back to you shortly!
        </p>

        {status && (
          <div
            className={`p-4 rounded mb-6 ${
              status.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 contact-form-input"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 contact-form-input"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-white">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 contact-form-input"
              placeholder="Subject"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 contact-form-input"
              placeholder="Write your message here"
              rows="5"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-cyan-400 text-black dark:bg-yellow-400 px-4 py-2 rounded shadow hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 contact-form-button"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
