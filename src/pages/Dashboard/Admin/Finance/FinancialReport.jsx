import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  BadgeDollarSign,
  Building2,
  CircleDollarSign,
  Landmark,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { superAdminAPI } from "@/services/api"
import { Loading } from "@/pages/misc/Loading"
import DateRangePicker from "@/components/common/DateRangePicker"
import MetricCard from "@/components/common/MetricCard"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const FINANCIAL_SPLIT_COLORS = ["#0f766e", "#f59e0b", "#2563eb"]

const formatCurrency = (value, compact = false) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(Number(value) || 0)

const formatPercent = (value) => `${Number(value || 0).toFixed(1)}%`

const formatSignedChange = (value) => {
  const amount = Number(value || 0)
  return `${amount >= 0 ? "+" : ""}${amount.toFixed(1)}%`
}

const percentageChange = (current, previous) => {
  const safeCurrent = Number(current || 0)
  const safePrevious = Number(previous || 0)

  if (safePrevious === 0) {
    return safeCurrent > 0 ? 100 : 0
  }

  return ((safeCurrent - safePrevious) / safePrevious) * 100
}

const getPropertyAmount = (property) =>
  Number(property?.sale_price || property?.price || 0)

const getStatusLabel = (status) => {
  switch (status) {
    case "for_sale":
      return "Active"
    case "under_review":
      return "Under Review"
    case "pending":
      return "Negotiation"
    case "sold":
      return "Closed"
    case "for_rent":
      return "Rental"
    case "draft":
      return "Draft"
    default:
      return status || "Unknown"
  }
}

const getStatusVariant = (status) => {
  switch (status) {
    case "sold":
      return "default"
    case "pending":
      return "secondary"
    default:
      return "outline"
  }
}

const formatDate = (value) => {
  if (!value) return "Not closed"

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value))
}

