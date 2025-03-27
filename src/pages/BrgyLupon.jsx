import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Importing images
import ChairmanImage from '../assets/captain_officials.jpg';
import Abapo from '../assets/abapo.jpg';
import Castanares from '../assets/secretary.jpg';
import Abangan from '../assets/abangan-lupon.jpg';
import Abella from '../assets/abella-lupon.jpg';
import Angcos from '../assets/angcos-lupon.jpg';
import Bacalso from '../assets/bacalso-lupon.jpg';
import BacalsoG from '../assets/bacalsoGirl-lupon.jpg';
import Calibo from '../assets/calibo-lupon.jpg';
import Casta from '../assets/castañares-lupon.jpg';
import Cayron from '../assets/cayron-lupon.jpg';
import DelRosario from '../assets/rosario-lupon.jpg';
import Delfin from '../assets/delfin-lupon.jpg';
import Jaca from '../assets/jaca-lupon.jpg';
import JacaG from '../assets/jacaGirl-lupon.jpg';
import Llanto from '../assets/llanto-lupon.jpg';
import Ocampo from '../assets/ocampo-lupon.jpg';
import OcarizaE from '../assets/ocarizaEDWIN-lupon.jpg';
import OcarizaM from '../assets/ocarizaMARIO-lupon.jpg';
import Manatad from '../assets/manatad-lupon.jpg';
import Rama from '../assets/rama-lupon.jpg';
import OcampoG from '../assets/ocampoGirl-lupon.jpg';
import Ranara from '../assets/ranara-lupon.jpg';







// Officials Data
const officials = [
  { 
    id: 1, 
    name: "JHON. ATTY. KIRK BRYANJACA REPOLLO", 
    position: "Barangay Captain", 
    image: ChairmanImage,
    quote: "Life is like a wheel, sometimes you’re up and sometimes you’re down but at the end of the day you are happy and successful."
  },
  { 
    id: 2, 
    name: "HON. MANUEL R. ABAPO", 
    position: "Lupon President", 
    image: Abapo,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 3, 
    name: "HON. CECILIA N. CASTAÑARES", 
    position: "Secretary", 
    image: Castanares,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 4, 
    name: "HON. JOSELITO ABANGAN", 
    position: "Barangay Lupon", 
    image: Abangan,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 5, 
    name: "HON. SANCHO J. ABELLA", 
    position: "Barangay Lupon", 
    image: Abella,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 6, 
    name: "HON. RENANTE J. ANGCOS", 
    position: "Barangay Lupon", 
    image: Angcos,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 7, 
    name: "HON. BEN ALFREDO C. BACALSO", 
    position: "Barangay Lupon", 
    image: Bacalso,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 8, 
    name: "HON. JOSEPHINE M. BACALSO", 
    position: "Barangay Lupon", 
    image: BacalsoG,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 9, 
    name: "HON. NESTOR J. CALIBO", 
    position: "Barangay Lupon", 
    image: Calibo,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 10, 
    name: "HON. JOSE ROBERTO A. CASTAÑARES", 
    position: "Barangay Lupon", 
    image: Casta,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 11, 
    name: "HON. GLORIA R. CAYRON", 
    position: "Barangay Lupon", 
    image: Cayron,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 12, 
    name: "HON. JOSE EMELITO DEL ROSARIO", 
    position: "Barangay Lupon", 
    image: DelRosario,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 13, 
    name: "HON. ABRILES G. DELFIN", 
    position: "Barangay Lupon", 
    image: Delfin,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 14, 
    name: "HON. ERMINA N. JACA", 
    position: "Barangay Lupon", 
    image: JacaG,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 15, 
    name: "HON. BERNARDO T. JACA", 
    position: "Barangay Lupon", 
    image: Jaca,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 16, 
    name: "HON. LILIA R. LLANTO", 
    position: "Barangay Lupon", 
    image: Llanto,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 17, 
    name: "HON. TIMOTEO J. OCAMPO", 
    position: "Barangay Lupon", 
    image: Ocampo,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 18, 
    name: "HON. EDWIN N. OCARIZA", 
    position: "Barangay Lupon", 
    image: OcarizaE,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 19, 
    name: "HON. MARIO M. OCARIZA", 
    position: "Barangay Lupon", 
    image: OcarizaM,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 20, 
    name: "HON. GERTRUDES T. MANATAD", 
    position: "Barangay Lupon", 
    image: Manatad,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 21, 
    name: "HON. RONALD RAMON R. RAMA", 
    position: "Barangay Lupon", 
    image: Rama,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 22, 
    name: "HON. EDITHA N. OCAMPO", 
    position: "Barangay Lupon", 
    image: OcampoG,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },
  { 
    id: 23, 
    name: "HON. MELODINA B. RANARA", 
    position: "Barangay Lupon", 
    image: Ranara,
    quote: "Wise leaders generally have wise counselors because it takes a wise person themselves to distinguish them"
  },

];

const BrgyLupon = () => {
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
                className="w-80 h-80 object-cover rounded-full mx-auto border-4 border-blue-600 shadow-md transition-transform duration-500 hover:scale-110"
              />
              <h2 className="text-3xl font-bold text-blue-700 mt-6">{captain.name}</h2>
              <p className="text-xl font-semibold text-gray-700">{captain.position}</p>
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
                  className="w-full h-84 object-cover rounded-md shadow-md transition-transform duration-500 hover:scale-110"
                />
                <h2 className="text-lg font-bold text-blue-700 mt-4">{official.name}</h2>
                <p className="text-gray-700 font-medium">{official.position}</p>
                <p className="mt-2 italic text-gray-500">"{official.quote}"</p>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrgyLupon;
