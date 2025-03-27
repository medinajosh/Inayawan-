import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import StatusModal from "../components/StatusModal";

function EditEvents() {
  //modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(firestore, "events"));
    const eventsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setEvents(eventsData);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "inayawan");

      const response = await fetch("https://api.cloudinary.com/v1_1/dzh0svwal/image/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.secure_url) {
        setUploadedImage(result.secure_url);
        localStorage.setItem("latestImage", result.secure_url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = (event) => {
    if (editingEventId === event.id) {
      setIsEditing(false);
      setEditingEventId(null);
    } else {
      setIsEditing(true);
      setEditingEventId(event.id);
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setLocation(event.location);
      setUploadedImage(event.image);
      setShowAddForm(false); 
    }
  };
  

  const handleSaveEdit = async () => {
    if (!editingEventId) return;
  
    try {
      await updateDoc(doc(firestore, "events", editingEventId), {
        title,
        description,
        date,
        location,
        image: uploadedImage || events.find((e) => e.id === editingEventId)?.image, // Keep existing image if none uploaded
        timestamp: serverTimestamp(),
      });
  
      setModalMessage("Event updated successfully!");
      setIsSuccess(true);
      setShowModal(true);
      
      // Refresh event list
      fetchEvents();
  
      // Reset form
      setIsEditing(false);
      setEditingEventId(null);
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setUploadedImage(null);
    } catch (error) {
      console.error("Error updating event:", error);
      setModalMessage("Error updating event!");
      setIsSuccess(false);
      setShowModal(true);
    }
  };
  
  

  const handleSave = async () => {
    if (!title || !description || !date || !location || !uploadedImage) {
      setModalMessage("Please fill in all fields!");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }
    try {
      const newEvent = {
        title,
        description,
        date,
        location,
        image: uploadedImage,
        timestamp: serverTimestamp(),
      };
      
      if (editingEventId) {
        await updateDoc(doc(firestore, "events", editingEventId), newEvent);
      } else {
        await addDoc(collection(firestore, "events"), newEvent);
      }

      setModalMessage("Event saved successfully!");
      setIsSuccess(true);
      setShowModal(true);
      fetchEvents();
      setShowAddForm(false);
      setIsEditing(false);
      setEditingEventId(null);
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setUploadedImage(null);
    } catch (e) {
      setModalMessage("Error saving event!");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const handleDelete = async () => {
    if (eventToDelete) {
      try {
        await deleteDoc(doc(firestore, "events", eventToDelete));
        setModalMessage("Event deleted successfully!");
        setIsSuccess(true);
        setShowModal(true);
        fetchEvents();
        setShowDeleteModal(false);
      } catch (e) {
        console.error("Error deleting document: ", e);
        setModalMessage("Error deleting FAQ!");
        setIsSuccess(false);
        setShowModal(true);
      }
    }
  };

  return (
    <div className="bg-gray-100">
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Edit Events</h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Manage event details and images.
          </p>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setTitle("");
              setDescription("");
              setDate("");
              setLocation("");
              setUploadedImage(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 mt-6"
          >
            {showAddForm ? "Cancel New Event" : "Add New Event"}
          </button>


          {showAddForm && (
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 mt-6">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Add New Event</h3>
              <div className="space-y-4">
              <label className="block text-lg font-medium text-gray-700">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 border rounded-lg bg-gray-50" />
                
              <label className="block text-lg font-medium text-gray-700">Description</label>  
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full p-3 border rounded-lg bg-gray-50" rows="3"></textarea>

              <label className="block text-lg font-medium text-gray-700">Date</label>  
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50" />
                
              <label className="block text-lg font-medium text-gray-700">Location</label>  
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full p-3 border rounded-lg bg-gray-50" />
                <label htmlFor="file-input" className="cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                  {loading ? "Uploading..." : "Choose File"}
                </label>
                <input id="file-input" type="file" className="hidden" onChange={handleFileUpload} disabled={loading} />
                {uploadedImage && <img src={uploadedImage} alt="Preview" className="w-48 h-48 object-contain rounded-lg shadow-md mx-auto" />}
                <button onClick={handleSave} className="ml-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl active:scale-95 transform transition-all duration-300 ease-in-out font-semibold">Save Event</button>
              </div>
            </div>
          )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                {editingEventId === event.id && isEditing ? (
                    <>
                    <label className="block text-lg font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-2xl font-semibold text-gray-800 mt-2 w-full border-b-2"
                      />
                      <div className="mt-5"></div>
                  <label className="block text-lg font-medium text-gray-700">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-2 p-2 border rounded-md"
                        rows="4"
                      />
                  <label className="block text-lg font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full mt-2 p-2 border rounded-md"
                      />
                  <label className="block text-lg font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                        className="w-full mt-2 p-2 border rounded-md"
                      />
                  <div className="mt-5"></div>
                  
                      <input
                        id="file-input"
                        type="file"
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileUpload}
                        disabled={loading}
                      />

                      <label htmlFor="file-input" className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition ">
                        {loading ? "Uploading..." : "Choose File"}
                      </label>

                      {uploadedImage && (
                        <img
                          src={uploadedImage}
                          alt="Event Preview"
                          className="w-48 h-48 object-contain rounded-lg shadow-md mt-2"
                      />
                      )}

                    </>
                  ) : (
                    <>
                    
                      <h3 className="text-2xl font-semibold text-gray-800 mt-2">Title: {event.title}</h3>
                      <p className="text-gray-700 mt-2">Desscription: {event.description}</p>
                      <p className="text-gray-600 mt-2">Date: {event.date}</p>
                      <p className="text-gray-600 mt-2">Location: {event.location}</p>
                      {event.image && <img src={event.image} alt="Event" className="w-full h-48 object-contain rounded-lg mt-4" />}
                    </>
                  )}
                
                <div className="mt-4">
                  <button
                    onClick={() => handleEditToggle(event)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors"
                  >
                    {isEditing && editingEventId === event.id ? "Cancel Edit" : "Edit"}
                  </button>

                  {isEditing && editingEventId === event.id && (
                    <button
                      onClick={handleSaveEdit}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  )}

                  <button
                    onClick={() => { setShowDeleteModal(true); setEventToDelete(event.id); }}
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

      


      {showDeleteModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-0 z-40" />
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-2xl font-semibold text-gray-800">Are you sure you want to delete this event?</h3>
            <div className="mt-6 flex justify-center space-x-4">
              <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700">Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400">Cancel</button>
          </div>
        </div>
        </div>
      )}
    
    </div>
  );
}

export default EditEvents;


