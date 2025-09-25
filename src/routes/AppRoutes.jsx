import { createBrowserRouter } from "react-router"
import Layout from "../components/layout/Layout"
import Home from "../pages/Home/Home"
import PropertyList from "../pages/Properties/PropertyList"
import PropertyDetail from "../pages/Properties/PropertyDetail"
// import Login from "../pages/Auth/Login"
// import Register from "../pages/Auth/Register"
import AuthPage from "../pages/Auth/AuthPage"
import ForgotPassword from "../pages/Auth/ForgotPassword"
import Dashboard from "../pages/Dashboard/Dashboard"
import AddProperty from "../pages/Dashboard/AddProperty"
import ManageProperties from "../pages/Dashboard/ManageProperties"
import NotFound from "../pages/NotFound"
import ProtectedRoute from "../components/common/ProtectedRoute"
import AdminLayout from "../components/layout/AdminLayout"
import ContactPage from "@/pages/Contact/ContactPage"
import PrivacyPolicy from "@/components/common/PrivacyPolicy "
import TermsOfService from "@/components/common/TermsOfService "

// Create the data router
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "properties",
        children: [
          {
            index: true,
            Component: PropertyList,
          },
          {
            path: ":id",
            Component: PropertyDetail,
            errorElement: <div>Error loading property</div>,
          },
        ],
      },
      {
        path: "contact", Component : ContactPage
      },
      {
        path: "privacy-policy", Component : PrivacyPolicy
      },
      {
        path: "terms-of-service", Component : TermsOfService
      },
      {
        path: "auth",
        
        children: [
          {
            index: true,
            Component: AuthPage,
          },
          {
            path: "login",
            Component : AuthPage
            // Component: Login,
          },
          {
            path: "register",
            Component : AuthPage
            // Component: Register,
          },
          {
            path: "forgot-password",
            Component: ForgotPassword,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            Component: Dashboard,
          },
          {
            path: "add-property",
            Component: AddProperty,
          },
          {
            path: "manage-properties",
            Component: ManageProperties,
          },
        ],
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
])

export default router
