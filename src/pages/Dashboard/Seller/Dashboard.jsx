// app/seller/dashboard/page.jsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Eye, 
  Home, 
  MessageSquare, 
  Plus, 
  Tag, 
  TrendingUp, 
  Users,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { propertiesAPI } from "@/services/api"

export default function SellerDashboard() {
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalListings: 0,
      activeListings: 0,
      totalViews: 0,
      pendingOffers: 0,
      unreadMessages: 0,
      totalInquiries: 0,
      soldProperties: 0
    },
    recentActivity: [],
    performance: {},
    topPerforming: [],
    recentInquiries: []
  })
  const [loading, setLoading] = useState(true)
console.log("This is Dashboard Data :", dashboardData);

  useEffect(() => {
    fetchSellerDashboard()
  }, [])

  const fetchSellerDashboard = async () => {
    setLoading(true)
    try {
      const response = await propertiesAPI.getDashboardListByUser();
      console.log("response from data :",response);
      
      setDashboardData(response.data)
    } catch (error) {
      console.error('Error fetching seller dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const overviewCards = [
    {
      title: 'Total Listings',
      value: dashboardData?.overview?.totalListings,
      description: 'Properties listed',
      icon: Home,
      color: 'text-blue-600',
      trend: '+2'
    },
    {
      title: 'Active Listings',
      value: dashboardData?.overview?.activeListings,
      description: 'Currently for sale',
      icon: TrendingUp,
      color: 'text-green-600',
      trend: '+1'
    },
    {
      title: 'Total Views',
      value: dashboardData?.overview?.totalViews.toLocaleString(),
      description: 'Property views',
      icon: Eye,
      color: 'text-purple-600',
      trend: '+12%'
    },
    {
      title: 'Pending Offers',
      value: dashboardData?.overview?.pendingOffers,
      description: 'Offers to review',
      icon: Tag,
      color: 'text-orange-600',
      trend: dashboardData?.overview?.pendingOffers > 0 ? 'Action needed' : null
    },
    {
      title: 'Total Inquiries',
      value: dashboardData?.overview?.totalInquiries,
      description: 'Customer inquiries',
      icon: MessageSquare,
      color: 'text-red-600',
      trend: '+5'
    },
    {
      title: 'Sold Properties',
      value: dashboardData?.overview?.soldProperties,
      description: 'Successfully sold',
      icon: DollarSign,
      color: 'text-emerald-600',
      trend: '+3'
    }
  ]

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'responded': 'bg-green-100 text-green-800',
      'new': 'bg-blue-100 text-blue-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's your property performance overview.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {overviewCards.map((card, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <card.icon className={`h-5 w-5 ${card.color}`} />
                {card.trend && (
                  <span className="text-xs font-medium text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {card.trend}
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground truncate">{card.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your property business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/seller/add-property">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Property
                  </Button>
                </Link>
                <Link to="/seller/properties">
                  <Button variant="outline" className="w-full justify-start">
                    <Home className="h-4 w-4 mr-2" />
                    Manage Listings ({dashboardData.overview.totalListings})
                  </Button>
                </Link>
                <Link to="/seller/offers">
                  <Button variant="outline" className="w-full justify-start">
                    <Tag className="h-4 w-4 mr-2" />
                    Review Offers ({dashboardData.overview.pendingOffers})
                  </Button>
                </Link>
                <Link to="/seller/messages">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View Messages ({dashboardData.overview.totalInquiries})
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Top Performing Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Properties</CardTitle>
                <CardDescription>Properties with most engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.topPerforming.length > 0 ? (
                    dashboardData.topPerforming.map((property, index) => (
                      <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{property.title}</span>
                            <Badge variant={property.status === 'for_sale' ? 'default' : 'secondary'}>
                              {property.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {property.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {property.inquiries} inquiries
                            </span>
                            <span>{property.conversion_rate}% conversion</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No properties yet. Start by adding your first listing!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Views & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Property Views</CardTitle>
                <CardDescription>Latest visitor activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.length > 0 ? (
                    dashboardData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">{activity.property_title}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.view_count} views
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {activity.last_viewed}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No recent views
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Your overall performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">View to Inquiry Rate</span>
                    <span className="font-semibold">{dashboardData.performance.conversion_rate || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Days on Market</span>
                    <span className="font-semibold">45 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Rate</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>Latest customer inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              {dashboardData.recentInquiries.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{inquiry.property_title}</span>
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          From: {inquiry.user_name}
                        </p>
                        <p className="text-sm">{inquiry.message}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">{inquiry.created_at}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No inquiries yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Advanced analytics coming soon!</p>
                <p className="text-sm mt-2">Charts and detailed insights will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}