import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Users, MessageSquare, BarChart3 } from "lucide-react"
import { Totalactiveinactivechart, Totalpropertychart } from "@/components/charts/Totalpropertychart"

const propertyStatusData = [
    { status: "Available", count: 50, fill: "#3b82f6" }, // Blue
    { status: "Sold", count: 30, fill: "#10b981" },      // Green
    { status: "Rented", count: 15, fill: "#f59e0b" },    // Orange
    { status: "Maintenance", count: 5, fill: "#ef4444" },// Red
    { status: "Pending", count: 10, fill: "#8b5cf6" },   // Purple
]


export default function AdminDashboard() {

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
                <p className="text-muted-foreground">Manage your real estate platform</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                        <Home className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">100</div>
                        <p className="text-xs text-muted-foreground">+5 new this week</p>
                    </CardContent>
                </Card>                
                {/* <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">245</div>
                        <p className="text-xs text-muted-foreground">+12 this week</p>
                    </CardContent>
                </Card> */}

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                        <MessageSquare className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">38</div>
                        <p className="text-xs text-muted-foreground">8 pending response</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        <BarChart3 className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$52,400</div>
                        <p className="text-xs text-muted-foreground">+18% from last month</p>
                    </CardContent>
                </Card>
            </div>
            <Totalactiveinactivechart activeInactiveData={[
                    { label: "Active", count: 70, fill: "#34d399" },   
                    { label: "Inactive", count: 30, fill: "#f87171" },
                ]} />
            <Totalpropertychart propertyStatusData={propertyStatusData} />
        </div>
    )
}
