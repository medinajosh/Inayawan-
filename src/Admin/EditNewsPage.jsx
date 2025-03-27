import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc  } from 'firebase/firestore';
import EditEvents from './EditEvents';
import StatusModal from '../components/StatusModal';


const EditNewsPage = () => {
  //modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDate, setAnnouncementDate] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementAuthor, setAnnouncementAuthor] = useState("");
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null); 
  const [showAddForm, setShowAddForm] = useState(false); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [announcementToDelete, setAnnouncementToDelete] = useState(null); 

  const handleAnnouncementTitleChange = (e) => setAnnouncementTitle(e.target.value);
  const handleAnnouncementContentChange = (e) => setAnnouncementContent(e.target.value);
  const handleAnnouncementDateChange = (e) => setAnnouncementDate(e.target.value);
  const handleAnnouncementAuthorChange = (e) => setAnnouncementAuthor(e.target.value);

  


  const handleEditToggle = (announcement) => {
    if (editingAnnouncementId === announcement.id) {
      setIsEditing(false);
      setEditingAnnouncementId(null);
      setAnnouncementTitle("");
      setAnnouncementDate("");
      setAnnouncementContent("");
      setAnnouncementAuthor("");
    } else {
      setIsEditing(true);
      setEditingAnnouncementId(announcement.id);
      setAnnouncementTitle(announcement.title);
      setAnnouncementDate(announcement.date);
      setAnnouncementContent(announcement.content);
      setAnnouncementAuthor(announcement.author);
    }
  };
  

  const fetchAnnouncements = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'announcements'));
    const announcementsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setAnnouncements(announcementsData);
  };


  const handleSaveEdit = async () => {
    if (!announcementTitle || !announcementDate || !announcementContent || !announcementAuthor) {
      setModalMessage("Please fill in all fields!");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    try {
      const docRef = doc(firestore, 'announcements', editingAnnouncementId);
      await updateDoc(docRef, {
        title: announcementTitle,
        date: announcementDate,
        content: announcementContent,
        author: announcementAuthor,
        timestamp: new Date()
      });
      
      setAnnouncements((prev) =>
        prev.map((ann) =>
          ann.id === editingAnnouncementId
            ? { ...ann, title: announcementTitle, date: announcementDate, content: announcementContent, author: announcementAuthor }
            : ann
        )
      );
      
      setModalMessage("Announcement updated successfully!");
      setIsSuccess(true);
      setShowModal(true);


      setIsEditing(false);
      setEditingAnnouncementId(null);
      setAnnouncementTitle("");
      setAnnouncementDate("");
      setAnnouncementContent("");
      setAnnouncementAuthor("");
    } catch (e) {
      console.error("Error updating document: ", e);
      setModalMessage("Error updating announcement!");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  

  const handleSave = async () => {
    if (!announcementTitle || !announcementDate || !announcementContent || !announcementAuthor) {
      setModalMessage("Please fill in all fields!");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, 'announcements'), {
        title: announcementTitle,
        date: announcementDate,
        content: announcementContent,
        author: announcementAuthor, // Store author in Firebase
        timestamp: new Date()
      });
      

      console.log("Document written with ID: ", docRef.id);
      setModalMessage("Announcement saved successfully!");
      setIsSuccess(true);
      setShowModal(true);

      fetchAnnouncements();
      setIsEditing(false);
      setShowAddForm(false);
      setAnnouncementTitle("");
      setAnnouncementDate("");
      setAnnouncementContent("");
      setAnnouncementAuthor("");
    } catch (e) {
      console.error("Error adding document: ", e);
      setModalMessage("Error saving announcement!");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const handleDelete = async () => {
    if (announcementToDelete) {
      try {
        const docRef = doc(firestore, 'announcements', announcementToDelete);
        await deleteDoc(docRef);
        setModalMessage("Announcement deleted successfully!");
        setIsSuccess(true);
        setShowModal(true);
        fetchAnnouncements();
        setShowDeleteModal(false);
        setAnnouncementToDelete(null); // Reset after deletion
      } catch (e) {
        console.error("Error deleting document: ", e);
        setModalMessage("Error deleting announcement!");
        setIsSuccess(false);
        setShowModal(true);
      }
    }
  };

  

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    
    <div className="bg-gray-100">
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">📰 Announcements</h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Stay informed with the latest news, updates, and public advisories from Barangay Inayawan.
          </p>

          

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors mt-6"
          >
            {showAddForm ? 'Cancel New Announcement' : 'Add New Announcement'}
          </button>

          {showAddForm && (
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 mt-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Add New Announcement</h3>
              <div className="space-y-4">
              <div>
                  <label className="block text-lg font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    value={announcementAuthor}
                    onChange={handleAnnouncementAuthorChange}
                    className="mt-2 w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="announcementDate" className="block text-lg font-medium text-gray-700">Announcement Date</label>
                  <input
                    id="announcementDate"
                    type="date"
                    value={announcementDate}
                    onChange={handleAnnouncementDateChange}
                    className="mt-2 w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="announcementTitle" className="block text-lg font-medium text-gray-700">Title</label>
                  <input
                    id="announcementTitle"
                    type="text"
                    value={announcementTitle}
                    onChange={handleAnnouncementTitleChange}
                    className="mt-2 w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Title"
                  />
                </div>

                <div>
                  <label htmlFor="announcementContent" className="block text-lg font-medium text-gray-700">Content</label>
                  <textarea
                    id="announcementContent"
                    value={announcementContent}
                    onChange={handleAnnouncementContentChange}
                    className="mt-2 w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="6"
                    placeholder="Enter announcement"
                  />
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
                  >
                    Save Announcement
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <span className="block text-sm text-gray-500">📅 {announcement.date}</span>
                {editingAnnouncementId === announcement.id && isEditing ? (
                  <>
                    <input
                      type="date"
                      value={announcementDate}
                      onChange={handleAnnouncementDateChange}
                      className="text-2xl font-semibold text-gray-800 mt-2 w-full border-b-2"
                    />
                    <input
                      type="text"
                      value={announcementTitle}
                      onChange={handleAnnouncementTitleChange}
                      className="text-2xl font-semibold text-gray-800 mt-2 w-full border-b-2"
                    />
                    <textarea
                      value={announcementContent}
                      onChange={handleAnnouncementContentChange}
                      className="w-full mt-2 p-2 border rounded-md"
                      rows="4"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-800 mt-2">{announcement.title}</h3>
                    <p className="text-gray-700 mt-2">{announcement.content}</p>
                  </>
                )}

                <div className="mt-4">
                  <button
                    onClick={() => handleEditToggle(announcement)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors"
                  >
                    {isEditing && editingAnnouncementId === announcement.id ? 'Cancel Edit' : 'Edit'}
                  </button>

                  {isEditing && editingAnnouncementId === announcement.id && (
                    <button
                      onClick={handleSaveEdit}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  )}

                  <button
                    onClick={() => { setShowDeleteModal(true); setAnnouncementToDelete(announcement.id); }}
                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
        {showModal && (
          <StatusModal
            message={modalMessage}
            isSuccess={isSuccess}
            onClose={() => setShowModal(false)}
          />
        )}

      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-0 z-40" />
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-2xl font-semibold text-gray-800">Are you sure you want to delete this FAQ?</h3>
            <div className="mt-6 flex justify-center space-x-4">
              <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500">
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


  {/* Edit Events */}
    <EditEvents/>



    </div>


  
  );
  
};

export default EditNewsPage;



