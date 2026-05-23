// components/seller/PropertyRow.jsx
"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router"
import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, Edit, Eye, Trash2, MapPin, Home, Tag, TrendingUp, AlertCircle, Rocket } from "lucide-react"
import { propertiesAPI } from "@/services/api"
import BoostPropertyDialog from "@/components/common/property/BoostPropertyDialog"

const PropertyRow = ({ property, onRefresh }) => {  
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [boostDialog, setBoostDialog] = useState(false)
  const location = useLocation();
 const userType = location.pathname.split('/')[1];
  const handleDelete = async () => {
    try {
      await propertiesAPI.delete(property.id)
      onRefresh()
      setDeleteDialog(false)
    } catch (error) {
      console.error("Error deleting property:", error)
    }
  }

  const formatPrice = (price) => {
    if (!price) return "₹0"
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getHealthColor = (rating) => {
    const colors = {
      'Excellent': 'bg-green-100 text-green-800',
      'Good': 'bg-blue-100 text-blue-800',
      'Average': 'bg-yellow-100 text-yellow-800',
      'Poor': 'bg-orange-100 text-orange-800',
      'Very Poor': 'bg-red-100 text-red-800'
    }
    return colors[rating] || 'bg-gray-100 text-gray-800'
  }

  const getHealthIcon = (rating) => {
    const icons = {
      'Excellent': <TrendingUp className="h-3 w-3" />,
      'Good': <TrendingUp className="h-3 w-3" />,
      'Average': <AlertCircle className="h-3 w-3" />,
      'Poor': <AlertCircle className="h-3 w-3" />,
      'Very Poor': <AlertCircle className="h-3 w-3" />
    }
    return icons[rating]
  }

  const getStatusColor = (status) => {
    const colors = {
      'for_sale': "bg-green-100 text-green-800",
      'draft': "bg-gray-100 text-gray-800",
      'under_contract': "bg-yellow-100 text-yellow-800",
      'sold': "bg-blue-100 text-blue-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const formatStatus = (status) => {
    if (!status) return "Unknown"
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const getBoostSummary = () => {
    if (!property?.is_boost_active) {
      return null
    }

    const boostTypeLabel = property.boost_type
      ? property.boost_type.replace(/\b\w/g, (char) => char.toUpperCase())
      : "Boosted"

    return `${boostTypeLabel} until ${new Date(property.boost_expires_at).toLocaleDateString()}`
  }

  const boostSummary = getBoostSummary()

  return (
    <>
      <TableRow className={property?.is_boost_active ? "bg-primary/5" : ""}>
        <TableCell>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <Home className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 font-medium">
                <span>{property.title || "Untitled"}</span>
                {property?.is_boost_active && (
                  <Badge className="bg-gold text-accent-foreground">Featured</Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {[property.city, property.state].filter(Boolean).join(', ') || "No location"}
              </div>
              {boostSummary && (
                <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                  <Rocket className="h-3 w-3" />
                  <span>{boostSummary}</span>
                </div>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell className="font-medium">{formatPrice(property.price)}</TableCell>
        <TableCell>
          <Badge className={getStatusColor(property.status)}>
            {formatStatus(property.status)}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span>{property.analytics.views.total_views || 0}</span>
            {property.analytics.views.views_this_week > 0 && (
              <Badge variant="secondary" className="ml-1">
                +{property.analytics.views.views_this_week} this week
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell>{property.analytics.inquiries.total_inquiries || 0}</TableCell>
        {/* <TableCell>
          {property.created_at ? new Date(property.created_at).toLocaleDateString() : "N/A"}
        </TableCell> */}
        <TableCell>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span>{property.quick_stats?.total_offers || 0}</span>
          </div>
        </TableCell>

        <TableCell>
          <Badge className={getHealthColor(property.analytics?.performance?.market_health?.rating)}>
            <span className="flex items-center gap-1">
              {getHealthIcon(property.analytics?.performance?.market_health?.rating)}
              {property.analytics?.performance?.market_health?.rating || 'N/A'}
            </span>
          </Badge>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/properties/${property.id}/view`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/${userType}/properties/${property.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setBoostDialog(true)}>
                <Rocket className="mr-2 h-4 w-4" />
                Boost Your Property
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{property.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BoostPropertyDialog
        open={boostDialog}
        onOpenChange={setBoostDialog}
        property={property}
        onBoosted={onRefresh}
      />
    </>
  )
}

export default PropertyRow
