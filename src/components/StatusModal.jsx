import React from "react";

const StatusModal = ({ message, isSuccess, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#000000a0] bg-opacity-0 z-40" />
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full z-50 text-center">
        <h2 className={`text-lg font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
          {isSuccess ? "Success!" : "Error!"}
        </h2>
        <p className="mt-2 text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className={`mt-4 px-4 py-2 rounded-md shadow-md ${isSuccess ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} text-white`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
