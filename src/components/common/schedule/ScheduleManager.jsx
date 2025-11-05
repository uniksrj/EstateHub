"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast, Toaster } from "sonner"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { userAPI } from "@/services/api"

export default function ScheduleManager({
    mode = "modal",
    isOpen = false,
    onClose,
    property = null,
    schedules = [],
    onScheduleCreated,
}) {
    const [formData, setFormData] = useState({
        date: null,
        time: "",
        meeting_type: "in-person",
        notes: "",
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDateSelect = (selectedDate) => {
        setFormData({ ...formData, date: selectedDate })
    }

    const handleSubmit = async() => {
        if (!formData.date || !formData.time) {
            toast.error("Please select both date and time")
            return
        }

        setLoading(true)
        try {
            const schedule = {
                property_id: property?.id,
                agent_id: property?.agent_id,
                date: format(formData.date, "yyyy-MM-dd"),
                time: formData.time,
                meeting_type: formData.meeting_type,
                notes: formData.notes,
            }
            await userAPI.store_schedule(schedule);
            onScheduleCreated(schedule)
            toast.success("Tour scheduled successfully!")
            onClose?.()
        } catch (error) {
            console.error("Error creating schedule:", error)
            toast.error("Failed to schedule tour")
        } finally {
            setLoading(false)
        }
    }

    const Content = (
        <div className="space-y-4 p-4">
            <h3 className="text-lg font-semibold">Schedule Property Tour</h3>
            <p className="text-muted-foreground text-sm">Choose a date and time for your tour.</p>

            <div className="space-y-4">
                {/* ✅ Date Picker */}
                <div className="flex flex-col space-y-2">
                    <Label>Select Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal bg-card",
                                    !formData.date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={formData.date} onSelect={handleDateSelect} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* ✅ Time Picker */}
                <div className="flex flex-col space-y-2">
                    <Label>Select Time</Label>
                    <input
                        type="time"
                        name="time"
                        className="border border-input  bg-card rounded-md p-2"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>

                {/* Meeting Type */}
                <div className="flex flex-col gap-1">
                    <Label>Meeting Type</Label>
                    <select
                        name="meeting_type"
                        value={formData.meeting_type}
                        onChange={handleChange}
                        className="w-full border bg-card rounded-md p-2"
                    >
                        <option value="in-person">In Person</option>
                        <option value="virtual">Virtual</option>
                    </select>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1">
                    <Label>Notes</Label>
                    <Textarea
                        className="bg-card"
                        name="notes"
                        placeholder="Optional notes (e.g. client preferences)"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                {/* Submit */}
                <Button onClick={handleSubmit} disabled={loading} className="w-full">
                    {loading ? "Scheduling..." : "Confirm Schedule"}
                </Button>
            </div>

            {/* Upcoming schedules */}
            {schedules?.length > 0 && (
                <div className="mt-4">
                    <h4 className="font-medium mb-2">Upcoming Schedules</h4>
                    <ul className="space-y-1 text-sm">
                        {schedules.map((s, i) => (
                            <li key={i} className="border p-2 rounded">
                                {s.date} – {s.time}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )

    // ✅ Works as modal or inline card
    if (mode === "modal") {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md">{Content}</DialogContent>
            </Dialog>
        )
    }

    return <Card className="p-4 w-full max-w-md">{Content}</Card>
}
