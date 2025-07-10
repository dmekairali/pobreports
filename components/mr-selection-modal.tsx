"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { User, MapPin, Target, TrendingUp, Search, CheckCircle } from "lucide-react"

interface MRData {
  id: string
  name: string
  territory: string
  performance: number
  visits: number
  revenue: string
  status: "active" | "inactive"
}

const mrData: MRData[] = [
  {
    id: "MR001",
    name: "Rajesh Kumar",
    territory: "North Zone",
    performance: 87,
    visits: 342,
    revenue: "₹2.4M",
    status: "active",
  },
  {
    id: "MR002",
    name: "Priya Sharma",
    territory: "South Zone",
    performance: 92,
    visits: 398,
    revenue: "₹2.8M",
    status: "active",
  },
  {
    id: "MR003",
    name: "Amit Patel",
    territory: "East Zone",
    performance: 78,
    visits: 287,
    revenue: "₹1.9M",
    status: "active",
  },
  {
    id: "MR004",
    name: "Sneha Reddy",
    territory: "West Zone",
    performance: 85,
    visits: 324,
    revenue: "₹2.2M",
    status: "active",
  },
  {
    id: "MR005",
    name: "Vikram Singh",
    territory: "North Zone",
    performance: 74,
    visits: 256,
    revenue: "₹1.7M",
    status: "inactive",
  },
]

export function MRSelectionModal() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTerritory, setSelectedTerritory] = useState("all")
  const [selectedMR, setSelectedMR] = useState("MR001")

  const filteredMRs = mrData.filter((mr) => {
    const matchesSearch =
      mr.name.toLowerCase().includes(searchTerm.toLowerCase()) || mr.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTerritory =
      selectedTerritory === "all" || mr.territory.toLowerCase().includes(selectedTerritory.toLowerCase())
    return matchesSearch && matchesTerritory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or MR ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedTerritory}
          onChange={(e) => setSelectedTerritory(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Territories</option>
          <option value="north">North Zone</option>
          <option value="south">South Zone</option>
          <option value="east">East Zone</option>
          <option value="west">West Zone</option>
        </select>
      </div>

      {/* MR Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMRs.map((mr) => (
          <Card
            key={mr.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedMR === mr.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setSelectedMR(mr.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-sm font-semibold">{mr.name}</CardTitle>
                    <p className="text-xs text-gray-600">{mr.id}</p>
                  </div>
                </div>
                {selectedMR === mr.id && <CheckCircle className="h-5 w-5 text-blue-600" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{mr.territory}</span>
                <Badge
                  variant={mr.status === "active" ? "default" : "secondary"}
                  className={mr.status === "active" ? "bg-green-100 text-green-800" : ""}
                >
                  {mr.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Performance</p>
                  <p className="font-semibold text-blue-600">{mr.performance}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Visits</p>
                  <p className="font-semibold">{mr.visits}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Revenue</p>
                  <p className="font-semibold text-green-600">{mr.revenue}</p>
                </div>
                <TrendingUp
                  className={`h-4 w-4 ${
                    mr.performance >= 85 ? "text-green-500" : mr.performance >= 75 ? "text-orange-500" : "text-red-500"
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats for Selected MR */}
      {selectedMR && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Target className="h-5 w-5" />
              <span>Selected MR Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const mr = mrData.find((m) => m.id === selectedMR)
              return mr ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{mr.performance}%</div>
                    <div className="text-sm text-blue-700">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{mr.visits}</div>
                    <div className="text-sm text-green-700">Total Visits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{mr.revenue}</div>
                    <div className="text-sm text-purple-700">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{mr.territory}</div>
                    <div className="text-sm text-orange-700">Territory</div>
                  </div>
                </div>
              ) : null
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
