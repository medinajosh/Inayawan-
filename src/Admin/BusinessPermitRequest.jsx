import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { FaEye, FaCheck, FaTrash, FaSearch } from "react-icons/fa";

const BusinessPermitRequest = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [requestToApprove, setRequestToApprove] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const q = query(collection(firestore, "businessPermitRequests"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const requestData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp?.toDate().toLocaleString() || "N/A",
    }));
    setRequests(requestData);
  };

  const confirmDelete = (id) => {
    setRequestToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (requestToDelete) {
      await deleteDoc(doc(firestore, "businessPermitRequests", requestToDelete));
      fetchRequests();
      window.alert("Application Deleted!");
      setShowDeleteModal(false);
      setRequestToDelete(null);
    }
  };

  const handleApproval = async (status) => {
    if (requestToApprove) {
      const requestRef = doc(firestore, "businessPermitRequests", requestToApprove.id);
      await updateDoc(requestRef, { statusOfRequest: status });
      fetchRequests();
      window.alert(`Application ${status}!`);
      setShowApprovalModal(false);
      setRequestToApprove(null);
    }
  };

  const filteredRequests = requests.filter((request) => {
    const searchLower = searchTerm.toLowerCase();
    const status = request.statusOfRequest || "Pending";
    return (
      (filter === "All" || status === filter) &&
      (request.businessName.toLowerCase().includes(searchLower) ||
        request.ownerName.toLowerCase().includes(searchLower) ||
        request.email.toLowerCase().includes(searchLower) ||
        request.timestamp?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-4xl font-extrabold text-blue-800">📄 Business Permit Requests</h2>
      </div>

      <div className="flex items-center space-x-4 mb-6 relative">
        <div className="relative w-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by business name, owner, or email..."
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
      
      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left">Business Name</th>
              <th className="py-3 px-4 text-left">Owner</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-blue-50">
                  <td className="py-3 px-4">{request.businessName} </td>
                  <td className="py-3 px-4">{request.ownerName}  </td>
                  <td className="py-3 px-4">{request.email}</td>
                  <td className="py-3 px-4">{request.timestamp}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                      request.statusOfRequest === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : request.statusOfRequest === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {request.statusOfRequest || "Pending"}
                    </span>

                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => setSelectedRequest(request)}><FaEye /></button>
                    <button className="text-green-600 hover:text-green-800" onClick={() => { setRequestToApprove(request); setShowApprovalModal(true); }}><FaCheck /></button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => confirmDelete(request.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">No requests found.</td>
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

      {/* Certificate request details modal */}
      {selectedRequest && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-50 z-40" />
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Certificate Request</h3>
            <p className="text-lg text-gray-700"><strong>Business Name:</strong> {selectedRequest.businessName} </p>
            <p className="text-lg text-gray-700"><strong>Owner:</strong> {selectedRequest.ownerName} </p>
            <p className="text-lg text-gray-700"><strong>Age:</strong> {selectedRequest.age} </p>
            <p className="text-lg text-gray-700"><strong>Gender:</strong> {selectedRequest.gender} </p>
            <p className="text-lg text-gray-700"><strong>Status:</strong> {selectedRequest.status} </p>
            <p className="text-lg text-gray-700"><strong>Sitio:</strong> {selectedRequest.sitio} </p>
            <p className="text-lg text-gray-700"><strong>Email:</strong> {selectedRequest.email}</p>
            <p className="text-md text-gray-500 mb-4"><strong>Requested on:</strong> {selectedRequest.timestamp}</p>
            {selectedRequest.picture && <img src={selectedRequest.picture} alt="Certificate Request" className="w-full h-48 object-contain rounded-lg mb-4" />}
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition" onClick={() => setSelectedRequest(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessPermitRequest;
