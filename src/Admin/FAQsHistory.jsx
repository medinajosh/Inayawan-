import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const FAQsHistory = () => {
  const [faqHistory, setFaqHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  

  useEffect(() => {
    fetchFaqHistory();
  }, []);

  const fetchFaqHistory = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'faqs'));
      const faqData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by timestamp (newest first)
      faqData.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
      
      setFaqHistory(faqData);
    } catch (error) {
      console.error("Error fetching FAQ history: ", error);
    }
  };

 


    
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📜 FAQ History</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded-lg text-center border border-green-500">
            {successMessage}
          </div>
        )}

        <div className="space-y-4">
          {faqHistory.length > 0 ? (
            faqHistory.map((faq) => (
              <div key={faq.id} className="p-4 bg-gray-50 border rounded-lg shadow flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                  <p className="text-gray-700 mt-2">{faq.answer}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    By: {faq.name} | {new Date(faq.timestamp?.seconds * 1000).toLocaleString()}
                  </p>
                </div>
                
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No FAQ history available.</p>
          )}
        </div>
      </div>

      </div>
  );
};

export default FAQsHistory;
