import { useState } from "react"
import { Link } from "react-router"
import { ImageUp, MessageSquare, Send } from "lucide-react"
import { toast } from "sonner"
import { betaFeedbackAPI } from "@/services/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialForm = {
  name: "",
  email: "",
  environment: "production",
  page_url: typeof window !== "undefined" ? window.location.href : "",
  issue_link: "",
  message: "",
  screenshot: null,
}

const BetaFeedbackPage = () => {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.message.trim()) {
      toast.error("Please describe the issue before sending.")
      return
    }

    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (value) {
        payload.append(key, value)
      }
    })

    try {
      setIsSubmitting(true)
      await betaFeedbackAPI.submit(payload)
      toast.success("Issue report sent. Thank you for helping us improve the beta.")
      setForm({
        ...initialForm,
        page_url: typeof window !== "undefined" ? window.location.href : "",
      })
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send the issue report right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-muted/30 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 px-0">
            <Link to="/">Back to home</Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Report a Beta Issue</h1>
              <p className="text-muted-foreground">
                Send the page, environment, links, and screenshots that help us reproduce the problem.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
            <CardDescription>
              The developer team will use this information to check and fix beta problems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Environment</Label>
                  <Select value={form.environment} onValueChange={(value) => updateField("environment", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="page_url">Page URL</Label>
                  <Input
                    id="page_url"
                    value={form.page_url}
                    onChange={(event) => updateField("page_url", event.target.value)}
                    placeholder="Where did you find the issue?"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue_link">Related Link</Label>
                <Input
                  id="issue_link"
                  value={form.issue_link}
                  onChange={(event) => updateField("issue_link", event.target.value)}
                  placeholder="Property link, dashboard link, or any related URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="What happened? What did you expect? Steps to reproduce help a lot."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="screenshot">Issue Screenshot</Label>
                <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <ImageUp className="h-5 w-5" />
                    <span>{form.screenshot?.name || "Upload an image showing the issue"}</span>
                  </div>
                  <Input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    className="sm:max-w-xs"
                    onChange={(event) => updateField("screenshot", event.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Issue Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BetaFeedbackPage
