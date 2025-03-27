import React, { useState } from "react";
import { Link } from "react-router-dom"; 

// Import images
import abanganImage from "../assets/captain_officials.jpg";
import official2Image from "../assets/abapo.jpg";
import official3Image from "../assets/broke.jpg";

// Official data
const officials = [
  {
    name: "HON. ATTY. KIRK BRYAN JACA REPOLLO",
    role: "Barangay Captain",
    quote:
      "Life is like a wheel, sometimes you’re up and sometimes you’re down but at the end of the day you are happy and successful.",
    img: abanganImage, // Imported image
  },
  {
    name: "Hon. Ram Badana",
    role: "SK Councilor - Chairman, Committee on Market",
    quote:
      "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them.",
    img: official2Image, // Imported image
  },
  {
    name: "Hon. Official 3",
    role: "SK Councilor - Chairman, Committee on Health",
    quote: "Leadership is not about being in charge. It is about taking care of those in your charge.",
    img: official3Image, // Imported image
  },
  // Add more officials as needed
];

const OfficialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next official
  const nextOfficial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % officials.length);
  };

  // Previous official
  const prevOfficial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? officials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
          Our Barangay Officials
        </h2>

        {/* Officials Carousel */}
        <div className="flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevOfficial}
            className="text-gray-600 hover:text-blue-600 text-3xl px-4"
          >
            ❮
          </button>

          {/* Current Official Display */}
          <div className="flex overflow-hidden w-full justify-center gap-8">
            {/* Loop to show 3 officials */}
            {officials.slice(currentIndex, currentIndex + 3).map((official, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center w-80 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-60 h-60 mx-auto rounded-full overflow-hidden border-4 border-blue-400 mb-4">
                  <img
                    src={official.img}
                    alt={official.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Background changed to a lighter blue */}
                <div className="bg-blue-400 text-white px-4 py-2 rounded-t-xl">
                  <h3 className="text-xl font-semibold">{official.name}</h3>
                  <p className="text-sm">{official.role}</p>
                </div>
                <p className="text-gray-600 text-sm mt-2 italic">
                  "{official.quote}"
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextOfficial}
            className="text-gray-600 hover:text-blue-600 text-3xl px-4"
          >
            ❯
          </button>
        </div>

        {/* See More Button */}
        <div className="mt-6">
       
          <Link to="/brgy-officials">
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
              See More
            </button>
          </Link>
        </div>
        </div>
    </section>
  );
};

export default OfficialsSection;