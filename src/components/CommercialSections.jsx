import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const CommercialSection = () => {
  const [commercials, setCommercials] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    contactInfo: "",
    description: "",
  });

  useEffect(() => {
    fetchCommercials();
  }, []);

  const fetchCommercials = async () => {
    const querySnapshot = await getDocs(collection(firestore, "commercials"));
    const commercialsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp?.toDate().toLocaleString() || "N/A", // Format timestamp
    }));
    setCommercials(commercialsData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(firestore, "businessApplications"), {
      ...formData,
      timestamp: new Date(), // Add timestamp when submitting
    });
    alert("Your business promotion request has been submitted!");
    setFormData({ businessName: "", ownerName: "", contactInfo: "", description: "" });
    setIsModalOpen(false);
  };

  const selectedCommercial = commercials[selectedIndex];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-4xl font-bold text-blue-500 mb-2">Barangay Commercial</h2>
          <p className="text-lg text-gray-700 mb-6">
            Explore the thriving commercial spaces and businesses in Barangay Inayawan.
          </p>
          {selectedCommercial && (
            <div className="relative rounded-xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-2 overflow-hidden">
              <img
                src={selectedCommercial.image}
                alt={selectedCommercial.title}
                className="w-full h-[450px] object-contain opacity-80 transition-opacity duration-500 hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 flex flex-col items-start justify-end text-white p-8">
                <h4 className="text-3xl font-semibold">{selectedCommercial.title}</h4>
                <p className="text-lg max-w-lg leading-relaxed">{selectedCommercial.description}</p>
              </div>
            </div>
          )}
          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition cursor-pointer"
              onClick={() => setIsViewAllOpen(true)}
            >
              📜 View All Commercials
            </button>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              📢 Promote Your Business
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:gap-6">
          {commercials.map((commercial, index) => (
            <div
              key={commercial.id}
              onClick={() => setSelectedIndex(index)}
              className={`cursor-pointer relative rounded-xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-2 overflow-hidden group flex items-center gap-4 bg-white p-4 ${
                selectedIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="w-1/3 h-28 overflow-hidden rounded-lg">
                <img
                  src={commercial.image}
                  alt={commercial.title}
                  className="w-full h-full object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <div className="w-2/3">
                <h4 className="text-xl font-semibold text-gray-800">{commercial.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{commercial.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isViewAllOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-4xl max-h-[80vh] overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📜 All Commercial Businesses</h2>
            <div className="overflow-y-auto max-h-[60vh] pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commercials.map((commercial) => (
                  <div key={commercial.id} className="border p-4 rounded-lg shadow-sm bg-gray-100">
                    <img
                      src={commercial.image}
                      alt={commercial.title}
                      className="w-full h-40 object-contain rounded-md mb-3"
                    />
                    <h4 className="text-xl font-semibold">{commercial.title}</h4>
                    <p className="text-sm text-gray-600">{commercial.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                onClick={() => setIsViewAllOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md px-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-lg">
            <h2 className="text-2xl font-bold mb-4">📢 Promote Your Business</h2>
            <form onSubmit={handleSubmit}>
            <label className="block text-lg font-medium text-gray-700">Business Name</label>
              <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
           
            <label className="block text-lg font-medium text-gray-700">Owner Name</label>
              <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
            
            <label className="block text-lg font-medium text-gray-700">Contact Information</label> 
              <input type="text" name="contactInfo" placeholder="Contact Information" value={formData.contactInfo} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
            
            <label className="block text-lg font-medium text-gray-700">Business Description</label>
              <textarea name="description" placeholder="Business Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mb-3" required />
              <div className="flex justify-end gap-4">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommercialSection;
