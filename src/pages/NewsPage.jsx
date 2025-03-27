import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import inayawanFiestaImage from '../assets/news1.jpg';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const NewsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Fetch Announcements from Firestore
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, 'announcements'));
      const announcementsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
    setLoading(false);
  };

  // Fetch Events from Firestore
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, 'events'));
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
    fetchEvents();
  }, []);

  const toggleDescription = (index) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setNewsTitle("");
    setNewsContent("");
  };

  return (
    <div className="bg-gray-100">
      <Header />

      {/* Announcements Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 mt-30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
              📰 Announcements
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
              Stay informed with the latest news, updates, and public advisories from Barangay Inayawan.
            </p>

          {loading ? (
            <p className="text-center text-gray-600 text-lg mt-6">Loading announcements...</p>
          ) : announcements.length === 0 ? (
            <p className="text-center text-gray-600 text-lg mt-6">No announcements available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <span className="block text-sm text-gray-500">📅 {announcement.date}</span>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">{announcement.title}</h3>
                  <p className="text-gray-700 mt-2">{announcement.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">🎉 Upcoming Events</h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Stay informed about the latest events happening in Barangay Inayawan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                >
                  {event.image && (
                    <div className="w-full h-56 rounded-lg overflow-hidden flex justify-center items-center bg-gray-100">
                      <img src={event.image} alt={event.title} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <span className="block text-sm text-gray-500">📅 {event.date} | 📍 {event.location}</span>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-2">{event.title}</h3>
                  
                  {expandedEvent === index && <p className="text-gray-700 mt-2">{event.description}</p>}

                  <div className="mt-4">
                    <button
                      onClick={() => toggleDescription(index)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                    >
                      {expandedEvent === index ? "Show Less" : "Learn More"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No upcoming events available.</p>
            )}
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default NewsPage;
