import { useState } from "react"
import { Bug, ImageUp, Send } from "lucide-react"
import { toast } from "sonner"
import { betaFeedbackAPI } from "@/services/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const getInitialForm = () => ({
  name: "",
  email: "",
  environment: "production",
  page_url: typeof window !== "undefined" ? window.location.href : "",
  issue_link: "",
  message: "",
  screenshot: null,
})

const BetaFeedbackWidget = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(getInitialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen)
    if (nextOpen) {
      updateField("page_url", window.location.href)
    }
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
      setForm(getInitialForm())
      setOpen(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send the issue report right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-5 right-5 z-50 h-12 rounded-full px-5 shadow-2xl">
          <Bug className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Report a Beta Issue</DialogTitle>
          <DialogDescription>
            Add the details, environment, links, and screenshot so the developer team can check the issue.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="beta-widget-name">Name</Label>
              <Input
                id="beta-widget-name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beta-widget-email">Email</Label>
              <Input
                id="beta-widget-email"
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
              <Label htmlFor="beta-widget-page-url">Page URL</Label>
              <Input
                id="beta-widget-page-url"
                value={form.page_url}
                onChange={(event) => updateField("page_url", event.target.value)}
                placeholder="Where did you find the issue?"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="beta-widget-issue-link">Related Link</Label>
            <Input
              id="beta-widget-issue-link"
              value={form.issue_link}
              onChange={(event) => updateField("issue_link", event.target.value)}
              placeholder="Property link, dashboard link, or any related URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="beta-widget-message">Message</Label>
            <Textarea
              id="beta-widget-message"
              rows={5}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="What happened? What did you expect? Steps to reproduce help a lot."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="beta-widget-screenshot">Issue Screenshot</Label>
            <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ImageUp className="h-5 w-5" />
                <span>{form.screenshot?.name || "Upload an image showing the issue"}</span>
              </div>
              <Input
                id="beta-widget-screenshot"
                type="file"
                accept="image/*"
                className="sm:max-w-xs"
                onChange={(event) => updateField("screenshot", event.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Issue"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BetaFeedbackWidget
