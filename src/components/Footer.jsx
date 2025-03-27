import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faFacebookF, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons'; // Import brand icons
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import solid icons (like phone and envelope)
import logo from "../assets/logo.png"; // Import logo

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-12 border-t border-gray-300">
      <div className="container mx-auto px-6 lg:px-12">
        {/* 🔹 Top Section: Logo & Social Media */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-b border-gray-300 pb-6">
          {/* Logo Section */}
          <div className="mb-6 lg:mb-0">
            <Link to="/" className="block">
              <img src={logo} alt="Barangay Logo" className="w-40" />
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/SKBarangayInayawan"
              className="text-gray-600 hover:text-blue-600 transition duration-300 text-2xl"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://www.instagram.com/your_instagram_handle"
              className="text-gray-600 hover:text-blue-600 transition duration-300 text-2xl"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://t.me/your_telegram_handle"
              className="text-gray-600 hover:text-blue-600 transition duration-300 text-2xl"
            >
              <FontAwesomeIcon icon={faTelegram} />
            </a>
            <a
              href="tel:09325173089"
              className="text-gray-600 hover:text-blue-600 transition duration-300 text-2xl"
            >
              <FontAwesomeIcon icon={faPhoneAlt} />
            </a>
            <a
              href="mailto:inayawan2018@gmail.com"
              className="text-gray-600 hover:text-blue-600 transition duration-300 text-2xl"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>

        {/* 🔹 Middle Section: Contact, Quick Links, Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Contact Us</h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <span className="font-medium">📞</span> 
                <a href="tel:09325173089" className="hover:text-blue-600 transition duration-300"> (032) 517-3089</a>
              </li>
              <li>
                <span className="font-medium">✉️</span> 
                <a href="mailto:inayawan2018@gmail.com" className="hover:text-blue-600 transition duration-300"> inayawan2018@gmail.com</a>
              </li>
              <li>
                <span className="font-medium">📍</span> 
                <a href="https://www.google.com/maps/@10.2698745,123.8562762" className="hover:text-blue-600 transition duration-300"> 177 F. Jaca St. Cebu City</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Quick Links</h3>
            <ul className="space-y-3 text-gray-700">
              {["Home", "About", "Services", "News", "FAQs"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-blue-600 transition duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Legal</h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link to="/privacy" className="hover:text-blue-600 transition duration-300">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition duration-300">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 🔹 Bottom Section: Copyright & Terms */}
        <div className="mt-10 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-600">
          <span>
            &copy; 2024 <Link to="/" className="text-blue-600 hover:underline">Barangay Inayawan</Link>. All Rights Reserved.
          </span>
          <div className="mt-4 lg:mt-0 space-x-4">
            <Link to="/privacy" className="hover:text-blue-600 transition duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition duration-300">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
