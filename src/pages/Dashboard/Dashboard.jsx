"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Plus, Home, Heart, TrendingUp, Users, MapPin, Edit, Trash2, Eye } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { userAPI } from "../../services/api"
import ImageCarousel from "@/components/common/ImageCarousel"
import { useDeleteProperty } from "@/hooks/commonP"
import { Paginationlink } from "@/components/common/Pagination"
import { Loading } from "../misc/Loading"

const Dashboard = () => {
  const { user } = useAuth()

  const [stats, setStats] = useState({
    totalProperties: 0,
    totalViews: 0,
    totalInquiries: 0,
    favoriteProperties: 0,
  })

  const [myProperties, setMyProperties] = useState([])
  const [favoriteProperties, setFavoriteProperties] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const { deleteProperty, loadingDelete } = useDeleteProperty((deleted_id) => {
    setMyProperties(prev => prev.data.filter(p => p.id !== deleted_id));
  });
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchDashboardData(page);
  }
  
  const fetchDashboardData = async (page="") => {
    setLoading(true)
    try {
      const propertyDetails = {
        page: page,
      };
      const propertiesResponse = await userAPI.getProperties(propertyDetails)
      console.log(propertiesResponse.data);

      if (propertiesResponse.data && propertiesResponse.data.data) {
        setMyProperties(propertiesResponse.data);
        setLastPage(propertiesResponse.data.last_page);
      }

      if (propertiesResponse.data) {
        setMyProperties(propertiesResponse.data)
      } else {
        setMyProperties([])
      }

      const favoritesResponse = await userAPI.getFavorites()
      if (favoritesResponse.data) {
        setFavoriteProperties(favoritesResponse.data)
      } else {
        setFavoriteProperties([])
      }

      setStats({
        totalProperties: propertiesResponse.data.total,
        totalViews: propertiesResponse.data.data.reduce((sum, prop) => sum + (prop.views || 0), 0),
        totalInquiries: propertiesResponse.data.data.reduce((sum, prop) => sum + (prop.inquiries || 0), 0),
        favoriteProperties: favoritesResponse.data.favorites.length,
      })

      setRecentActivity([
        {
          id: 1,
          type: "view",
          message: "Your property 'Modern Downtown Loft' was viewed 5 times",
          time: "2 hours ago",
        },
        {
          id: 2,
          type: "inquiry",
          message: "New inquiry received for 'Luxury Family Estate'",
          time: "4 hours ago",
        },
        {
          id: 3,
          type: "favorite",
          message: "Someone added your property to their favorites",
          time: "1 day ago",
        },
      ])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setMyProperties([])
      setFavoriteProperties([])
      setRecentActivity([])
      setStats({
        totalProperties: 0,
        totalViews: 0,
        totalInquiries: 0,
        favoriteProperties: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }  

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Loading loading={loading}/>;
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Manage your properties and track your real estate portfolio</p>
          </div>
          <Link to="/admin/add-property">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInquiries}</div>
              <p className="text-xs text-muted-foreground">Pending responses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorites</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.favoriteProperties}</div>
              <p className="text-xs text-muted-foreground">Saved properties</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Properties</h2>
              <Link to="/admin/manage-properties">
                <Button variant="outline">Manage All</Button>
              </Link>
            </div>

            {myProperties.data && myProperties.data.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProperties.data.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <ImageCarousel image={property.images} className="h-48" />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{property.title}</h3>
                        <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{`${property.address}, ${property.city}, ${property.state} (${property.zip_code})`}</span>
                      </div>
                      <div className="text-lg font-bold text-accent mb-3">{formatPrice(property.price)}</div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{property.views || 0} views</span>
                        <span>{property.inquiries || 0} inquiries</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/properties/${property.id}/view`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </Link>
                        <Link to={`/properties/${property.id}/edit`} className="flex-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => deleteProperty(property.id)} disabled={loadingDelete} className="flex-1">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="col-span-full flex justify-center mt-4">
                  <Paginationlink currentPage={currentPage} lastPage={lastPage} onPageChange={handlePageChange} />
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
                  <p className="text-muted-foreground mb-4">Start by adding your first property listing</p>
                  <Link to="/admin/add-property">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Property
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <h2 className="text-xl font-semibold">Favorite Properties</h2>

            {favoriteProperties.favorites.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.favorites.map((property) => (
                  <Card key={property.favorite_id} className="overflow-hidden">
                    <ImageCarousel image={property.property.images} className="h-48" />
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{property.property.title}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.property.location}</span>
                      </div>
                      <div className="text-lg font-bold text-accent mb-3">{formatPrice(property.property.price)}</div>
                      <Link to={`/properties/${property.property.id}/view`}>
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse properties and save your favorites for easy access
                  </p>
                  <Link to="/properties">
                    <Button>Browse Properties</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h2 className="text-xl font-semibold">Recent Activity</h2>

            <Card>
              <CardContent className="p-6">
                {recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No recent activity</h3>
                    <p className="text-muted-foreground">
                      Activity will appear here as users interact with your properties
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Dashboard
