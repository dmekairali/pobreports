"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Calendar, Target, AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react"

interface DashboardOverviewProps {
  onSelectMR?: (mrName: string) => void
}

export function DashboardOverview({ onSelectMR }: DashboardOverviewProps) {
  const kpiData = [
    {
      title: "Total MRs",
      value: "24",
      change: "+2",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Monthly Target",
      value: "₹2.4M",
      change: "87%",
      changeType: "positive",
      icon: Target,
    },
    {
      title: "Visits Completed",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: CheckCircle,
    },
    {
      title: "Pending Reviews",
      value: "23",
      change: "-5",
      changeType: "negative",
      icon: Clock,
    },
  ]

  const mrPerformance = [
    { name: "Rajesh Kumar", territory: "North Zone", visits: 45, target: 50, achievement: 90 },
    { name: "Priya Sharma", territory: "South Zone", visits: 42, target: 45, achievement: 93 },
    { name: "Amit Patel", territory: "West Zone", visits: 38, target: 48, achievement: 79 },
    { name: "Sneha Reddy", territory: "East Zone", visits: 41, target: 44, achievement: 93 },
    { name: "Vikram Singh", territory: "Central Zone", visits: 35, target: 46, achievement: 76 },
  ]

  const alerts = [
    { type: "critical", message: "Amit Patel - 3 consecutive missed visits", time: "2 hours ago" },
    { type: "warning", message: "North Zone - Below target by 15%", time: "4 hours ago" },
    { type: "info", message: "New territory assignment pending approval", time: "1 day ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Territory management and performance insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            This Month
          </Button>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      kpi.changeType === "positive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {kpi.change}
                  </span>
                  <span className="ml-2">from last month</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MR Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>MR Performance Overview</CardTitle>
            <CardDescription>Monthly visit completion and target achievement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mrPerformance.map((mr, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelectMR?.(mr.name)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{mr.name}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {mr.territory}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {mr.visits}/{mr.target} visits
                        </p>
                        <Progress value={mr.achievement} className="w-20 h-2 mt-1" />
                      </div>
                      <Badge
                        variant={mr.achievement >= 90 ? "default" : mr.achievement >= 80 ? "secondary" : "destructive"}
                      >
                        {mr.achievement}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Recent system alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {alert.type === "critical" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    {alert.type === "info" && <CheckCircle className="h-5 w-5 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
