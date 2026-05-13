import { lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboard = lazy(() => import("@/pages/Dashboard/Admin/Analytics/Dashboard"));
const AgentDashboard = lazy(() => import("@/pages/Dashboard/Agent/Dashboard"));
const BuyerDashboard = lazy(() => import("@/pages/Dashboard/Buyer/Dashboard"));
const SellerDashboard = lazy(() => import("@/pages/Dashboard/Seller/Dashboard"));
const InvestorDashboard = lazy(() => import("@/pages/Dashboard/Investor/Dashboard"));
const RenterDashboard = lazy(() => import("@/pages/Dashboard/Renter/Dashboard"));

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  let RoleDashboard = BuyerDashboard;

  switch (user.role_id) {
    case 1:
    case 2:
      RoleDashboard = AdminDashboard;
      break;
    case 3:
      RoleDashboard = AgentDashboard;
      break;
    case 5:
      RoleDashboard = BuyerDashboard;
      break;
    case 6:
      RoleDashboard = SellerDashboard;
      break;
    case 7:
      RoleDashboard = InvestorDashboard;
      break;
    case 8:
      RoleDashboard = RenterDashboard;
      break;
    default:
      RoleDashboard = BuyerDashboard;
  }

  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <RoleDashboard />
    </Suspense>
  );
};

export default Dashboard;
