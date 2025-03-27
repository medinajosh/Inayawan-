import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Importing images
import ChairmanImage from '../assets/captain_officials.jpg';
import Comendador from '../assets/comendador.jpg';
import Delfin from '../assets/delfin.jpg';
import Abatayo from '../assets/abatayo.jpg';
import Tabay from '../assets/tibay.jpg';
import Jaca from '../assets/jacajr.jpg';
import Macan from '../assets/macan.jpg';
import Quimada from '../assets/quimada.jpg';
import Bacalso from '../assets/bacalso.jpg';
import Castañares from '../assets/castañares.jpg';

// Officials Data
const officials = [
  { 
    id: 1, 
    name: "JHON. ATTY. KIRK BRYANJACA REPOLLO", 
    position: "Barangay Captain", 
    committee: "Chairman - Committee on Environment",
    image: ChairmanImage,
    quote: "Life is like a wheel, sometimes you’re up and sometimes you’re down but at the end of the day you are happy and successful."
  },
  { 
    id: 2, 
    name: "HON. LOLITO B. COMENDADOR", 
    position: "Barangay Councilor", 
    committee: "Chairman - Committee on Market",
    image: Comendador,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 3, 
    name: "HON. APOLLO G. DELFIN", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Finance",
    image: Delfin,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 4, 
    name: "HON. ARVIN D. ABATAYO", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Social Services",
    image: Abatayo,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 5, 
    name: "HON. RICKY U. TABAY", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Cultural and the Arts",
    image: Tabay,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 6, 
    name: "HON. EMILIO B. JACA JR.", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Health",
    image: Jaca,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 7, 
    name: "HON. JUNEE B. MACAN", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Peace & Order",
    image: Macan,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 8, 
    name: "HON. NICANOR N. QUIMADA", 
    position: "Barangay Councilor", 
    committee: "Chairman-Committee on Intrastructure",
    image: Quimada,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 9, 
    name: "HON. LIZEL N. BACALSO", 
    position: "Barangay Treasurer", 
    image: Bacalso,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 9, 
    name: "HON. CECILIA N. CASTAÑARES", 
    position: "Barangay Secretary", 
    image: Castañares,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
];

const BrgyOfficials = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className={`flex-grow p-6 mt-20 transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">
          Barangay Officials
        </h1>
        <p className="text-gray-700 text-center mb-10 text-lg">
          Meet our Barangay Officials who serve the community.
        </p>

        {/* Barangay Captain - Larger Image */}
        <div className="max-w-4xl mx-auto mb-10">
          {officials.filter((official) => official.position === "Barangay Captain").map((captain) => (
            <div 
              key={captain.id} 
              className="bg-white shadow-xl rounded-xl p-8 text-center border-t-8 border-blue-600 transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={captain.image}
                alt={captain.name}
                className="w-60 h-60 object-cover rounded-full mx-auto border-4 border-blue-600 shadow-md transition-transform duration-500 hover:scale-110"
              />
              <h2 className="text-3xl font-bold text-blue-700 mt-6">{captain.name}</h2>
              <p className="text-xl font-semibold text-gray-700">{captain.position}</p>
              <p className="text-md font-medium text-gray-600">{captain.committee}</p>
              <p className="mt-4 italic text-lg px-6 text-gray-600">"{captain.quote}"</p>
            </div>
          ))}
        </div>

        {/* Other Officials Gallery - Larger Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {officials
            .filter((official) => official.position !== "Barangay Captain")
            .map((official) => (
              <div key={official.id} className="bg-white shadow-lg rounded-lg p-5 text-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                <img
                  src={official.image}
                  alt={official.name}
                  className="w-80 h-100 object-cover rounded-md shadow-md transition-transform duration-500 hover:scale-110"
                />
                <h2 className="text-lg font-bold text-blue-700 mt-4">{official.name}</h2>
                <p className="text-gray-700 font-medium">{official.position}</p>
                <p className="text-sm font-medium text-gray-600">{official.committee}</p>
                <p className="mt-2 italic text-gray-500">"{official.quote}"</p>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrgyOfficials;
