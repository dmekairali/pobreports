"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { MonthlyPlanCreation } from "@/components/monthly-plan-creation"
import { WeeklyRevision } from "@/components/weekly-revision"
import { PerformanceAnalytics } from "@/components/performance-analytics"
import { Reports } from "@/components/reports"
import { MRDashboard } from "@/components/mr-dashboard"
import { EmergencyTerritoryManagement } from "@/components/emergency-territory-management"
import { VisitQualityAnalysis } from "@/components/visit-quality-analysis"
import { NBDPerformance } from "@/components/nbd-performance"

export default function TourPlanningSystem() {
  const [activeView, setActiveView] = useState("dashboard")

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview />
      case "mr-dashboard":
        return <MRDashboard />
      case "monthly-plan":
        return <MonthlyPlanCreation />
      case "weekly-revision":
        return <WeeklyRevision />
      case "analytics":
        return <PerformanceAnalytics />
      case "emergency":
        return <EmergencyTerritoryManagement />
      case "visit-quality":
        return <VisitQualityAnalysis />
      case "nbd-performance":
        return <NBDPerformance />
      case "reports":
        return <Reports />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto">{renderActiveView()}</main>
    </div>
  )
}
