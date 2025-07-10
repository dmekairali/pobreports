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
  const [selectedMR, setSelectedMR] = useState<string | null>(null)

  const renderContent = () => {
    if (selectedMR) {
      return <MRDashboard mrName={selectedMR} onBack={() => setSelectedMR(null)} />
    }

    switch (activeView) {
      case "dashboard":
        return <DashboardOverview onSelectMR={setSelectedMR} />
      case "monthly-plan":
        return <MonthlyPlanCreation />
      case "weekly-revision":
        return <WeeklyRevision />
      case "performance":
        return <PerformanceAnalytics />
      case "reports":
        return <Reports />
      case "emergency":
        return <EmergencyTerritoryManagement />
      case "quality":
        return <VisitQualityAnalysis />
      case "nbd":
        return <NBDPerformance />
      default:
        return <DashboardOverview onSelectMR={setSelectedMR} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
