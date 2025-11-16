// components/OfferDetailsModal.jsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, DollarSign, User, Home, X } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export function OfferDetailsModal({ offer, isOpen, onClose }) {
  const {user} = useAuth()
  console.log("im here for offer details  ",user)
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      case 'pending': return 'bg-yellow-500'
      case 'countered': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted': return 'Accepted'
      case 'rejected': return 'Rejected'
      case 'pending': return 'Under Review'
      case 'countered': return 'Counter Offer'
      default: return 'Unknown'
    }
  }
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Offer Details #{offer.id}
            </span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Status Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Offer Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={`${getStatusColor(offer.status)} text-white`}>
                      {getStatusText(offer.status)}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Submitted: {offer.createdAt}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ${offer.offerAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Offered Amount
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Home className="w-5 h-5" />
                  Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src={offer?.property?.image}
                    alt={offer?.property?.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{offer.property.title}</h3>
                    <p className="text-sm text-muted-foreground">{`${offer?.property?.address}, ${offer?.property?.city}, ${offer?.property?.state}, ${offer?.property?.country}(${offer?.property?.zip_code})`}</p>
                    <p className="text-lg font-bold mt-1">${offer.property.price.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Offer Conditions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {/* {offer.conditions.map((condition, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {condition}
                    </li>
                  ))} */}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Buyer Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5" />
                  Your Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-muted-foreground">{user.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" size="sm">
                  Withdraw Offer
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Contact Agent
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}