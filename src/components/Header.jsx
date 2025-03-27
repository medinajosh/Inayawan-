import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust path as needed

const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname); // Tracks the active item

  // Function to close menus and set active item when a link is clicked
  const handleLinkClick = (path) => {
    setActiveItem(path);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-15 w-15" />
          <NavLink
            to="/"
            className="text-blue-600 hover:text-blue-500 transition-colors duration-300 text-2xl font-extrabold tracking-wider"
            onClick={() => handleLinkClick("/")}
          >
            Barangay Inayawan
          </NavLink>
        </div>

        {/* Hamburger Menu Button - Mobile */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Navigation Links - Desktop */}
        <ul className="hidden md:flex space-x-8">
          {["Home", "About", "Services", "News", "FAQs"].map((item) => {
            const path = `/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`;
            const isActive = activeItem === path;

            return (
              <li key={item} className="relative group list-none">
                {item === "About" ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <NavLink
                      to="/about"
                      className={`relative text-lg font-medium tracking-wide py-2 transition duration-300 ${
                        isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800 hover:text-blue-600 group-hover:border-b-2 group-hover:border-blue-600"
                      }`}
                      onClick={() => handleLinkClick("/about")}
                    >
                      {item}
                    </NavLink>
                    {isDropdownOpen && (
                      <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 text-gray-900">
                        {["Brgy Officials", "Sk Officials", "Brgy Lupon"].map((subItem) => (
                          <li key={subItem}>
                            <NavLink
                              to={`/${subItem.toLowerCase().replace(/ /g, "-")}`}
                              className="block px-4 py-2 hover:bg-blue-200 hover:text-blue-800 transition-colors duration-300"
                              onClick={() => handleLinkClick(`/${subItem.toLowerCase().replace(/ /g, "-")}`)}
                            >
                              {subItem}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={path}
                    className={`relative text-lg font-medium tracking-wide py-2 transition duration-300 group ${
                      isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800 hover:text-blue-600 group-hover:border-b-2 group-hover:border-blue-600"
                    }`}
                    onClick={() => handleLinkClick(path)}
                  >
                    {item}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-6 absolute top-16 left-0 w-full">
          <ul className="space-y-4">
            {["Home", "About", "Services", "News", "FAQs"].map((item) => {
              const path = `/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`;
              const isActive = activeItem === path;

              return (
                <li key={item} className="relative">
                  {item === "About" ? (
                    <div>
                      <button
                        className={`w-full text-left text-lg font-medium transition-colors duration-300 ${
                          isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800 hover:text-blue-600"
                        }`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        {item} ▼
                      </button>
                      {isDropdownOpen && (
                        <ul className="mt-2 bg-white shadow-md rounded-md py-2 text-gray-900">
                          {["Brgy Officials", "Sk Officials", "Brgy Lupon"].map((subItem) => (
                            <li key={subItem}>
                              <NavLink
                                to={`/${subItem.toLowerCase().replace(/ /g, "-")}`}
                                className="block px-4 py-2 hover:bg-blue-200 hover:text-blue-800 transition-colors duration-300"
                                onClick={() => handleLinkClick(`/${subItem.toLowerCase().replace(/ /g, "-")}`)}
                              >
                                {subItem}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      to={path}
                      className={`block text-lg font-medium transition-colors duration-300 ${
                        isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800 hover:text-blue-600"
                      }`}
                      onClick={() => handleLinkClick(path)}
                    >
                      {item}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
