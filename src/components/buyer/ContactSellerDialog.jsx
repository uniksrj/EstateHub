// components/ContactSellerDialog.jsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Mail, Phone, Calendar, Home, User, MessageSquare, Clock, Send } from "lucide-react"
import { PropertySidebar } from "./PropertySidebar"

const ContactSellerDialog = ({ property, triggerButton = null }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        timeline: "",
        budget_min: "",
        budget_max: "",
        property_type_interest: "",
        preferred_location: "",
        bedrooms: "",
        bathrooms: "",
        additional_requirements: ""
    })

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))

            // In real app, you would call:
            // await fetch('/api/inquiries', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     property_id: property.id,
            //     ...formData
            //   })
            // })

            // Success - close dialog and show success message
            setOpen(false)
            alert('Message sent successfully! The seller will contact you soon.')

            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                timeline: "",
                budget_min: "",
                budget_max: "",
                property_type_interest: "",
                preferred_location: "",
                bedrooms: "",
                bathrooms: "",
                additional_requirements: ""
            })

        } catch (error) {
            console.error('Error submitting inquiry:', error)
            alert('There was an error sending your message. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Default property data if none provided
    const propertyData = property || {
        id: 1,
        title: "Modern Downtown Apartment",
        price: 450000,
        property_type: "apartment",
        city: "New York",
        state: "NY",
        bedrooms: 2,
        bathrooms: 2,
        sq_ft: 1200,
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400"
        ],
        agent: {
            name: "Sarah Johnson",
            email: "sarah.johnson@realestate.com",
            phone: "+1 (555) 123-4567",
            company: "Elite Realty Partners",
            profile_image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerButton || (
                    <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                        <MessageSquare className="h-4 w-4" />
                        Contact Seller
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="!max-w-5xl w-[90vw] h-[85vh] flex flex-col p-0 overflow-hidden bg-background">
                {/* Header with your brand colors */}
                <DialogHeader className="px-8 pt-8 pb-6 flex-shrink-0 bg-card border-b">
                    <DialogTitle className="flex items-center gap-3 text-xl font-bold text-card-foreground">
                        <div className="p-2 bg-primary rounded-lg">
                            <MessageSquare className="h-6 w-6 text-primary-foreground" />
                        </div>
                        Contact Seller
                    </DialogTitle>
                    <DialogDescription className="text-l text-muted-foreground mt-2">
                        Send a message to the seller about this property. They will respond within 24 hours.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
                    {/* Contact Form - Main Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-m font-semibold text-card-foreground border-b pb-2">
                                    Your Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className="text-m font-medium">Full Name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            required
                                            className="w-full h-12 text-lg px-4 border-2 focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="text-m font-medium">Email Address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            required
                                            className="w-full h-12 text-lg px-4 border-2 focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="phone" className="text-m font-medium">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+1 (555) 123-4567"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="w-full h-12 text-lg px-4 border-2 focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="timeline" className="text-m font-medium">Purchase Timeline</Label>
                                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                                            <SelectTrigger className="w-full h-12 text-m border-2 focus:border-primary">
                                                <SelectValue placeholder="Select timeline" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="immediate">Immediately</SelectItem>
                                                <SelectItem value="1-3 months">1-3 Months</SelectItem>
                                                <SelectItem value="3-6 months">3-6 Months</SelectItem>
                                                <SelectItem value="6+ months">6+ Months</SelectItem>
                                                <SelectItem value="just_browsing">Just Browsing</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Budget Range */}
                            <div className="space-y-6">
                                <h3 className="text-m font-semibold text-card-foreground border-b pb-2">
                                    Budget Information
                                </h3>

                                <div className="space-y-3">
                                    <Label className="text-m font-medium">Budget Range (Optional)</Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Input
                                                type="number"
                                                placeholder="Minimum budget"
                                                value={formData.budget_min}
                                                onChange={(e) => handleInputChange('budget_min', e.target.value)}
                                                className="w-full h-12 text-lg px-4 border-2 focus:border-primary transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                type="number"
                                                placeholder="Maximum budget"
                                                value={formData.budget_max}
                                                onChange={(e) => handleInputChange('budget_max', e.target.value)}
                                                className="w-full h-12 text-lg px-4 border-2 focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-6">
                                <h3 className="text-m font-semibold text-card-foreground border-b pb-2">
                                    Your Message
                                </h3>

                                <div className="space-y-3">
                                    <Label htmlFor="message" className="text-base font-medium">Your Message *</Label>
                                    <Textarea
                                        id="message"
                                        placeholder={`I'm interested in ${propertyData.title}. Please provide more information about...`}
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        required
                                        className="w-full min-h-[150px] text-sm p-4 border-2 focus:border-primary transition-colors resize-vertical"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="space-y-4 pt-4">
                                <Button
                                    type="submit"
                                    className="w-full h-14 text-sm font-semibold bg-primary hover:bg-primary/90 transition-all duration-200"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-3">
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            Sending Message...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <Send className="h-5 w-5" />
                                            Send Message to Seller
                                        </div>
                                    )}
                                </Button>
                                <p className="text-xs text-muted-foreground text-center">
                                    By submitting, you agree to be contacted about this property. Your information is secure and will not be shared with third parties.
                                </p>
                            </div>
                        </form>
                    </div>
                    <PropertySidebar propertyData={propertyData} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ContactSellerDialog