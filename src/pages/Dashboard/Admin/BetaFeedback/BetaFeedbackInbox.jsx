import { useEffect, useMemo, useState } from "react"
import { ExternalLink, Image, Inbox, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { betaFeedbackAPI } from "@/services/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const statusStyles = {
  new: "bg-blue-100 text-blue-700",
  reviewing: "bg-amber-100 text-amber-700",
  fixed: "bg-emerald-100 text-emerald-700",
  closed: "bg-muted text-muted-foreground",
}

const BetaFeedbackInbox = () => {
  const [feedback, setFeedback] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [environmentFilter, setEnvironmentFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  const filters = useMemo(() => ({
    status: statusFilter,
    environment: environmentFilter,
    per_page: 50,
  }), [environmentFilter, statusFilter])

  const loadFeedback = async () => {
    try {
      setIsLoading(true)
      const response = await betaFeedbackAPI.getAll(filters)
      setFeedback(Array.isArray(response.data?.data) ? response.data.data : [])
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load beta feedback.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadFeedback()
  }, [filters])

  const changeStatus = async (id, status) => {
    try {
      const response = await betaFeedbackAPI.updateStatus(id, status)
      setFeedback((current) => current.map((item) => (
        item.id === id ? response.data.feedback : item
      )))
      toast.success("Feedback status updated.")
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update status.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Beta Feedback</h1>
          <p className="text-muted-foreground">
            Review issue reports, links, environments, and screenshots submitted by beta users.
          </p>
        </div>
        <Button variant="outline" onClick={loadFeedback} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="grid gap-4 p-4 md:grid-cols-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="reviewing">Reviewing</SelectItem>
              <SelectItem value="fixed">Fixed</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Environments</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">Loading feedback...</CardContent>
        </Card>
      ) : feedback.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center text-muted-foreground">
            <Inbox className="h-10 w-10" />
            <p>No beta feedback found for the selected filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <Card key={item.id}>
              <CardHeader className="gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {item.name || item.user?.name || "Beta user"}
                  </CardTitle>
                  <CardDescription>
                    {item.email || item.user?.email || "No email"} | {new Date(item.created_at).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={statusStyles[item.status] || statusStyles.new}>{item.status}</Badge>
                  <Badge variant="outline">{item.environment}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap text-sm leading-6">{item.message}</p>

                <div className="grid gap-3 text-sm md:grid-cols-2">
                  {item.page_url && (
                    <a className="flex items-center gap-2 text-primary hover:underline" href={item.page_url} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Page URL
                    </a>
                  )}
                  {item.issue_link && (
                    <a className="flex items-center gap-2 text-primary hover:underline" href={item.issue_link} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Related link
                    </a>
                  )}
                  {item.screenshot_url && (
                    <a className="flex items-center gap-2 text-primary hover:underline" href={item.screenshot_url} target="_blank" rel="noreferrer">
                      <Image className="h-4 w-4" />
                      Screenshot
                    </a>
                  )}
                </div>

                <div className="max-w-xs">
                  <Select value={item.status} onValueChange={(value) => changeStatus(item.id, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default BetaFeedbackInbox
