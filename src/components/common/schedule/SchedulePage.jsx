import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Calendar, Video, MapPin, Check, XCircle, Clock, RefreshCcw } from "lucide-react"
import { format } from "date-fns"
import { userAPI } from "@/services/api"
import { getScheduleStatusColor } from "@/utils/userHelpers"
import { Loading } from "@/pages/misc/Loading"

export default function SchedulePage() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const userRole = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await userAPI.getAll()
        setSchedules(response.data.schedules)
      } catch (error) {
        console.error("Error fetching schedules:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchSchedules()
  }, [])

  const updateStatus = async (id, newStatus) => {   
    try {
      await userAPI.updateScheduleStatus({ schedule_id :id, status: newStatus })
    } catch (error) {
      console.error("Error updating schedule status:", error)
      toast.error("Failed to update schedule status.")
      return
    } 
    setSchedules((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    )
    toast.success(`Schedule ${newStatus} successfully.`)
  }

  if (loading) {
    return (
      <Loading loading={loading} />
    )
  }

  if (schedules.length === 0) {
    return (
      <div className="p-6"> 
        <h2 className="text-2xl font-bold mb-6">My Schedules</h2>
        <p className="text-muted-foreground">No schedules found.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Schedules</h2>

      {/* 🌟 Responsive Grid Layout */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="p-4 flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow">
            <div>
              <h3 className="font-semibold text-lg">{schedule.property.title}</h3>
              <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{schedule.property.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(schedule.scheduled_at), "PPpp")}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm">
                {schedule.meeting_type === "virtual" ? (
                  <Video className="w-4 h-4 text-blue-500" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-500" />
                )}
                <span className="capitalize">{schedule.meeting_type}</span>
              </div>
              <Badge className={`${getScheduleStatusColor(schedule.status)} mt-3`}>
                {schedule.status}
              </Badge>
              {schedule.notes && (
                <p className="text-xs text-muted-foreground mt-2">{schedule.notes}</p>
              )}
            </div>

            {/* 🎯 Role-based Actions */}
            <div className="flex flex-wrap gap-2 pt-2">
              {userRole.role_id === 3 && schedule.status === "pending" && (
                <>
                  <Button size="sm" onClick={() => updateStatus(schedule.id, "approved")}>
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => updateStatus(schedule.id, "rejected")}>
                    <XCircle className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </>
              )}

              {userRole.role_id === 3 && schedule.status === "approved" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(schedule.id, "completed")}
                >
                  <Check className="w-4 h-4 mr-1" /> Mark Completed
                </Button>
              )}

              {userRole.role_id === 5 && schedule.status === "pending" && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => updateStatus(schedule.id, "cancelled")}
                >
                  <XCircle className="w-4 h-4 mr-1" /> Cancel
                </Button>
              )}

              {userRole.role_id === 5 && schedule.status === "approved" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(schedule.id, "reschedule_requested")}
                >
                  <RefreshCcw className="w-4 h-4 mr-1" /> Reschedule
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
