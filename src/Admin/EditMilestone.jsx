import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import StatusModal from "../components/StatusModal";

function EditMilestone() {
  //modal
      const [showModal, setShowModal] = useState(false);
      const [modalMessage, setModalMessage] = useState("");
      const [isSuccess, setIsSuccess] = useState(false);
      const [isEditing, setIsEditing] = useState(false);

  const [editingMilestoneId, setEditingMilestoneId] = useState(null);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
      
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [milestoneToDelete, setMilestoneToDelete] = useState(null);
  

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    const querySnapshot = await getDocs(collection(firestore, "milestones"));
    const milestonesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setMilestones(milestonesData);
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


  const handleEditToggle = (milestone) => {
    if (editingMilestoneId === milestone.id) {
      setIsEditing(false);
      setEditingMilestoneId(null);
    } else {
      setIsEditing(true);
      setEditingMilestoneId(milestone.id);
      setTitle(milestone.title);
      setDescription(milestone.description);
      setUploadedImage(milestone.image);
      setShowAddForm(false);
    }
  };
  
  const handleSaveEdit = async () => {
    if (!editingMilestoneId) return;
  
    try {
      await updateDoc(doc(firestore, "milestones", editingMilestoneId), {
        title,
        description,
        date,
        location,
        image: uploadedImage || milestones.find((m) => m.id === editingMilestoneId)?.image,
        timestamp: serverTimestamp(),
      });
  
      setModalMessage("Milestone updated successfully!");
      setIsSuccess(true);
      setShowModal(true);
  
      // Refresh milestone list
      fetchMilestones();
  
      // Reset form
      setIsEditing(false);
      setEditingMilestoneId(null);
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setUploadedImage(null);
    } catch (error) {
      console.error("Error updating milestone:", error);
      setModalMessage("Error updating milestone!");
      setIsSuccess(false);
      setShowModal(true);
    }
  };
  

  



  const handleSave = async () => {
    if (!title || !description || !uploadedImage) {
      setModalMessage("Please fill in all fields!");
      setIsSuccess(false);
      setShowModal(true);
      return;
    }

    
    try {
      const newMilestone = {
        title,
        description,
        image: uploadedImage,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(firestore, "milestones"), newMilestone);
      setModalMessage("Milestone saved successfully!");
      setIsSuccess(true);
      setShowModal(true);
      fetchMilestones();
      setTitle("");
      setDescription("");
      setUploadedImage(null);
      setShowAddForm(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      setModalMessage("Error saving milestone!");
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const handleDelete = async () => {
    if (milestoneToDelete) {
      try {
        await deleteDoc(doc(firestore, "milestones", milestoneToDelete));
        setModalMessage("Milestone deleted successfully!");
        setIsSuccess(true);
        setShowModal(true);
        fetchMilestones();
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
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Edit Milestones</h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Manage milestone images and descriptions.
          </p>
          <button onClick={() => {
            setShowAddForm(!showAddForm);
            setIsEditing(false);
            setEditingMilestoneId(null);
            setTitle("");
            setDescription("");
            setUploadedImage(null);
          }} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 mt-6">
            {showAddForm ? "Cancel New Milestone" : "Add New Milestone"}
          </button>


          {showAddForm && (
              <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 mt-6">
                <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                  Add New Milestone
                </h3>
                <div className="space-y-5">
                <label className="block text-lg font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                  />
                  <label className="block text-lg font-medium text-gray-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                    rows="4"
                  ></textarea>

                  {/* File Upload Button */}
                  <div className="flex flex-col items-center">
                    <label
                      htmlFor="file-input"
                      className="cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md 
                      hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                      {loading ? "Uploading..." : "Choose File"}
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={loading}
                    />
                  </div>

                  {/* Image Preview */}
                  {uploadedImage && (
                    <div className="mt-5 flex flex-col items-center">
                      <div className="w-48 h-48 border-2 border-gray-300 rounded-xl shadow-md overflow-hidden">
                        <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-gray-500 mt-2 text-sm">Uploaded Image Preview</p>
                    </div>
                  )}

                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg 
                    hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl 
                    active:scale-95 transform transition-all duration-300 ease-in-out font-semibold"
                  >
                    Save Milestone
                  </button>
                </div>
              </div>
            )}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            {editingMilestoneId === milestone.id && isEditing ? (
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
                <div className="mt-5"></div>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={loading}
                />

                <label htmlFor="file-input" className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">
                  {loading ? "Uploading..." : "Choose File"}
                </label>

                {uploadedImage && (
                  <img src={uploadedImage} alt="Milestone Preview" className="w-48 h-48 object-contain rounded-lg shadow-md mt-2" />
                )}
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-gray-800 mt-2">Title: {milestone.title}</h3>
                <p className="text-gray-700 mt-2">Description: {milestone.description}</p>
                
                {milestone.image && <img src={milestone.image} alt="Milestone" className="w-full h-48 object-contain rounded-lg mt-4" />}
              </>
            )}
          <div className="mt-4">
                  <button
                    onClick={() => handleEditToggle(milestone)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-colors"
                  >
                    {isEditing && editingMilestoneId === milestone.id ? "Cancel Edit" : "Edit"}
                  </button>

                  {isEditing && editingMilestoneId === milestone.id && (
                    <button
                      onClick={handleSaveEdit}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                  )}

                  <button
                    onClick={() => { setShowDeleteModal(true); setMilestoneToDelete(milestone.id); }}
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
            <h3 className="text-2xl font-semibold text-gray-800">Are you sure you want to delete this milestone?</h3>
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

export default EditMilestone;
