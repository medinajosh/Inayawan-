import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const NewsHistory = () => {
  const [newsHistory, setNewsHistory] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchNewsHistory();
  }, []);

  const fetchNewsHistory = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'announcements'));
      const newsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by timestamp (newest first)
      newsData.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
      
      setNewsHistory(newsData);
    } catch (error) {
      console.error("Error fetching news history: ", error);
    }
  };

  
  

   

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📰 News History</h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded-lg text-center border border-green-500">
            {successMessage}
          </div>
        )}

        <div className="space-y-4">
          {newsHistory.length > 0 ? (
            newsHistory.map((news) => (
              <div key={news.id} className="p-4 bg-gray-50 border rounded-lg shadow flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{news.title}</h3>
                  <p className="text-gray-700 mt-2">{news.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    By: {news.author} | {new Date(news.timestamp?.seconds * 1000).toLocaleString()}
                  </p>
                </div>
                
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No news history available.</p>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default NewsHistory;
