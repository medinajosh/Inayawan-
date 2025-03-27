import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-blue-100 to-blue-200">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Navbar with Logout Button */}
                <div className="flex justify-between items-center bg-white shadow-md px-8 py-4 rounded-b-lg">
                <Navbar />
                    <button
                        onClick={() => setIsModalOpen(true)} // Open modal on click
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
                    >
                        Logout
                    </button>
                </div>

                {/* Main Content */}
                <main className="p-6 flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>

            {/* Logout Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-0 z-40" />
                <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50">
                        <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
                        <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)} // Cancel
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout} // Confirm logout
                                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;
