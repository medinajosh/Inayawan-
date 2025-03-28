import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RequestCertificate from "../services/RequestCertificate"; 
import BusinessPermit from "../services/BusinessPermit";
import BuildingPermit from "../services/BuildingPermit"; 

const ServicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  const services = [
    {
      title: "Request Certificates",
      description: "Easily request barangay certificates online.",
      instructions:
        "To request a certificate, fill out the application form, upload required documents, and submit your request for processing.",
      component: <RequestCertificate closeModal={() => handleRequestSubmit()} />,
    },
    {
      title: "Business Permits",
      description: "Apply for and renew business permits online.",
      instructions:
        "To apply for a business permit, complete the form, attach necessary documents, and wait for verification before approval.",
      component: <BusinessPermit closeModal={() => handleRequestSubmit()} />,
    },
    {
      title: "Building Permits",
      description: "Apply for a building permit",
      instructions:
        "Fill in your details, state your request, and submit it for review by the community service team.",
      component: <BuildingPermit closeModal={() => handleRequestSubmit()} />,
    },
  ];

  const toggleModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const toggleInfoModal = (service) => {
    setSelectedService(service);
    setIsInfoModalOpen(true);
  };

  const handleRequestSubmit = () => {
    setIsModalOpen(false);
    setIsConfirmationModalOpen(true);
    setTimeout(() => {
      setIsConfirmationModalOpen(false);
      setIsSuccessModalOpen(true);
    }, 2000);
  };

  const handleSeeMoreClick = () => {
    setShowAllServices(true);
  };

  const handleShowLessClick = () => {
    setShowAllServices(false);
  };

  const servicesToDisplay = showAllServices ? services : services.slice(0, 3);

  return (
    <div className="bg-gray-100">
      <Header />
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 mt-30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Online Services</h2>
          <p className="text-lg text-gray-600 text-center mb-12">We provide a variety of online services to make it easier for residents to access government services.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {servicesToDisplay.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-blue-600 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
                </div>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <button onClick={() => toggleInfoModal(service)} className="text-blue-600 hover:underline">Learn More</button>
                <button onClick={() => toggleModal(service)} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">Apply!</button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            {!showAllServices ? (
              <button onClick={handleSeeMoreClick} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">See More</button>
            ) : (
              <button onClick={handleShowLessClick} className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">Show Less</button>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-40" />
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h2 className="text-xl font-bold mb-4">{selectedService.title}</h2>
            <p className="text-gray-700 mb-4">{selectedService.instructions}</p>
            {selectedService.component}
            <button className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition" onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ServicesPage;
