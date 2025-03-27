import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { firestore } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const Milestone = () => {
  const [milestones, setMilestones] = useState([]);
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const milestonesQuery = query(collection(firestore, "milestones"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(milestonesQuery);
        const milestonesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMilestones(milestonesData);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-16">
          Barangay Milestones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {milestones.length > 0 ? (
            milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:scale-105 flex flex-col items-center text-center"
              >
                {milestone.image && (
                  <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-64 object-contain rounded-xl shadow-lg border-2 border-blue-400"
                  />
                )}
                <div className="mt-4 w-full">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition">
                    {milestone.title}
                  </h3>

                  

                  {/* Animated Expandable Section */}
                  <AnimatePresence>
                    {expandedMilestone === milestone.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 mt-2">{milestone.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Read More / Show Less Button */}
                  {milestone.description.length > 1 && (
                    <button
                      onClick={() =>
                        setExpandedMilestone(expandedMilestone === milestone.id ? null : milestone.id)
                      }
                      className="mt-2 text-blue-600 font-semibold hover:text-blue-800 transition"
                    >
                      {expandedMilestone === milestone.id ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-500 text-center w-full">No milestones found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Milestone;
