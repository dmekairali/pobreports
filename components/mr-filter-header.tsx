"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, User, MapPin, Calendar, Download, RefreshCw, X } from "lucide-react"

interface MRFilterHeaderProps {
  selectedMR?: string
  selectedTerritory?: string
  selectedPeriod?: string
  onFilterChange?: (filters: any) => void
}

export function MRFilterHeader({
  selectedMR = "mr001",
  selectedTerritory = "north",
  selectedPeriod = "current",
}: MRFilterHeaderProps) {
  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">Rajesh Kumar</p>
                <p className="text-sm text-blue-600">MR ID: MR001</p>
              </div>
            </div>

            <div className="h-8 w-px bg-blue-200"></div>

            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                North Zone
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                December 2024
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex items-center space-x-2 mt-3">
          <span className="text-sm font-medium text-blue-700">Active Filters:</span>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Rajesh Kumar
            <X className="h-3 w-3 ml-1 cursor-pointer" />
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            North Zone
            <X className="h-3 w-3 ml-1 cursor-pointer" />
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Current Month
            <X className="h-3 w-3 ml-1 cursor-pointer" />
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
