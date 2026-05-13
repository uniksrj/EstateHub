import { lazy, Suspense } from "react"
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { Toaster } from "sonner"

const BetaNotice = lazy(() => import("@/components/common/BetaNotice"))
const BetaFeedbackWidget = lazy(() => import("@/components/common/BetaFeedbackWidget"))

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={null}>
        <BetaNotice />
        <BetaFeedbackWidget />
      </Suspense>
      <main className="flex-1">
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-background border border-border',
            duration: 4000,
          }}
        />
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
