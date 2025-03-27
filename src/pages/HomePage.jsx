import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Commercial from "../components/CommercialSections";
import Image from "../components/ImageSlider";
import "animate.css";

// Import images
import image1 from "../assets/front-page.png";
import image2 from "../assets/group.jpg";
import image3 from "../assets/group.jpg";
import ambulance from "../assets/ambulance.jpg";
import fire from "../assets/fire.jpg";

// Import Font Awesome icons
import { FaBuilding, FaHeartbeat, FaDumbbell } from "react-icons/fa";

const Home = () => {
  const facilities = [
    {
      icon: <FaBuilding />,
      title: "Barangay Hall",
      description: "The center for barangay operations and services.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Health Center",
      description: "Providing essential healthcare services to residents.",
    },
    {
      icon: <FaDumbbell />,
      title: "Sports Complex",
      description: "A modern facility for sports and community events.",
    },
  ];

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section
        className="home bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen flex items-center justify-start relative text-white py-12 px-6 mt-20"
        id="home"
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative left-30 hero-info text-left z-10 animate__animated animate__slideInLeft">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome To</h1>
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-wider">
            Barangay Inayawan
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed mt-4 max-w-3xl">
            Experience the exhilaration of living in Cebu's most dynamic barangay,
            where the chance to progress together awaits. Renowned as one of Cebu's
            finest barangays, it's a place where responsible citizens thrive.
          </p>

          <Link
            to="/about"
            className="inline-block px-6 py-3 text-lg font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white transition-transform transform hover:scale-105 duration-300 ease-in-out mt-6"
          >
            Learn More
          </Link>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      </section>

      <Commercial />
      <Image />

      {/* Facilities Section */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-4xl font-extrabold text-blue-700 mb-6 animate__animated animate__fadeInDown">
            Barangay Facilities
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 animate__animated animate__fadeInUp">
            Experience the best community facilities, designed to cater to the needs of every resident.
          </p>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="relative p-8 rounded-2xl bg-white bg-opacity-90 shadow-lg backdrop-blur-md 
                hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 
                flex flex-col items-center text-center cursor-pointer animate__animated animate__fadeInUp"
                style={{ animationDelay: `${index * 0.3 + 0.5}s` }}
                onClick={() => setSelectedFacility(facility)}
              >
                {/* Icon Container */}
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full 
                bg-gradient-to-r from-blue-500 to-blue-700 text-white mb-6 shadow-md">
                  <div className="text-5xl">{facility.icon}</div>
                </div>

                {/* Facility Title & Description */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>

                {/* Decorative Glow Effect */}
                <div className="absolute inset-0 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Vehicles Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-blue-600 animate__animated animate__zoomIn animate__delay-1s">
            Barangay Vehicles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: ambulance, title: "Ambulance", description: "Ready for emergency medical services." },
              { img: ambulance, title: "Barangay Patrol", description: "Ensuring safety and security within the barangay." },
              { img: fire, title: "Fire Truck", description: "Equipped to handle fire-related emergencies." },
            ].map((vehicle, index) => (
              <div
                key={index}
                className="vehicle-box p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 animate__animated animate__zoomIn"
                style={{ animationDelay: `${index * 0.5 + 1.5}s` }}
              >
                <img src={vehicle.img} alt={vehicle.title} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-xl font-semibold">{vehicle.title}</h3>
                <p className="text-gray-600">{vehicle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
