import { Outlet } from "react-router"
import { Building2, Plus, Settings, BarChart3 } from "lucide-react"
import { Link, useLocation } from "react-router"
import { sidebars } from "@/data/userType"

const AdminLayout = () => {
  const location = useLocation()

  // const sidebarItems = [
  //   { path: "/admin", label: "Dashboard", icon: BarChart3 },
  //   { path: "/admin/add-property", label: "Add Property", icon: Plus },
  //   { path: "/admin/manage-properties", label: "Manage Properties", icon: Settings },
  // ]

  const sidebarItems = sidebars.admin;


  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Building2 className="h-6 w-6 text-accent" />
              <span className="font-bold text-lg">Admin Panel</span>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
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
