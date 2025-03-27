import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";
import { FaBuilding, FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const BusinessPermitDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const q = query(collection(firestore, "businessPermitRequests"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const requestData = querySnapshot.docs.map((doc) => doc.data());
    setRequests(requestData);

    const approved = requestData.filter(req => req.statusOfRequest === "Approved").length;
    const pending = requestData.filter(req => req.statusOfRequest === "Pending").length;
    const rejected = requestData.filter(req => req.statusOfRequest === "Rejected").length;
    
    setApprovedCount(approved);
    setPendingCount(pending);
    setRejectedCount(rejected);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-300 ">
      <h2 className="text-4xl font-extrabold text-blue-800 mb-6"> Business Permit Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
          <FaClipboardList className="text-yellow-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Pending Requests</h3>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
          <FaCheckCircle className="text-blue-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Approved Requests</h3>
            <p className="text-2xl font-bold text-blue-600">{approvedCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4">
          <FaTimesCircle className="text-red-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Rejected Requests</h3>
            <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPermitDashboard;
