import { Link, Outlet, useLocation } from "react-router"
import { Building2, Menu, X } from "lucide-react"
import { sidebars } from "@/data/userType"
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { betaFeedbackAPI } from "@/services/api"

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [newFeedbackCount, setNewFeedbackCount] = useState(0)

  const getSidebarItems = (role_id) => {
    switch (role_id) {
      case 1:
        return sidebars.superadmin;
      case 2:
        return sidebars.admin;
      case 3:
        return sidebars.agent;
      case 5:
        return sidebars.buyer;
      case 6:
        return sidebars.seller;
      case 7:
        return sidebars.investor;
      case 8:
        return sidebars.renter;
      default:
        return sidebars.buyer;
    }
  }

  const location = useLocation()
  const { user } = useAuth();

  const sidebarItems = getSidebarItems(user.role_id);

  useEffect(() => {
    const loadNewFeedbackCount = async () => {
      if (user?.role_id !== 1) {
        setNewFeedbackCount(0)
        return
      }

      try {
        const response = await betaFeedbackAPI.getAll({ status: "new", per_page: 100 })
        const list = Array.isArray(response.data?.data) ? response.data.data : []
        setNewFeedbackCount(response.data?.total ?? list.length)
      } catch (error) {
        console.error("Error loading beta feedback count:", error)
        setNewFeedbackCount(0)
      }
    }

    loadNewFeedbackCount()
  }, [user?.role_id])

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border px-4 py-3 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="inline-flex items-center gap-2"
        >
          {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          Menu
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border min-h-screen transform transition-transform duration-200 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Building2 className="h-6 w-6 text-accent" />
              <span className="font-bold text-lg">
                {user.role_id === 1 || user.role_id === 2 ? "Admin Panel" : "Dashboard Panel"}
              </span>

            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                    {user.role_id === 1 && item.path === "/dashboard/beta-feedback" && newFeedbackCount > 0 && (
                      <Badge className="ml-auto bg-primary text-primary-foreground">
                        {newFeedbackCount}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {isSidebarOpen && (
          <button
            aria-label="Close sidebar"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
