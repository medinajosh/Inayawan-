import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { FaSearch, FaCheck, FaTrash, FaEye } from "react-icons/fa";

const PromoteBusiness = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [applicationToApprove, setApplicationToApprove] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const applicationsRef = collection(firestore, "businessApplications");
      const q = query(applicationsRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const applicationsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().timestamp
          ? doc.data().timestamp.toDate().toLocaleString()
          : "N/A",
      }));

      setApplications(applicationsData);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleApproval = async (status) => {
    if (applicationToApprove) {
      try {
        const applicationRef = doc(firestore, "businessApplications", applicationToApprove.id);
        await updateDoc(applicationRef, { status });

        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationToApprove.id ? { ...app, status } : app
          )
        );
        window.alert(`Application ${status}!`);
        setShowApprovalModal(false);
        setApplicationToApprove(null);
      } catch (error) {
        console.error("Error updating application status:", error);
      }
    }
  };

  const confirmDelete = (id) => {
    setApplicationToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (applicationToDelete) {
      try {
        await deleteDoc(doc(firestore, "businessApplications", applicationToDelete));

        setApplications((prev) => prev.filter((app) => app.id !== applicationToDelete));

        window.alert("Application Deleted!");
        setShowDeleteModal(false);
        setApplicationToDelete(null);
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    }
  };

  const filteredApplications = applications
    .filter((app) =>
      app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((app) => (filter === "All" ? true : app.status === filter));

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-blue-800">📩 Promote Business</h2>
      </div>

      <div className="flex items-center space-x-4 mb-6 relative">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, or time..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out"
          />
        </div>
        <select
          className="p-3 border border-gray-300 rounded-lg bg-white text-blue-600 focus:ring-2 focus:ring-blue-400"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">Business Name</th>
              <th className="py-3 px-4 text-left">Owner</th>
              <th className="py-3 px-4 text-left">Contact Info</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-blue-50">
                  <td className="py-3 px-4">{app.businessName}</td>
                  <td className="py-3 px-4">{app.ownerName}</td>
                  <td className="py-3 px-4">{app.contactInfo}</td>
                  <td className="py-3 px-4">{app.timestamp}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                      app.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : app.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => { setSelectedApplication(app); setShowViewModal(true); }}><FaEye /></button>
                    <button className="text-green-600 hover:text-green-800" onClick={() => { setApplicationToApprove(app); setShowApprovalModal(true); }}><FaCheck /></button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => confirmDelete(app.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">No business applications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-50 z-40" />
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-2xl font-semibold text-gray-800">Change Request Status</h3>
            <p className="mt-4 text-lg text-gray-700">Do you want to approve or reject this request?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button onClick={() => handleApproval("Approved")} className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700">Approve</button>
              <button onClick={() => handleApproval("Rejected")} className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700">Reject</button>
              <button onClick={() => setShowApprovalModal(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}



      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-50 z-40" />
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-2xl font-semibold text-gray-800">Are you sure you want to delete this request?</h3>
            <div className="flex justify-end mt-4 space-x-4">
              <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}


      {/* View Modal */}
      {showViewModal && selectedApplication && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-50 z-40" />
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-2xl font-semibold text-gray-800">Business Application Details</h3>
            <p className="mt-4 text-lg text-gray-700">Business Name: {selectedApplication.businessName}</p>
            <p className="text-lg text-gray-700">Owner: {selectedApplication.ownerName}</p>
            <p className="text-lg text-gray-700">Contact Info: {selectedApplication.contactInfo}</p>
            <p className="text-lg text-gray-700">Description: {selectedApplication.description}</p>
            <p className="text-lg text-gray-700">Submitted at: {selectedApplication.timestamp}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowViewModal(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoteBusiness;
