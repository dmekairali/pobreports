"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, Calendar, X } from "lucide-react"

export function AdvancedFilters() {
  const [filters, setFilters] = useState({
    dateRange: "current",
    territories: [],
    performanceRange: [0, 100],
    revenueRange: [0, 5000000],
    customerTiers: [],
    status: "all",
  })

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <span>Advanced Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Date Range</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Current Month
            </Button>
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Last Month
            </Button>
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              This Quarter
            </Button>
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
          </div>
        </div>

        {/* Territory Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Territory Selection</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["North Zone", "South Zone", "East Zone", "West Zone"].map((territory) => (
              <div key={territory} className="flex items-center space-x-2">
                <Checkbox id={territory} />
                <label htmlFor={territory} className="text-sm">
                  {territory}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Range */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Performance Range (%)</label>
          <div className="flex items-center space-x-4">
            <Input type="number" placeholder="Min" className="w-20" />
            <span className="text-gray-500">to</span>
            <Input type="number" placeholder="Max" className="w-20" />
            <div className="flex-1 px-4">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: "87%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Range */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Revenue Range (₹)</label>
          <div className="flex items-center space-x-4">
            <Input type="number" placeholder="Min" className="w-32" />
            <span className="text-gray-500">to</span>
            <Input type="number" placeholder="Max" className="w-32" />
            <Badge variant="outline" className="ml-4">
              ₹1.5M - ₹3.0M
            </Badge>
          </div>
        </div>

        {/* Customer Tier Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Customer Tiers</label>
          <div className="flex items-center space-x-4">
            {["Tier A", "Tier B", "Tier C"].map((tier) => (
              <div key={tier} className="flex items-center space-x-2">
                <Checkbox id={tier} />
                <label htmlFor={tier} className="text-sm">
                  {tier}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* MR Status Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">MR Status</label>
          <div className="flex items-center space-x-4">
            {["Active", "Inactive", "On Leave", "Training"].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox id={status} />
                <label htmlFor={status} className="text-sm">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Applied Filters */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Applied Filters</label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Rajesh Kumar
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              North Zone
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              December 2024
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Performance: 80-100%
              <X className="h-3 w-3 ml-1 cursor-pointer" />
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline">Clear All Filters</Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline">Save Filter Set</Button>
            <Button>Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
