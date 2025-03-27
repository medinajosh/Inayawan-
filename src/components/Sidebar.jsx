import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdHistory, MdDashboard, MdEmail, MdFeedback, MdBarChart, MdChevronLeft, MdChevronRight, MdExpandMore, MdOutlineBusinessCenter  } from "react-icons/md";
import { FaRegEdit, FaRegNewspaper, FaQuestionCircle } from "react-icons/fa";
import { RiAdvertisementLine } from "react-icons/ri";
import { GiProgression } from "react-icons/gi";
import { IoIosBusiness } from "react-icons/io";
import { GrCertificate } from "react-icons/gr";


const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedDropdown, setExpandedDropdown] = useState(null);

    // Define sections that should keep the dropdown open
    const editPages = ['/admin/editNewsPage', '/admin/editFAQsPage', '/admin/editmilestone', '/admin/editcommercial'];
    const historyPages = ['/admin/historyNews', '/admin/historyFAQs'];
    const emailReceive = ['/admin/promoteBusiness', '/admin/reqCertificate', '/admin/reqBusinessPermit', '/admin/reqBuildingPermit'];

    // Close dropdown when switching to a section outside of Edit or History
    useEffect(() => {
        if (editPages.includes(location.pathname)) {
            setExpandedDropdown('editPage');
        } else if (historyPages.includes(location.pathname)) {
            setExpandedDropdown('historyPage');
        } else if (emailReceive.includes(location.pathname)) {
            setExpandedDropdown('emailReceive');
        } else {
            setExpandedDropdown(null);
        }
    }, [location.pathname]);

    // Toggle dropdown menu
    const toggleDropdown = (section) => {
        setExpandedDropdown(expandedDropdown === section ? null : section);
    };

    // Navigation items
    const navItems = [
        { name: 'Dashboard', icon: <MdDashboard />, path: '/admin/dashboard' },
        { 
            name: 'Edit', 
            icon: <FaRegEdit />, 
            hasDropdown: true, 
            section: 'editPage',
            subItems: [
                { name: 'Edit News', icon: <FaRegNewspaper />, path: '/admin/editNewsPage' },
                { name: 'Edit Commercial', icon: <RiAdvertisementLine />, path: '/admin/editcommercial' },
                { name: 'Edit Milestone', icon: <GiProgression />, path: '/admin/editmilestone' },
                { name: 'Edit FAQs', icon: <FaQuestionCircle />, path: '/admin/editFAQsPage' },
            ]
        },
        { 
            name: 'History', 
            icon: <MdHistory />, 
            hasDropdown: true, 
            section: 'historyPage',
            subItems: [
                { name: 'News History', icon: <FaRegNewspaper />, path: '/admin/historyNews' },
                { name: 'FAQs History', icon: <FaQuestionCircle />, path: '/admin/historyFAQs' },
            ]
        },
        { 
            name: 'Email Receive', 
            icon: <MdEmail />, 
            hasDropdown: true, 
            section: 'emailReceive',
            subItems: [
                { name: 'Promote Commercial', icon: <RiAdvertisementLine />, path: '/admin/promoteBusiness' },
                { name: 'Barangay Certificate', icon: <GrCertificate />, path: '/admin/reqCertificate' },
                { name: 'Business Permit', icon: <MdOutlineBusinessCenter  />, path: '/admin/reqBusinessPermit' },
                { name: 'Building Permit', icon: <IoIosBusiness />, path: '/admin/reqBuildingPermit' },
            ]
        },
        
        { name: 'Feedback', icon: <MdFeedback />, path: '/admin/feedback' },
        { name: 'Reports', icon: <MdBarChart />, path: '/admin/reports' },
    ];

    return (
        <aside className={`bg-white shadow-lg h-screen p-6 flex flex-col border-r border-gray-200 
            ${isExpanded ? 'w-56' : 'w-20'} transition-all duration-300`}>

            {/* Sidebar Header & Toggle Button */}
            <div className="flex items-center justify-between mb-6">
                {isExpanded && <h2 className="text-lg font-bold text-blue-700">Admin Panel</h2>}
                <button onClick={() => setIsExpanded(!isExpanded)} className="focus:outline-none">
                    {isExpanded ? (
                        <MdChevronLeft className="text-blue-700 text-3xl" />
                    ) : (
                        <MdChevronRight className="text-blue-700 text-3xl" />
                    )}
                </button>
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <div className="flex flex-col">
                            {/* Main navigation button */}
                            <button
                                onClick={() => {
                                    if (item.hasDropdown) {
                                        toggleDropdown(item.section);
                                    } else {
                                        navigate(item.path);
                                    }
                                }}
                                className={`flex items-center p-3 rounded-lg transition-all duration-300 text-gray-700 font-medium w-full text-left
                                    ${location.pathname === item.path ? 'bg-blue-300 text-white shadow-md' : 'hover:bg-blue-200'}
                                    ${isExpanded ? 'justify-start' : 'justify-center'}`}
                                title={item.name}
                            >
                                <span className={`transition-all duration-300 
                                    ${isExpanded ? 'text-2xl text-blue-700' : 'text-3xl text-blue-600'}`}>
                                    {item.icon}
                                </span>
                                <span className={`ml-3 flex items-center space-x-2 ${isExpanded ? 'block' : 'hidden'}`}>
                                    <span>{item.name}</span>
                                    {item.hasDropdown && (
                                        <MdExpandMore className={`text-gray-500 text-lg transition-transform duration-200 ${expandedDropdown === item.section ? 'rotate-180' : ''}`} />
                                    )}
                                </span>
                            </button>

                            {/* Dropdown Items */}
                            {item.hasDropdown && expandedDropdown === item.section && (
                                <ul className="ml-4 mt-2 space-y-2 transition-all duration-300">
                                    {item.subItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link 
                                                to={subItem.path} 
                                                className={`flex items-center p-3 rounded-lg transition-all duration-300 font-medium w-full text-left 
                                                    ${location.pathname === subItem.path ? 'bg-blue-300 text-white shadow-md' : 'hover:bg-blue-200'}
                                                    ${isExpanded ? 'justify-start' : 'justify-center'}`}
                                            >
                                                <span className="text-lg text-blue-700">{subItem.icon}</span>
                                                <span className={`ml-3 ${isExpanded ? 'block' : 'hidden'}`}>{subItem.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
