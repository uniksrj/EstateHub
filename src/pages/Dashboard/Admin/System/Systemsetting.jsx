"use client"

import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CircleDollarSign,
  FileText,
  Lock,
  RefreshCw,
  Settings2,
  Shield,
  Sparkles,
  Users,
} from "lucide-react"
import MetricCard from "@/components/common/MetricCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { USER_ROLES } from "@/config/routeConfig"
import { useAuth } from "@/hooks/useAuth"
import { useTheme } from "@/hooks/useTheme"
import { superAdminAPI, userAPI } from "@/services/api"

const formatNumber = (value) => Number(value || 0).toLocaleString()

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0))

const formatPercent = (value) => `${Number(value || 0).toFixed(1)}%`

export default function Systemsetting() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [loadError, setLoadError] = useState("")
  const [userMetrics, setUserMetrics] = useState(null)
  const [propertyMetrics, setPropertyMetrics] = useState(null)

  const loadSystemOverview = async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    setLoadError("")

    try {
      const [usersResult, propertiesResult] = await Promise.allSettled([
        userAPI.getUser_metrics(),
        superAdminAPI.getAllProperties(),
      ])

      if (usersResult.status === "fulfilled") {
        setUserMetrics(usersResult.value.data)
      }

      if (propertiesResult.status === "fulfilled") {
        setPropertyMetrics(propertiesResult.value.data)
      }

      if (
        usersResult.status === "rejected" &&
        propertiesResult.status === "rejected"
      ) {
        setLoadError("Unable to load system overview right now.")
      } else if (
        usersResult.status === "rejected" ||
        propertiesResult.status === "rejected"
      ) {
        setLoadError("Some system sections could not be refreshed, but the page is still available.")
      }
    } catch (error) {
      console.error("Error loading system settings:", error)
      setLoadError("Unable to load system overview right now.")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadSystemOverview()
  }, [])

  if (user?.role_id !== USER_ROLES.SUPERADMIN) {
    return <Navigate to="/unauthorized" replace />
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    )
  }

  const usersOverview = userMetrics?.metrics || {}
  const platformOverview = propertyMetrics?.metrics?.overview || {}

  const responsibilityCards = [
    {
      title: "Access and role control",
      description: "Create admins, review risky accounts, and lock down the parts of the platform that should stay restricted.",
      icon: Shield,
      path: "/dashboard/users",
      cta: "Open user management",
    },
    {
      title: "Marketplace oversight",
      description: "Review every listing, check inventory quality, and step in when platform-wide property issues need escalation.",
      icon: Building2,
      path: "/dashboard/properties",
      cta: "Review all properties",
    },
    {
      title: "Revenue and reporting",
      description: "Track total platform value, closed sales, and financial health before making operational decisions.",
      icon: CircleDollarSign,
      path: "/dashboard/finance",
      cta: "View financial reports",
    },
    {
      title: "Platform policy and content",
      description: "Coordinate major system changes, public content updates, and release-level governance across the marketplace.",
      icon: FileText,
      path: "/dashboard",
      cta: "Back to analytics",
    },
  ]

  const checklistItems = [
    "Review new user growth and active account changes before adjusting access policies.",
    "Audit inactive or suspended accounts regularly to protect marketplace quality.",
    "Monitor listing volume and sold inventory to catch platform-wide performance issues early.",
    "Validate revenue, portfolio value, and conversion trends before strategic changes.",
    "Use this page as the control center for superadmin-only decisions and cross-team coordination.",
  ]

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
            <Badge className="bg-rose-600 text-white hover:bg-rose-600">
              Superadmin Only
            </Badge>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            This page is reserved for platform-level decisions. A superadmin can control access,
            review marketplace health, monitor financial performance, and coordinate system-wide
            governance from here.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={toggleTheme}>
            <Sparkles className="h-4 w-4" />
            Theme: {theme === "dark" ? "Dark" : "Light"}
          </Button>
          <Button variant="outline" onClick={() => loadSystemOverview({ silent: true })}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loadError ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {loadError}
        </div>
      ) : null}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={formatNumber(usersOverview?.total_users?.value)}
          change={`${usersOverview?.total_users?.change >= 0 ? "+" : ""}${usersOverview?.total_users?.change || 0}%`}
          icon={Users}
        />
        <MetricCard
          title="Active Users"
          value={formatNumber(usersOverview?.active_users?.value)}
          change={`${usersOverview?.active_users?.change >= 0 ? "+" : ""}${usersOverview?.active_users?.change || 0}%`}
          icon={BadgeCheck}
        />
        <MetricCard
          title="Total Properties"
          value={formatNumber(platformOverview?.totalProperties)}
          change={`+${platformOverview?.propertiesGrowthA?.change || 0}%`}
          icon={Building2}
        />
        <MetricCard
          title="Active Listings"
          value={formatNumber(platformOverview?.activeListings)}
          change={`${platformOverview?.activeDeals?.trend === "down" ? "-" : "+"}${platformOverview?.activeDeals?.change || 0}%`}
          icon={BarChart3}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>What a superadmin does here</CardTitle>
            <CardDescription>
              These are the high-impact tasks that belong on this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {responsibilityCards.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="rounded-xl border bg-muted/20 p-4"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline">Priority</Badge>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
                  <Button variant="outline" asChild>
                    <Link to={item.path}>
                      {item.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Control Checklist</CardTitle>
            <CardDescription>
              A quick reminder of the decisions that should stay with the superadmin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklistItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border p-3">
                <Lock className="mt-0.5 h-4 w-4 text-primary" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Access Snapshot</CardTitle>
            <CardDescription>
              Current authority level for this session.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <p className="mt-1 font-semibold text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Role ID: {user?.role_id}</Badge>
              <Badge variant="secondary">Full platform access</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>
              Fast-read system-wide business indicators.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">Portfolio value</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">
                {formatCurrency(platformOverview?.totalValue)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Sold this month
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {formatNumber(platformOverview?.soldThisMonth)}
                </p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Occupancy rate
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {formatPercent(platformOverview?.occupancyRate)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Controls</CardTitle>
            <CardDescription>
              Jump straight to the main superadmin work areas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-between" asChild>
              <Link to="/dashboard/users">
                Manage users
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button className="w-full justify-between" variant="outline" asChild>
              <Link to="/dashboard/properties">
                Review listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button className="w-full justify-between" variant="outline" asChild>
              <Link to="/dashboard/finance">
                Open financial reports
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button className="w-full justify-between" variant="outline" asChild>
              <Link to="/dashboard">
                Back to platform analytics
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <div className="rounded-xl border border-dashed p-4">
              <div className="mb-2 flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-primary" />
                <p className="font-medium text-foreground">Future backend settings</p>
              </div>
              <p className="text-sm text-muted-foreground">
                If you want, we can next connect this page to a new backend API for saved
                platform settings like maintenance mode, branding, or global configuration.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
