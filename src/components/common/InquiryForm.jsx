"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Alert, AlertDescription } from "../ui/alert"
import { Loader2, Send } from "lucide-react"
// import { inquiriesAPI } from "../../services/api"
import { useAuth } from "../../hooks/useAuth"
import { toast } from "sonner"


const InquiryForm = ({ propertyId, propertyTitle, onSubmitted }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { user } = useAuth()

  // Pre-fill form if user is logged in
  useState(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // await inquiriesAPI.create({
      //   ...formData,
      //   property_id: propertyId,
      // })

      setSuccess(true)
      onSubmitted?.()
      toast("Inquiry Sent", {
        description: "Your inquiry has been sent successfully. We'll get back to you soon!",
      })

      // Reset form if user is not logged in
      if (!user) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      } else {
        setFormData((prev) => ({
          ...prev,
          message: "",
        }))
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send inquiry. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Inquiry Sent!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest in this property. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setSuccess(false)} variant="outline">
              Send Another Inquiry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className={"px-0"}>
        <CardTitle>Interested in this property?</CardTitle>
        <p className="text-sm text-muted-foreground">Send us your details and we'll get back to you</p>
      </CardHeader>
      <CardContent className={"px-0"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          {/* </div> */}

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={`I'm interested in ${propertyTitle}. Please provide more information.`}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Inquiry...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default InquiryForm
