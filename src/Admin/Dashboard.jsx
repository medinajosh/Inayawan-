import BuildingPermitDashboard from "../dashboard/BuildingPermitDashboard";
import BusinessPermitDashboard from "../dashboard/BusinessPermitDashboard";
import CommercialDashboard from "../dashboard/CommercialDashboard";
import BarangayCertificateDashboard from "../dashboard/BarangayCertificateDashboard";
import FeedbackDashboard from "../dashboard/FeedbackDashboard";
import ReportsDashboard from "../dashboard/ReportsDashboard";

const Dashboard = () => {
  return (
    <>
      <CommercialDashboard />
      <BarangayCertificateDashboard />
      <BuildingPermitDashboard />
      <BusinessPermitDashboard />
      <FeedbackDashboard />
      <ReportsDashboard />
    </>
  );
};

export default Dashboard;
