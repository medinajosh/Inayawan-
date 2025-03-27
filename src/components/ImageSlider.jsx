import { useState } from "react";
import image1 from "../assets/front-page.png";
import image2 from "../assets/group.jpg";
import image3 from "../assets/admin.jpg";

const images = [image1, image2, image3];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide images left
  const slideLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Slide images right
  const slideRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-12 bg-white px-6 md:px-16 text-center shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 drop-shadow-lg">
        Discover Barangay Inayawan
      </h2>

      <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto">
        {/* Left Button with More Space */}
        <button
          className="absolute left-[-3rem] md:left-[-4rem] z-10 p-5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          onClick={slideLeft}
        >
          &#9665;
        </button>

        {/* Image Container */}
        <div className="w-full overflow-hidden rounded-xl shadow-lg mx-12">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-100 object-cover transition-transform duration-500 ease-in-out hover:scale-105 rounded-lg"
          />
        </div>

        {/* Right Button with More Space */}
        <button
          className="absolute right-[-3rem] md:right-[-4rem] z-10 p-5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          onClick={slideRight}
        >
          &#9655;
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-4 w-4 mx-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-blue-600 scale-125 shadow-lg" : "bg-gray-400 opacity-70"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}
