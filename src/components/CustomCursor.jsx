// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// const CustomCursor = () => {
//   const cursorRef = useRef(null);

//   useEffect(() => {
//     const cursor = cursorRef.current;
//     const main = document.querySelector("#main");
//     const imageDiv = document.querySelector("#image");

//     // Mouse move animation
//     const handleMouseMove = (e) => {
//       gsap.to(cursor, {
//         x: e.clientX,
//         y: e.clientY,
//         duration: 0.8,
//         ease: "back.out",
//       });
//     };

//     // Mouse enter animation for specific elements
//     const handleMouseEnter = () => {
//       cursor.innerHTML = "View more";
//       gsap.to(cursor, {
//         scale: 3,
//         backgroundColor: "#999",
//       });
//     };

//     // Mouse leave animation for specific elements
//     const handleMouseLeave = () => {
//       cursor.innerHTML = "";
//       gsap.to(cursor, {
//         scale: 1,
//         backgroundColor: "#fff",
//       });
//     };

//     // Add event listeners
//     main.addEventListener("mousemove", handleMouseMove);
//     if (imageDiv) {
//       imageDiv.addEventListener("mouseenter", handleMouseEnter);
//       imageDiv.addEventListener("mouseleave", handleMouseLeave);
//     }

//     // Cleanup event listeners
//     return () => {
//       main.removeEventListener("mousemove", handleMouseMove);
//       if (imageDiv) {
//         imageDiv.removeEventListener("mouseenter", handleMouseEnter);
//         imageDiv.removeEventListener("mouseleave", handleMouseLeave);
//       }
//     };
//   }, []);

//   return <div ref={cursorRef} className="custom-cursor"></div>;
// };

// export default CustomCursor;
