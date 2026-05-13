import { lazy } from "react"
import { createBrowserRouter } from "react-router"
import Layout from "../components/layout/Layout"
import ProtectedRoute from "../components/common/ProtectedRoute"
import AdminLayout from "../components/layout/AdminLayout"
import { USER_ROLES } from "@/config/routeConfig"
import GuestRoute from "@/components/common/GuestRoute"

const PropertyList = lazy(() => import("../pages/Properties/PropertyList"))
const PropertyDetail = lazy(() => import("../pages/Properties/PropertyDetail"))
const AuthPage = lazy(() => import("../pages/Auth/AuthPage"))
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"))
const AddProperty = lazy(() => import("../pages/Dashboard/AddProperty"))
const ManageProperties = lazy(() => import("../pages/Dashboard/ManageProperties"))
const ContactPage = lazy(() => import("@/pages/Contact/ContactPage"))
const BetaFeedbackPage = lazy(() => import("@/pages/BetaFeedback/BetaFeedbackPage"))
const PrivacyPolicy = lazy(() => import("@/pages/misc/PrivacyPolicy"))
const TermsOfService = lazy(() => import("@/pages/misc/TermsOfService"))
const NotFound = lazy(() => import("@/pages/misc/NotFound"))
const Dashboard = lazy(() => import("@/components/dashboard/Dashboard"))
const UserManagementPage = lazy(() => import("@/pages/Dashboard/Admin/User/Users"))
const Unauthorized = lazy(() => import("@/pages/misc/Unauthorized"))
const ResetPassword = lazy(() => import("@/pages/Auth/ResetPassword"))
const Propertiespage = lazy(() => import("@/pages/Dashboard/Admin/Properties/Propertiespage"))
const FinancialReport = lazy(() => import("@/pages/Dashboard/Admin/Finance/FinancialReport"))
const Systemsetting = lazy(() => import("@/pages/Dashboard/Admin/System/Systemsetting"))
const ListingPage = lazy(() => import("@/pages/Dashboard/Seller/properties/ListingPage"))
const FindProperties = lazy(() => import("@/pages/Dashboard/Buyer/FindProperties"))
const FavoritePage = lazy(() => import("@/pages/Dashboard/Buyer/FavoritePage"))
const SellerInquiryPage = lazy(() =>
  import("@/pages/Dashboard/Seller/SellerInquiry").then((module) => ({ default: module.SellerInquiryPage }))
)
const BuyerInquiryPage = lazy(() =>
  import("@/pages/Dashboard/Buyer/BuyerInquiry").then((module) => ({ default: module.BuyerInquiryPage }))
)
const AgentDashboard = lazy(() => import("@/pages/Dashboard/Agent/Dashboard"))
const AgentInquiry = lazy(() =>
  import("@/pages/Dashboard/Agent/AgentInquiry").then((module) => ({ default: module.AgentInquiry }))
)
const AgentListing = lazy(() => import("@/pages/Dashboard/Agent/AgentListing"))
const AgentPipeline = lazy(() => import("@/pages/Dashboard/Agent/pipeline/AgentPipeline"))
const AgentDealLosses = lazy(() => import("@/pages/Dashboard/Agent/deal-losses/AgentDealLosses"))
const AgentClients = lazy(() => import("@/pages/Dashboard/Agent/AgentClients"))
const SchedulePage = lazy(() => import("@/components/common/schedule/SchedulePage"))
const PreferencesAlerts = lazy(() => import("@/pages/Dashboard/Buyer/PreferencesAlerts"))
const MortgageTools = lazy(() => import("@/pages/Dashboard/Buyer/MortgageTools"))
const DocumentsPage = lazy(() => import("@/pages/Dashboard/Buyer/DocumentsPage"))
const MarketInsights = lazy(() => import("@/pages/Dashboard/Buyer/MarketInsights"))
const HomePage = lazy(() => import("@/pages/Home/HomePage"))
const Offers = lazy(() => import("@/pages/Dashboard/offer/Offers"))
const ProfilePage = lazy(() => import("@/pages/Profile/ProfilePage"))
const BetaFeedbackInbox = lazy(() => import("@/pages/Dashboard/Admin/BetaFeedback/BetaFeedbackInbox"))
const AboutPage = lazy(() => import("@/pages/About/AboutPage"))
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
            path: ":type",
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
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "contact", Component: ContactPage
      },
      {
        path: "about", Component: AboutPage
      },
      // {
      //   path: "find-agent", Component: ContactPage
      // },
      {
        path: "beta-feedback", Component: BetaFeedbackPage
      },
      {
        path: "privacy", Component: PrivacyPolicy
      },
      {
        path: "terms", Component: TermsOfService
      },
      {
        path: "auth",
        element: <GuestRoute />,
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
          {
            path: "system",
            element: (
              <ProtectedRoute allowedRoles={[USER_ROLES.SUPERADMIN]}>
                <Systemsetting />
              </ProtectedRoute>
            )
          },
          {
            path: "beta-feedback",
            element: (
              <ProtectedRoute allowedRoles={[USER_ROLES.SUPERADMIN]}>
                <BetaFeedbackInbox />
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
          { path: "offers", Component: Offers },
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
