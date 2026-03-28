import { createBrowserRouter } from "react-router"
import Layout from "../components/layout/Layout"
import PropertyList from "../pages/Properties/PropertyList"
import PropertyDetail from "../pages/Properties/PropertyDetail"
import AuthPage from "../pages/Auth/AuthPage"
import ForgotPassword from "../pages/Auth/ForgotPassword"
import AddProperty from "../pages/Dashboard/AddProperty"
import ManageProperties from "../pages/Dashboard/ManageProperties"
import ProtectedRoute from "../components/common/ProtectedRoute"
import AdminLayout from "../components/layout/AdminLayout"
import ContactPage from "@/pages/Contact/ContactPage"
import PrivacyPolicy from "@/pages/misc/PrivacyPolicy "
import TermsOfService from "@/pages/misc/TermsOfService "
import NotFound from "@/pages/misc/NotFound"
import AdminDashboard from "@/pages/Dashboard/Admin/Analytics/Dashboard"
import Dashboard from "@/components/dashboard/Dashboard"
import UserManagementPage from "@/pages/Dashboard/Admin/User/Users"
import { USER_ROLES } from "@/config/routeConfig"
import Unauthorized from "@/pages/misc/Unauthorized"
import ResetPassword from "@/pages/Auth/ResetPassword"
import Propertiespage from "@/pages/Dashboard/Admin/Properties/Propertiespage"
import FinancialReport from "@/pages/Dashboard/Admin/Finance/FinancialReport"
import ListingPage from "@/pages/Dashboard/Seller/properties/ListingPage"
import FindProperties from "@/pages/Dashboard/Buyer/FindProperties"
import FavoritePage from "@/pages/Dashboard/Buyer/FavoritePage"
import { SellerInquiryPage } from "@/pages/Dashboard/Seller/SellerInquiry"
import { BuyerInquiryPage } from "@/pages/Dashboard/Buyer/BuyerInquiry"
import AgentDashboard from "@/pages/Dashboard/Agent/Dashboard"
import { AgentInquiry } from "@/pages/Dashboard/Agent/AgentInquiry"
import AgentListing from "@/pages/Dashboard/Agent/AgentListing"
import AgentPipeline from "@/pages/Dashboard/Agent/pipeline/AgentPipeline"
import AgentDealLosses from "@/pages/Dashboard/Agent/deal-losses/AgentDealLosses"
import AgentClients from "@/pages/Dashboard/Agent/AgentClients"
import SchedulePage from "@/components/common/schedule/SchedulePage"
import PreferencesAlerts from "@/pages/Dashboard/Buyer/PreferencesAlerts"
import MortgageTools from "@/pages/Dashboard/Buyer/MortgageTools"
import DocumentsPage from "@/pages/Dashboard/Buyer/DocumentsPage"
import MarketInsights from "@/pages/Dashboard/Buyer/MarketInsights"
import HomePage from "@/pages/Home/HomePage"
import Offers from "@/pages/Dashboard/offer/Offers "
import PropertyByType from "@/pages/Dashboard/Buyer/PropertyByType"
// Create the data router
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "properties",
        children: [
          {
            index: true,
            Component: PropertyList,
          },
          {
            path: ":id/view",
            Component: PropertyDetail,
            errorElement: <div>Error loading property</div>,
          },
          {
            path: ":id/edit",
            element: (
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            ),
            errorElement: <div>Error loading property</div>,
          },
        ],
      },      
      {
        path: "contact", Component: ContactPage
      },
      {
        path: "privacy-policy", Component: PrivacyPolicy
      },
      {
        path: "terms-of-service", Component: TermsOfService
      },
      {
        path: "auth",
        children: [
          { index: true, Component: AuthPage, },
          { path: "login", Component: AuthPage },
          { path: "register", Component: AuthPage },
          { path: "forgot-password", Component: ForgotPassword, },
          { path: "reset-password", Component: ResetPassword, },
        ],
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: Dashboard, },
          { path: "add-property", Component: AddProperty, },
          { path: "manage-properties", Component: ManageProperties, },
          {
            path: "users",
            element: (
              <ProtectedRoute allowedRoles={[USER_ROLES.SUPERADMIN]}>
                <UserManagementPage />
              </ProtectedRoute>
            )
          },
          {
            path: "properties",
            element: (
              <ProtectedRoute allowedRoles={[USER_ROLES.SUPERADMIN]}>
                <Propertiespage />
              </ProtectedRoute>
            )
          },
          {
            path: "finance",
            element: (
              <ProtectedRoute allowedRoles={[USER_ROLES.SUPERADMIN]}>
                <FinancialReport />
              </ProtectedRoute>
            )
          },
        ],
      },
      //  Seller */
      {
        path: "seller",
        element: (
          <ProtectedRoute allowedRoles={[USER_ROLES.SELLER]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: Dashboard },
          { path: "add-property", Component: AddProperty },
          { path: "manage-properties", Component: ManageProperties },
          { path: "properties", Component: ListingPage },
          { path: "properties/:id/edit", Component: AddProperty, errorElement: <div>Error loading property</div>, },
          { path: "inquiries", Component: SellerInquiryPage },
        ],
      },
      //  Buyer */
      {
        path: "buyer",
        element: (
          <ProtectedRoute allowedRoles={[USER_ROLES.BUYER]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: Dashboard },
          { path: "search", Component: FindProperties },
          { path: "favorites", Component: FavoritePage },
          { path: "inquiries", Component: BuyerInquiryPage },
          { path: "schedule", Component: SchedulePage },
          { path: "preferences-alerts", Component: PreferencesAlerts },
          { path: "offers", Component: Offers },
          { path: "mortgage-tools", Component: MortgageTools },
          { path: "documents", Component: DocumentsPage },
          { path: "market-insight", Component: MarketInsights },
        ],
      },
      //** 
      //  Agent */
      {
        path: "agent",
        element: (
          <ProtectedRoute allowedRoles={[USER_ROLES.AGENT]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: AgentDashboard },
          { path: "inquiries", Component: AgentInquiry },
          { path: "add-property", Component: AddProperty },
          { path: "manage-properties", Component: ManageProperties },
          { path: "offers", Component: Offers },
          { path: "properties", Component: AgentListing },
          { path: "pipeline", Component: AgentPipeline },
          { path: "clients", Component: AgentClients },
          { path: "schedule", Component: SchedulePage },
          { path: "deal-losses", Component: AgentDealLosses },
          { path: "properties/:id/edit", Component: AddProperty, errorElement: <div>Error loading property</div>, },
        ],
      },
      {
        path: "*",
        Component: NotFound,
      },
      {
        path: "unauthorized",
        Component: Unauthorized
      }
    ],
  },
])

export default router
