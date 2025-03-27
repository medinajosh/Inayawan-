import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    // Define page titles based on the route
    const pageTitles = {
        "/admin/dashboard": "Admin Dashboard",
        "/admin/editNewsPage": "Edit News Page",
        "/admin/editcommercial": "Edit Commercial Page",
        "/admin/editmilestone" : "Edit Milestone Page",
        "/admin/editFAQsPage": "Edit FAQs Page",
        "/admin/historyFAQs": "FAQs History",
        "/admin/historyNews": "News History",
        "/admin/promoteBusiness": "Promote Business",
        "/admin/reqCertificate": "Certificate Request",
        "/admin/reqBusinessPermit": "Business Permit Request",
        "/admin/reqBuildingPermit": "Building Permit Request",
        "/admin/feedback": "Feedback",
        "/admin/reports": "Reports"
    };

    // Get current page title, default to "Admin Dashboard"
    const pageTitle = pageTitles[location.pathname] || "Admin Dashboard";

    return (
        <header className="text-2xl font-bold text-blue-700">
            <h2 className="text-xl">{pageTitle}</h2>
        </header>
    );
};

export default Navbar;
