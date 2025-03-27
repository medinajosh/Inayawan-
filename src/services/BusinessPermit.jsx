import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { serverTimestamp } from "firebase/firestore";

const BusinessPermit = ({ closeModal }) => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    age: "",
    gender: "",
    status: "",
    sitio: "",
    picture: null,
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(firestore, "businessPermitRequests"));
    const requestData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp?.toDate().toLocaleString(),
    }));
    setRequests(requestData);
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
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!uploadedImage) {
      alert("Please upload an image.");
      return;
    }
    try {
      const newRequest = {
        ...formData,
        picture: uploadedImage,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(firestore, "businessPermitRequests"), newRequest);
      alert("Request submitted successfully!");
      fetchRequests();
      setFormData({
        businessName: "",
        ownerName: "",
        email: "",
        age: "",
        gender: "",
        status: "",
        sitio: "",
        picture: null,
      });
      setUploadedImage(null);
      closeModal(); // Close the modal after successful submission
    } catch (e) {
      console.error("Error submitting request: ", e);
      alert("Error submitting request!");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-0 z-40" />
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Request Business Permit</h2>
        <p className="text-lg text-gray-600 mb-8 text-center">Fill in the details to request your business permit.</p>

        <div className="overflow-y-auto max-h-100">
          <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full p-3 border rounded-lg bg-gray-50"
              required
            />
          <label className="block text-lg font-medium text-gray-700">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              className="w-full p-3 border rounded-lg bg-gray-50"
              required
            />
          <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border rounded-lg bg-gray-50"
              required
            />
          <label className="block text-lg font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          <label className="block text-lg font-medium text-gray-700">Gender</label>            
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-3 border rounded-lg bg-gray-50"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          <label className="block text-lg font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-3 border rounded-lg bg-gray-50"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          <label className="block text-lg font-medium text-gray-700">Sitio</label>
            <select
              name="sitio"
              value={formData.sitio}
              onChange={(e) => setFormData({ ...formData, sitio: e.target.value })}
              className="w-full p-3 border rounded-lg bg-gray-50"
            >
              <option value="">Select Sitio</option>
              <option value="Sitio 1">Sitio 1</option>
              <option value="Sitio 2">Sitio 2</option>
              <option value="Sitio 3">Sitio 3</option>
            </select>
          
          
            <div className="text-center">
            <label className="block text-lg font-medium text-gray-700">Requirement</label>
              <label
                htmlFor="file-input"
                className="cursor-pointer inline-block bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
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

            {uploadedImage && (
              <div className="mt-4 flex flex-col items-center">
                <div className="w-48 h-48 border-2 border-gray-300 rounded-lg shadow-md overflow-hidden">
                  <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <p className="text-gray-500 mt-2 text-sm">Uploaded Image Preview</p>
              </div>
            )}

            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl active:scale-95 transform transition-all duration-300 ease-in-out font-semibold"
            >
              Send Request
            </button>

            {/* Cancel Button */}
            <button
              onClick={closeModal}
              className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg mt-4 hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPermit;
