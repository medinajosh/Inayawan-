import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Importing images
import Badana from '../assets/badana.jpg';
import Montalban from '../assets/montalban.jpg';
import Diaz from '../assets/diaz.jpg';
import Monterde from '../assets/monterde.jpg';
import Zapanta from '../assets/zapanta.jpg';
import Berdin from '../assets/berdin.jpg';
import Canoy from '../assets/canoy.jpg';

// SK Chairman Image
import SKChairmanImage from '../assets/abangan.jpg';

// Officials Data
const officials = [
  { 
    id: 1, 
    name: "HON. LOUNETH MARIE B. ABANGAN", 
    position: "SK Chairman", 
    committee: "Chairman - Committee on Youth Development",
    image: SKChairmanImage,
    quote: "Good leaders build products. Great leaders build cultures. Good leaders deliver results. Great leaders develop people. Good leaders have vision. Great leaders have values. Good leaders are role models at work. Great leaders are role models in life."  // ✅ Fixed minor spacing in the quote
  },
  { 
    id: 2, 
    name: "HON. RAM BADANA", 
    position: "SK Councilor", 
    committee: "Chairman-Committee on Market",
    image: Badana,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them."
  },
  { 
    id: 3, 
    name: "HON. RASHID MONTALBAN", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Finance",
    image: Montalban,  // ✅ Fixed missing image reference
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them."
  },
  { 
    id: 4, 
    name: "HON. ABECHAIL JOYCE S. DIAZ", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Social Services",
    image: Diaz,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them."
  },
  { 
    id: 5, 
    name: "HON. DANIELLE THERESE MONTERDE", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Cultural and the Arts",
    image: Monterde,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them."
  },
  { 
    id: 6, 
    name: "HON. JOANA ZAPANTA", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Health",
    image: Zapanta,
    quote: "WWise leaders generally have wise counselors because it takes a wise person themselves to distinguish them."
  },
  { 
    id: 7, 
    name: "HON. HYACINT G. BERDIN", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Peace & Order",
    image: Berdin,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them."
  },
  { 
    id: 8, 
    name: "HON. LOREMAE O. CANOY", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Intrastructure",
    image: Canoy,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them."
  },
];

const SKOfficials = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className={`flex-grow p-6 mt-20 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
          SK Officials
        </h1>
        <p className="text-gray-700 text-center mb-10 text-lg">
          Meet our SK Officials who serve the youth and the community.
        </p>

        {/* SK Chairman - Highlighted Section */}
        <div className="max-w-4xl mx-auto mb-10">
          {officials.filter((official) => official.position === "SK Chairman").map((skChairman) => (
            <div 
              key={skChairman.id} 
              className="bg-white shadow-xl rounded-xl p-8 text-center border-t-8 border-blue-600 transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={skChairman.image}
                alt={skChairman.name}
                className="w-60 h-60 object-cover rounded-full mx-auto border-4 border-blue-600 shadow-md transition-transform duration-500 hover:scale-110"
              />
              <h2 className="text-3xl font-bold text-blue-700 mt-6">{skChairman.name}</h2>
              <p className="text-xl font-semibold text-gray-700">{skChairman.position}</p>
              {skChairman.committee && <p className="text-md font-medium text-gray-600">{skChairman.committee}</p>}
              <p className="mt-4 italic text-lg px-6 text-gray-600">"{skChairman.quote}"</p>
            </div>
          ))}
        </div>

        {/* Other SK Officials Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {officials
            .filter((official) => official.position !== "SK Chairman")
            .map((official) => (
              <div key={official.id} className="bg-white shadow-lg rounded-lg p-5 text-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <img
                  src={official.image}
                  alt={official.name}
                  className="w-80 h-100 object-cover rounded-md shadow-md transition-transform duration-500 hover:scale-110"
                />
                <h2 className="text-lg font-bold text-blue-700 mt-4">{official.name}</h2>
                <p className="text-gray-700 font-medium">{official.position}</p>
                {official.committee && <p className="text-sm font-medium text-gray-600">{official.committee}</p>}
                <p className="mt-2 italic text-gray-500">"{official.quote}"</p>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SKOfficials;
