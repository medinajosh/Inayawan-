import React from "react";
import Header from "../components/Header"; // Adjust path if needed
import Footer from "../components/Footer"; // Adjust path if needed
import OfficialsSection from "../components/OfficialsSection"; // Import carousel component
import overView from "../assets/admin.jpg"; // Image import
import Milestone from "./Milestone";
import SKOfficials from "./SkOfficials";



const AboutPage = () => {
  return (
    <div className="bg-gray-100">
      <Header /> {/* Header Component */}

      {/* Barangay Overview Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
          {/* Left side: Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold text-blue-700 mb-6">Barangay Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Barangay Inayawan is located in the heart of Cebu City, known for its rich cultural heritage
              and vibrant community. It has a history of responsible governance and continuous development.
              The residents of Barangay Inayawan are known for their strong sense of community and their
              dedication to making their barangay a better place for everyone.
            </p>
          </div>

          {/* Right side: Image */}
          <div className="lg:w-1/2">
            <img
              src={overView}
              alt="Barangay Overview"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Officials Section - Carousel */}
      <OfficialsSection />


      {/* Milestone Section  */} 
      <Milestone/>

      
      

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default AboutPage;
