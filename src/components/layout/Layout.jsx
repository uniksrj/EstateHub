import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
import { Toaster } from "sonner"
import BetaNotice from "@/components/common/BetaNotice"
import BetaFeedbackWidget from "@/components/common/BetaFeedbackWidget"

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BetaNotice />
      <BetaFeedbackWidget />
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
