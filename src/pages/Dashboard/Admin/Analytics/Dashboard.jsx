import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Users, MessageSquare, BarChart3, Sidebar } from "lucide-react"
import { Totalactiveinactivechart, Totalpropertychart } from "@/components/charts/Totalpropertychart"
import { useState } from "react";
import { Header } from "@radix-ui/react-accordion";
import DeadDealAnalysis from "@/components/charts/DeadDealAnalysis";
import MetricsGrid from "@/components/charts/MetricsGrid";
import RecentActivity from "@/components/charts/RecentActivity";
import DealPipeline from "@/components/charts/DealPipeline";

const propertyStatusData = [
    { status: "Available", count: 50, fill: "#3b82f6" }, // Blue
    { status: "Sold", count: 30, fill: "#10b981" },      // Green
    { status: "Rented", count: 15, fill: "#f59e0b" },    // Orange
    { status: "Maintenance", count: 5, fill: "#ef4444" },// Red
    { status: "Pending", count: 10, fill: "#8b5cf6" },   // Purple
]


export default function AdminDashboard() {

    return (
        <>
            <div className="flex h-screen bg-background">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            <MetricsGrid />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <DealPipeline />
                                <RecentActivity />
                            </div>
                        </div>
                        <hr className="my-6" />
                        <DeadDealAnalysis />
                    </main>
                </div>
            </div>
        </>
    );
}
