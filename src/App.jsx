import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import NewsPage from "./pages/NewsPage";
import FaqsPage from "./pages/FaqsPage";
import Milestone from "./pages/Milestone";

// Barangay Officials Pages
import BrgyOfficials from "./pages/BrgyOfficials";
import SkOfficials from "./pages/SkOfficials";
import BrgyLupon from "./pages/BrgyLupon";

// Auth Pages
import Login from "./Admin/Login";

// Admin Pages
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Feedback from "./Admin/Feedback";
import Reports from "./Admin/Reports";
import EditNewsPage from "./Admin/EditNewsPage";
import EditFAQsPage from "./Admin/EditFAQsPage";
import FAQsHistory from "./Admin/FAQsHistory";
import NewsHistory from "./Admin/NewsHistory";

import EditMilestone from "./Admin/EditMilestone";
import AdminRegistration from "./Admin/AdminRegistration";
import EditEvents from "./Admin/EditEvents";
import RequestCertificate from "./services/RequestCertificate";
import RequestInbox from "./Admin/RequestInbox";
import EditCommercial from "./Admin/EditCommercial";
import PromoteBusiness from "./Admin/PromoteBusiness";
import BusinessPermitRequests from "./Admin/BusinessPermitRequest";
import BuildingPermitRequest from "./Admin/BuildingPermitRequest";



const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/milestone" element={<Milestone />} /> 






          {/* Practice */}
          <Route path="/req" element={<RequestCertificate />} /> 
          



          


          {/* Barangay Officials Pages */}
          <Route path="/brgy-officials" element={<BrgyOfficials />} />
          <Route path="/sk-officials" element={<SkOfficials />} />
          <Route path="/brgy-lupon" element={<BrgyLupon />} />


          {/* Admin Registration */}
          <Route path="/adminreg" element={<AdminRegistration />} />


          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="editNewsPage" element={<EditNewsPage />} />
            <Route path="editFAQsPage" element={<EditFAQsPage />} />
            <Route path="editmilestone" element={<EditMilestone />} />
            <Route path="editcommercial" element={<EditCommercial />} />
            <Route path="editevents" element={<EditEvents />} />
            <Route path="reqCertificate" element={<RequestInbox />} /> 
            <Route path="reqBusinessPermit" element={<BusinessPermitRequests />} /> 
            <Route path="reqBuildingPermit" element={<BuildingPermitRequest />} /> 
            <Route path="promoteBusiness" element={<PromoteBusiness />} /> 
            <Route path="feedback" element={<Feedback />} />
            <Route path="reports" element={<Reports />} />
            <Route path="historyFAQs" element={<FAQsHistory />} />
            <Route path="historyNews" element={<NewsHistory />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
