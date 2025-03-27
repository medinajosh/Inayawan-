import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { FaEye, FaCheck, FaTrash, FaSearch } from "react-icons/fa";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestToApprove, setRequestToApprove] = useState(null);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "reports"));
      const reportsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.seconds
            ? new Date(data.timestamp.seconds * 1000).toLocaleString()
            : "No timestamp",
          statusOfRequest: data.statusOfRequest || "Pending",
        };
      });
      setReports(reportsData);
    } catch (error) {
      console.error("Error fetching reports: ", error);
    }
  };

  const handleDelete = async () => {
    if (requestToDelete) {
      await deleteDoc(doc(firestore, "reports", requestToDelete));
      fetchReports();
      window.alert("Report Deleted!");
      setShowDeleteModal(false);
      setRequestToDelete(null);
    }
  };

  const handleApproval = async (status) => {
    if (requestToApprove) {
      const requestRef = doc(firestore, "reports", requestToApprove.id);
      await updateDoc(requestRef, { statusOfRequest: status });
      fetchReports();
      window.alert(`Report ${status}!`);
      setShowApprovalModal(false);
      setRequestToApprove(null);
    }
  };

  const filteredReports = reports.filter((report) => {
    const searchLower = searchTerm.toLowerCase();
    const status = report.statusOfRequest || "Pending";
    return (
      (filter === "All" || status === filter) &&
      (report.name?.toLowerCase().includes(searchLower) ||
        report.contact?.toLowerCase().includes(searchLower) ||
        report.timestamp?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-blue-800">📩 Reports</h2>
      </div>

      <div className="flex items-center space-x-4 mb-6 relative">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, contact, or timestamp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

      <div className="bg-white p-6 rounded-lg shadow-md">
        {filteredReports.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Timestamp</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-blue-50">
                  <td className="py-3 px-4">{report.name}</td>
                  <td className="py-3 px-4">{report.contact}</td>
                  <td className="py-3 px-4">{report.timestamp}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                      report.statusOfRequest === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : report.statusOfRequest === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {report.statusOfRequest || "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => setSelectedRequest(report)}><FaEye /></button>
                    <button className="text-green-600 hover:text-green-800" onClick={() => { setRequestToApprove(report); setShowApprovalModal(true); }}><FaCheck /></button>
                    <button 
                        className="text-red-600 hover:text-red-800" 
                        onClick={() => { setRequestToDelete(report.id); setShowDeleteModal(true); }}
                      >
                        <FaTrash />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="py-4 text-center text-gray-500">No reports found.</p>
        )}
      </div>

      {/* View Modal */}
      {selectedRequest && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-50 z-40" />
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Report Details</h3>
            <p className="text-lg text-gray-700"><strong>Name:</strong> {selectedRequest.name}</p>
            <p className="text-lg text-gray-700"><strong>Contact:</strong> {selectedRequest.contact}</p>
            <p className="text-lg text-gray-700"><strong>Issue:</strong> {selectedRequest.issue}</p>
            <p className="text-md text-gray-500 mb-4"><strong>Reported on:</strong> {selectedRequest.timestamp}</p>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition" onClick={() => setSelectedRequest(null)}>Close</button>
          </div>
        </div>
      )}  
      
      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-50 z-40" />
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-2xl font-semibold text-gray-800">Change Request Status</h3>
            <p className="mt-4 text-lg text-gray-700">Approve or reject this request?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button onClick={() => handleApproval("Approved")} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">Approve</button>
              <button onClick={() => handleApproval("Rejected")} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">Reject</button>
              <button onClick={() => setShowApprovalModal(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-50 z-40" />
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-2xl font-semibold text-gray-800">Confirm Deletion</h3>
            <p className="text-lg text-gray-700">Are you sure you want to delete this request?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
