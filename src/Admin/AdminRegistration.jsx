import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BarangayImage from "../assets/hall.jpg"; // Adjust the path as necessary
import BarangayLogo from "../assets/logo.png"; // Adjust the path as necessary
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const AdminRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);

      if (user) {
        await setDoc(doc(firestore, "Users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }

      setSuccessMessage("Registration successful! You can now log in.");
    } catch (error) {
      setError(error.message);
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-blue-100 to-blue-300 overflow-hidden">
      {/* Left Side (Image & Text) */}
      <div className="w-1/2 hidden lg:flex relative items-center justify-center">
        <img src={BarangayImage} alt="Barangay" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        <div className="absolute flex flex-col items-center text-white text-center p-10 max-w-md">
          <h2 className="text-4xl font-extrabold drop-shadow-md">Welcome to Our Barangay!</h2>
          <p className="text-lg mt-4 leading-relaxed drop-shadow-sm">
            Join us to stay connected with your barangay! Get updates, services, and more in just one place.
            Sign up now to access your community.
          </p>
        </div>
      </div>

      {/* Right Side (Registration Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-12 rounded-lg shadow-2xl w-full max-w-md border border-gray-200">
          {/* Barangay Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={BarangayLogo} alt="Barangay Logo" className="w-20 h-20" />
            <h2 className="text-2xl font-bold text-blue-700 mt-2">Barangay Inayawan</h2>
          </div>

          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Register</h2>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 shadow-sm bg-gray-50 placeholder-gray-400"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 shadow-sm bg-gray-50 placeholder-gray-400"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 shadow-sm bg-gray-50 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 shadow-sm bg-gray-50 placeholder-gray-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center mt-6 text-gray-600 hover:text-gray-900"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 shadow-sm bg-gray-50 placeholder-gray-400"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center mt-6 text-gray-600 hover:text-gray-900"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm font-medium text-center mt-2 animate-pulse">{error}</p>}

            {/* Success Message */}
            {successMessage && <p className="text-green-500 text-sm font-medium text-center mt-2 animate-pulse">{successMessage}</p>}

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-md transition-transform duration-300">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;
