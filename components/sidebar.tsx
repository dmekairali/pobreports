"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  RefreshCw,
  BarChart3,
  FileText,
  Target,
  TrendingUp,
  User,
  AlertTriangle,
  Activity,
} from "lucide-react"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "mr-dashboard", label: "MR Dashboard", icon: User },
    { id: "monthly-plan", label: "Monthly Planning", icon: Calendar },
    { id: "weekly-revision", label: "Weekly Revision", icon: RefreshCw },
    { id: "analytics", label: "Performance Analytics", icon: BarChart3 },
    { id: "emergency", label: "Emergency Territory", icon: AlertTriangle },
    { id: "visit-quality", label: "Visit Quality", icon: Activity },
    { id: "nbd-performance", label: "NBD Performance", icon: TrendingUp },
    { id: "reports", label: "Reports", icon: FileText },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">TourPlan Pro</h1>
            <p className="text-sm text-gray-500">Territory Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                activeView === item.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Medical Representative</label>
            <select className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All MRs</option>
              <option value="mr001">Rajesh Kumar</option>
              <option value="mr002">Priya Sharma</option>
              <option value="mr003">Amit Patel</option>
              <option value="mr004">Sneha Reddy</option>
              <option value="mr005">Vikram Singh</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Territory</label>
            <select className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Territories</option>
              <option value="north">North Zone</option>
              <option value="south">South Zone</option>
              <option value="east">East Zone</option>
              <option value="west">West Zone</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Time Period</label>
            <select className="mt-1 w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="current">Current Month</option>
              <option value="last">Last Month</option>
              <option value="quarter">This Quarter</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">This Month</span>
          </div>
          <div className="text-2xl font-bold">87%</div>
          <div className="text-sm opacity-90">Plan Achievement</div>
        </div>
      </div>
    </div>
  )
}
