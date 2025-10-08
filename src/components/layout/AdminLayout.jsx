import { Outlet } from "react-router"
import { Building2, Plus, Settings, BarChart3 } from "lucide-react"
import { Link, useLocation } from "react-router"
import { sidebars } from "@/data/userType"
import { useAuth } from "@/hooks/useAuth"

const AdminLayout = () => {
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
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border">
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
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
