
import AgentDashboard from "@/pages/Dashboard/Agent/Dashboard";
import BuyerDashboard from "@/pages/Dashboard/Buyer/Dashboard";
import SellerDashboard from "@/pages/Dashboard/Seller/Dashboard";
import InvestorDashboard from "@/pages/Dashboard/Investor/Dashboard";
import RenterDashboard from "@/pages/Dashboard/Renter/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "@/pages/Dashboard/Admin/Analytics/Dashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  switch (user.role_id) {
    case 1:
      return <AdminDashboard />;
    case 2:
      return <AdminDashboard />;
    case 3:
      return <AgentDashboard />;
       case 5:
      return <BuyerDashboard />;
       case 6:
      return <SellerDashboard />;
       case 7:
      return <InvestorDashboard />;
       case 8:
      return <RenterDashboard />;
    default:
      return <BuyerDashboard />;
  }
};

export default Dashboard;
