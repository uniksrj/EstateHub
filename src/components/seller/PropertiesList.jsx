// components/seller/PropertiesList.jsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Home, Eye, MessageSquare, Tag } from "lucide-react"
import PropertiesLoading from "./PropertiesLoading"
import PropertyRow from "./PropertyRow"

const PropertiesList = ({ properties, loading, filters, onRefresh }) => {

  console.log("Inside PropertyList :", properties);

  // Filter properties based on search and status
  const filteredProperties = properties?.data?.data.filter((property) => {
    if (!property) return false

    const title = property.title?.toLowerCase() || ""
    const location = property.location?.toLowerCase() || ""
    const status = property.status?.toLowerCase() || ""

    const matchesSearch =
      title.includes(filters.search.toLowerCase()) ||
      location.includes(filters.search.toLowerCase())

    const matchesStatus = filters.status === "all" || status === filters.status.toLowerCase()

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return <PropertiesLoading />
  }

  if (filteredProperties.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {properties.length === 0 ? "No properties yet" : "No properties found"}
          </h3>
          <p className="text-muted-foreground">
            {filters.search || filters.status !== "all"
              ? "Try adjusting your search criteria"
              : "Get started by adding your first property"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Property</TableHead>
                <TableHead className="min-w-[120px]">Price</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[80px]">
                  <Eye className="h-4 w-4 inline mr-1" />
                  Views
                </TableHead>
                <TableHead className="min-w-[80px]">
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Inquiries
                </TableHead>
                {/* <TableHead className="min-w-[80px]">
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Inquiries
                </TableHead> */}
                <TableHead className="min-w-[80px]">
                  <Tag className="h-4 w-4 inline mr-1" />
                  Offers
                </TableHead>
                <TableHead className="min-w-[120px]">Market Health</TableHead>
                <TableHead className="w-[60px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <PropertyRow
                  key={property.id}
                  property={property}
                  onRefresh={onRefresh}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default PropertiesList