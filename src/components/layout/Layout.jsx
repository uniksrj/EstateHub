import { lazy, Suspense } from "react"
import { Outlet, useLocation } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { Toaster } from "sonner"
import AnalyticsPageTracker from "@/components/common/AnalyticsPageTracker"
import MotionObserver from "@/components/common/motion/MotionObserver"

const BetaNotice = lazy(() => import("@/components/common/BetaNotice"))
const BetaFeedbackWidget = lazy(() => import("@/components/common/BetaFeedbackWidget"))

const Layout = () => {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={null}>
        <BetaNotice />
        <BetaFeedbackWidget />
      </Suspense>
      <AnalyticsPageTracker />
      <main className="flex-1">
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-background border border-border',
            duration: 4000,
          }}
        />
        <MotionObserver />
        <div key={pathname} className="route-content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
