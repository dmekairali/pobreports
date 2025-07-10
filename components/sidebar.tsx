"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Calendar,
  RefreshCw,
  TrendingUp,
  FileText,
  Settings,
  Users,
  AlertTriangle,
  Eye,
  Target,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "monthly-plan",
      label: "Monthly Planning",
      icon: Calendar,
      badge: null,
    },
    {
      id: "weekly-revision",
      label: "Weekly Revision",
      icon: RefreshCw,
      badge: "3",
    },
    {
      id: "performance",
      label: "Performance Analytics",
      icon: TrendingUp,
      badge: null,
    },
    {
      id: "emergency",
      label: "Emergency Territory",
      icon: AlertTriangle,
      badge: "2",
      badgeVariant: "destructive" as const,
    },
    {
      id: "quality",
      label: "Visit Quality Analysis",
      icon: Eye,
      badge: "5",
      badgeVariant: "secondary" as const,
    },
    {
      id: "nbd",
      label: "NBD Performance",
      icon: Target,
      badge: null,
    },
    {
      id: "reports",
      label: "Reports & Analytics",
      icon: FileText,
      badge: null,
    },
  ]

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">TourPlan Pro</h1>
              <p className="text-sm text-gray-600">Territory Management</p>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-2">
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                isCollapsed ? "px-2" : "px-3",
                isActive && "bg-blue-600 text-white hover:bg-blue-700",
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant={item.badgeVariant || "secondary"} className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-600">Territory Manager</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2 justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      )}
    </div>
  )
}
