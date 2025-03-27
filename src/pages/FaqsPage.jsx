import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FaqsPage = () => {
  const [faqs, setFAQs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reportData, setReportData] = useState({ name: "", contact: "",issue: "" });

  const fetchFAQs = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'faqs'));
    const faqsData = querySnapshot.docs.map(doc => doc.data());
    setFAQs(faqsData);
    
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'feedbacks'), { feedback, timestamp: serverTimestamp() });
      setFeedback(""); // Clear input field
      setIsModalOpen(false); // Close modal after submission
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  

  const handleReportChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'reports'), { ...reportData, timestamp: serverTimestamp() });
      setReportData({ name: "", contact: "", issue: "" });
      alert("Report submitted successfully");
    } catch (error) {
      console.error("Error submitting report: ", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 mt-30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Find answers to commonly asked questions about Barangay Inayawan.
          </p>

          <div className="space-y-4 mt-10">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="text-gray-600 text-2xl">{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              onClick={() => setIsModalOpen(true)}
            >
              Give Feedback
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-0 z-40" />
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Submit Your Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Feedback</label>
                <textarea
                  rows="4"
                  value={feedback}
                  onChange={handleFeedbackChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your feedback..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     


      {/* Contact Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">📞 Contact Us</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help! Feel free to reach out to us using the contact details below.
          </p>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Phone */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
              <p className="text-gray-700 mt-2">
                <a href="tel:09325173089" className="text-blue-500 hover:text-blue-700 transition duration-300">
                  (032) 517-3089
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="text-gray-700 mt-2">
                <a href="mailto:inayawan2018@gmail.com" className="text-blue-500 hover:text-blue-700 transition duration-300">
                  inayawan2018@gmail.com
                </a>
              </p>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-gray-800">Address</h3>
              <p className="text-gray-700 mt-2">177 F. Jaca St., Cebu City</p>
            </div>

            {/* Operating Hours */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300">
              <div className="text-blue-600 text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-800">Operating Hours</h3>
              <p className="text-gray-700 mt-2">Monday - Friday</p>
              <p className="text-gray-700">8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </section>



      {/* Report Form */}
      <section className="bg-white py-10 px-6 shadow-md rounded-md max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">📋 Report an Issue</h2>
        <form onSubmit={handleReportSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Your Name" value={reportData.name} onChange={handleReportChange} required className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="tel" name="contact" placeholder="Contact Number" value={reportData.contact} onChange={handleReportChange} required className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea name="issue" placeholder="Describe the issue" value={reportData.issue} onChange={handleReportChange} required className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Submit Report</button>
        </form>
      </section>

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default FaqsPage;