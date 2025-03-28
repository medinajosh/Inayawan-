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
  

  


  const [showAllServices, setShowAllServices] = useState(false); // Track if all services should be shown

  const services = [
    {
      title: "Request Certificates",
      description: "Easily request barangay certificates online.",
      instructions:
        "To request a certificate, fill out the application form, upload required documents, and submit your request for processing.",
      component: <RequestCertificate closeModal={() => setIsModalOpen(false)} />,
    },
    {
      title: "Business Permits",
      description: "Apply for and renew business permits online.",
      instructions:
        "To apply for a business permit, complete the form, attach necessary documents, and wait for verification before approval.",
      component: <BusinessPermit closeModal={() => setIsModalOpen(false)} />,
    },
    {
      title: "Building Permits",
      description: "Apply a business permit",
      instructions:
        "Fill in your details, state your request, and submit it for review by the community service team.",
      component: <BuildingPermit closeModal={() => setIsModalOpen(false)} />,
    },
    {
      title: "Health Services",
      description: "Get healthcare services and assistance online.",
      instructions:
        "Fill out the health request form, attach any required medical documents, and submit for review.",
      component: <BusinessPermit closeModal={() => setIsModalOpen(false)} />,
    },
    {
      title: "Education Services",
      description: "Access online education-related services.",
      instructions:
        "Submit a request for educational assistance, attach necessary documents, and await verification.",
      component: <BusinessPermit closeModal={() => setIsModalOpen(false)} />,
    },
    {
      title: "Senior Citizens Services",
      description: "Get support for senior citizens' needs online.",
      instructions:
        "Submit a request for senior citizen support, including any documents for eligibility verification.",
      component: <BusinessPermit closeModal={() => setIsModalOpen(false)} />,
    },
  ];

  const toggleModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(!isModalOpen);
  };

  const toggleInfoModal = (service) => {
    setSelectedService(service);
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  //show confirmation
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleRequestSubmit = () => {
    setIsModalOpen(false); // Close the form modal
    setIsConfirmationModalOpen(true); // Show confirmation modal
  };

 

  const handleSeeMoreClick = () => {
    setShowAllServices(true); // Show all services
  };

  const handleShowLessClick = () => {
    setShowAllServices(false); // Show only first 3 services
  };

  const servicesToDisplay = showAllServices ? services : services.slice(0, 3); // Show only first 3 or all based on state

  return (
    <div className="bg-gray-100">
      <Header />

      {/* Services Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 mt-30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
            Online Services
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            We provide a variety of online services to make it easier for
            residents to access government services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {servicesToDisplay.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {/* Folder Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-14 h-14 text-blue-600 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" />
                  </svg>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <button
                  onClick={() => toggleInfoModal(service)}
                  className="text-blue-600 hover:underline"
                >
                  Learn More
                </button>
                <button
                  onClick={() => toggleModal(service)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Apply!
                </button>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          <div className="flex justify-center mt-8">
            {!showAllServices ? (
              <button
                onClick={handleSeeMoreClick}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                See More
              </button>
            ) : (
              <button
                onClick={handleShowLessClick}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Apply Form Modal */}
      {isModalOpen && selectedService && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-0 z-40" />
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
            {/* Here, we are embedding the selected service component inside the modal */}
            {selectedService.component}
          </div>
        </div>
      )}

      {/* Learn More Info Modal */}
      {isInfoModalOpen && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 z-40" />
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h2 className="text-xl font-bold mb-4">{selectedService.title}</h2>
            <p className="text-gray-700 mb-4">{selectedService.instructions}</p>
            <button
              className="mt-4 w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              onClick={() => setIsInfoModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

        {isConfirmationModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50 z-40" />
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50 text-center">
              <h2 className="text-xl font-bold text-green-600">Request Sent!</h2>
              <p className="text-gray-700 mt-2">Your request has been successfully submitted.</p>
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setIsConfirmationModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}



       

      <Footer />
    </div>
  );
};

export default ServicesPage;