const FinanceTooltip = ({ active, payload, label, formatValue = (value) => value }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
      <p className="mb-2 text-sm font-semibold text-foreground">{label}</p>
      <div className="space-y-1">
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {formatValue(entry.value, entry.dataKey)}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function FinancialReport() {
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFinancialReport = async () => {
      setLoading(true)
      try {
        const response = await superAdminAPI.getAllProperties()
        setReportData(response.data)
      } catch (error) {
        console.error("Error fetching financial report data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFinancialReport()
  }, [])

  if (loading) {
    return <Loading loading={loading} isLineLoader={true} />
  }

  const properties = reportData?.properties || []
  const overview = reportData?.metrics?.overview || {}
  const monthlyTrends = reportData?.charts?.monthlyTrends || []
  const locationDistribution = reportData?.charts?.locationDistribution || []
  const pipelineStages = reportData?.charts?.dealPipeline || []
  const performanceMetrics = reportData?.charts?.performanceMetrics || []

  const soldProperties = properties.filter(
    (property) => property?.sold_at || property?.status === "sold"
  )
  const liveListings = properties.filter(
    (property) => !property?.sold_at && property?.status !== "sold"
  )

  const closedRevenue = soldProperties.reduce(
    (total, property) => total + getPropertyAmount(property),
    0
  )
  const liveInventoryValue = liveListings.reduce(
    (total, property) => total + Number(property?.price || 0),
    0
  )
  const grossPortfolioValue = properties.reduce(
    (total, property) => total + Number(property?.price || 0),
    0
  )
  const projectedPipelineValue =
    pipelineStages.reduce((total, stage) => total + Number(stage?.value || 0), 0) * 10000000
  const closedDealAverage = soldProperties.length
    ? closedRevenue / soldProperties.length
    : 0

  const latestMonth = monthlyTrends[monthlyTrends.length - 1] || {}
  const previousMonth = monthlyTrends[monthlyTrends.length - 2] || {}
  const revenueGrowth = percentageChange(latestMonth?.revenue, previousMonth?.revenue)
  const salesGrowth = percentageChange(latestMonth?.sales, previousMonth?.sales)
  const averageDealGrowth = percentageChange(
    latestMonth?.sales ? latestMonth.revenue / latestMonth.sales : 0,
    previousMonth?.sales ? previousMonth.revenue / previousMonth.sales : 0
  )

  const financialSplit = [
    { name: "Closed Revenue", value: closedRevenue },
    { name: "Open Inventory", value: liveInventoryValue },
    {
      name: "Pipeline Forecast",
      value: Math.max(projectedPipelineValue - closedRevenue, 0),
    },
  ].filter((item) => item.value > 0)

  const topMarkets = [...locationDistribution]
    .sort((first, second) => Number(second?.avgPrice || 0) - Number(first?.avgPrice || 0))
    .slice(0, 6)

  const recentClosings = [...soldProperties]
    .sort((first, second) => new Date(second?.sold_at || 0) - new Date(first?.sold_at || 0))
    .slice(0, 8)

  const premiumListings = [...liveListings]
    .sort((first, second) => Number(second?.price || 0) - Number(first?.price || 0))
    .slice(0, 8)

  const closeRate = properties.length ? (soldProperties.length / properties.length) * 100 : 0
  const revenueRealization = grossPortfolioValue
    ? (closedRevenue / grossPortfolioValue) * 100
    : 0
  const pipelineCoverage = closedRevenue
    ? (projectedPipelineValue / closedRevenue) * 100
    : 0

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Financial Reports</h1>
            <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
              Superadmin Only
            </Badge>
          </div>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Track platform revenue, monitor live inventory exposure, and review high-value
            transactions across the entire marketplace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DateRangePicker />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Gross Portfolio Value"
          value={formatCurrency(grossPortfolioValue, true)}
          change={formatSignedChange(overview?.valueGrowth?.change)}
          icon={Landmark}
        />
        <MetricCard
          title="Closed Revenue"
          value={formatCurrency(closedRevenue, true)}
          icon={BadgeDollarSign}
        />
        <MetricCard
          title="Closed Sales This Month"
          value={(latestMonth?.sales || overview?.soldThisMonth || 0).toLocaleString()}
          change={formatSignedChange(salesGrowth)}
          icon={ReceiptText}
        />
        <MetricCard
          title="Average Closed Deal"
          value={formatCurrency(closedDealAverage, true)}
          change={formatSignedChange(averageDealGrowth)}
          icon={CircleDollarSign}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="gap-3">
          <CardHeader className="pb-0">
            <CardDescription>Revenue realization</CardDescription>
            <CardTitle>{formatPercent(revenueRealization)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Portion of tracked portfolio value that has already converted into closed revenue.
            </p>
          </CardContent>
        </Card>

        <Card className="gap-3">
          <CardHeader className="pb-0">
            <CardDescription>Close rate</CardDescription>
            <CardTitle>{formatPercent(closeRate)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Share of platform inventory that has reached a closed transaction state.
            </p>
          </CardContent>
        </Card>

        <Card className="gap-3">
          <CardHeader className="pb-0">
            <CardDescription>Pipeline coverage</CardDescription>
            <CardTitle>{formatPercent(pipelineCoverage)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Forecasted pipeline value compared with total closed revenue to date.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background">
            Overview
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-background">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="markets" className="data-[state=active]:bg-background">
            Markets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>
                  Monthly revenue and closed sales across the last six reporting periods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrends}>
                      <defs>
                        <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0f766e" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#0f766e" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => formatCurrency(value, true)} />
                      <Tooltip
                        content={
                          <FinanceTooltip formatValue={(value, key) =>
                            key === "sales" ? value : formatCurrency(value)
                          } />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke="#0f766e"
                        fill="url(#revenueFill)"
                        strokeWidth={3}
                      />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        name="Sales"
                        stroke="#2563eb"
                        fillOpacity={0}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capital Split</CardTitle>
                <CardDescription>
                  Closed revenue versus live inventory exposure and forward pipeline value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={financialSplit}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={108}
                        paddingAngle={4}
                      >
                        {financialSplit.map((entry, index) => (
                          <Cell
                            key={`${entry.name}-${index}`}
                            fill={FINANCIAL_SPLIT_COLORS[index % FINANCIAL_SPLIT_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<FinanceTooltip formatValue={(value) => formatCurrency(value)} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-3">
                  {financialSplit.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              FINANCIAL_SPLIT_COLORS[index % FINANCIAL_SPLIT_COLORS.length],
                          }}
                        />
                        <span className="text-sm text-muted-foreground">{entry.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {formatCurrency(entry.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Value by Stage</CardTitle>
                <CardDescription>
                  Financial exposure inside each deal stage, measured in crores of rupees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pipelineStages}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                      <XAxis dataKey="stage" angle={-12} textAnchor="end" height={70} />
                      <YAxis tickFormatter={(value) => `₹${value} Cr`} />
                      <Tooltip
                        content={<FinanceTooltip formatValue={(value) => `₹${Number(value || 0).toFixed(2)} Cr`} />}
                      />
                      <Bar dataKey="value" name="Pipeline Value" radius={[8, 8, 0, 0]} fill="#1d4ed8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Health Signals</CardTitle>
                <CardDescription>
                  Operational indicators that influence revenue quality and transaction speed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceMetrics.map((metric) => (
                  <div
                    key={metric.metric}
                    className="rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{metric.metric}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {formatSignedChange(metric.change)}
                      </span>
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <span className="text-2xl font-bold text-foreground">
                        {metric.metric === "Days on Market"
                          ? `${metric.current} days`
                          : metric.metric === "Price per Sq Ft"
                            ? formatCurrency(metric.current)
                            : formatPercent(metric.current)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Previous:{" "}
                        {metric.metric === "Days on Market"
                          ? `${metric.previous} days`
                          : metric.metric === "Price per Sq Ft"
                            ? formatCurrency(metric.previous)
                            : formatPercent(metric.previous)}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
                  <div className="mb-2 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm font-semibold">Superadmin finance checkpoint</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Latest month closed {latestMonth?.sales || 0} deals worth{" "}
                    {formatCurrency(latestMonth?.revenue || 0)}, while live inventory still holds{" "}
                    {formatCurrency(liveInventoryValue)} in platform exposure.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Closings</CardTitle>
                <CardDescription>
                  Latest completed transactions across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Closed On</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentClosings.length > 0 ? (
                      recentClosings.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{property.title}</p>
                              <p className="text-xs text-muted-foreground">
                                Agent: {property?.agent?.name || "Unassigned"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{property.city || "Unknown"}</TableCell>
                          <TableCell>{formatDate(property.sold_at)}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatCurrency(getPropertyAmount(property))}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                          No closed transactions available yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>High-Value Active Inventory</CardTitle>
                <CardDescription>
                  Largest open listings that currently shape the platform balance sheet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {premiumListings.length > 0 ? (
                      premiumListings.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{property.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {property.city || "Unknown"}, {property.state || "N/A"}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(property.status)}>
                              {getStatusLabel(property.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>{property?.agent?.name || "Unassigned"}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatCurrency(property.price)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                          No active inventory is available for financial review.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="markets" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Top Markets by Average Ticket Size</CardTitle>
                <CardDescription>
                  Cities with the strongest average property values in the current admin dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Market</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead className="text-right">Average Price</TableHead>
                      <TableHead className="text-right">Exposure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topMarkets.length > 0 ? (
                      topMarkets.map((market) => {
                        const exposure =
                          grossPortfolioValue > 0
                            ? ((market.avgPrice * market.properties) / grossPortfolioValue) * 100
                            : 0

                        return (
                          <TableRow key={market.location}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-foreground">{market.location}</span>
                              </div>
                            </TableCell>
                            <TableCell>{market.properties}</TableCell>
                            <TableCell className="text-right font-semibold">
                              {formatCurrency(market.avgPrice)}
                            </TableCell>
                            <TableCell className="text-right">{formatPercent(exposure)}</TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                          No market distribution data is available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Finance Snapshot</CardTitle>
                <CardDescription>
                  A quick operational read on liquidity, pipeline, and live inventory pressure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Open inventory value</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {formatCurrency(liveInventoryValue)}
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Projected pipeline value</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {formatCurrency(projectedPipelineValue)}
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Sold this month</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {latestMonth?.sales || overview?.soldThisMonth || 0} deals
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <p className="text-sm text-muted-foreground">Total tracked properties</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {overview?.totalProperties || properties.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
