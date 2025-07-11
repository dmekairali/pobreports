// File: components/live-mr-filter-header.tsx

"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, User, MapPin, Calendar, Download, RefreshCw, X, Users, ChevronDown, Loader2 } from "lucide-react"
import { useMedicalRepresentatives, type MedicalRepresentative } from "@/hooks/useMedicalRepresentatives"

interface MRFilterHeaderProps {
  selectedMR?: MedicalRepresentative | null
  selectedTerritory?: string
  selectedPeriod?: string
  onMRChange?: (mr: MedicalRepresentative) => void
  onTerritoryChange?: (territory: string) => void
  onPeriodChange?: (period: string) => void
  onFilterChange?: (filters: any) => void
}

export function LiveMRFilterHeader({
  selectedMR = null,
  selectedTerritory = "all",
  selectedPeriod = "current",
  onMRChange,
  onTerritoryChange,
  onPeriodChange,
}: MRFilterHeaderProps) {
  const { mrList, loading, error, refetch, getUniqueTerritoriesWithCounts } = useMedicalRepresentatives()
  const [showMRDropdown, setShowMRDropdown] = useState(false)
  const [showTerritoryDropdown, setShowTerritoryDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Auto-select first MR if none selected and data is loaded
  useEffect(() => {
    if (!selectedMR && mrList.length > 0 && !loading && onMRChange) {
      onMRChange(mrList[0])
    }
  }, [mrList, selectedMR, loading, onMRChange])

  const territories = getUniqueTerritoriesWithCounts()
  const filteredMRs = mrList.filter(mr => 
    mr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mr.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleMRSelect = useCallback((mr: MedicalRepresentative) => {
    if (onMRChange) {
      onMRChange(mr)
    }
    setShowMRDropdown(false)
    setSearchTerm("")
  }, [onMRChange])

  const handleTerritorySelect = useCallback((territory: string) => {
    if (onTerritoryChange) {
      onTerritoryChange(territory)
    }
    setShowTerritoryDropdown(false)
  }, [onTerritoryChange])

  const clearAllFilters = useCallback(() => {
    if (mrList.length > 0 && onMRChange) {
      onMRChange(mrList[0])
    }
    if (onTerritoryChange) {
      onTerritoryChange("all")
    }
    if (onPeriodChange) {
      onPeriodChange("current")
    }
  }, [mrList, onMRChange, onTerritoryChange, onPeriodChange])

  const handlePeriodChange = useCallback((period: string) => {
    if (onPeriodChange) {
      onPeriodChange(period)
    }
  }, [onPeriodChange])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMRDropdown(false)
      setShowTerritoryDropdown(false)
    }

    if (showMRDropdown || showTerritoryDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showMRDropdown, showTerritoryDropdown])

  if (error) {
    return (
      <Card className="mb-6 border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-red-800">
              <X className="h-5 w-5" />
              <span>Error loading MR data: {error}</span>
            </div>
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* MR Selection */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMRDropdown(!showMRDropdown)
                }}
                disabled={loading}
                className="flex items-center space-x-2 bg-white min-w-[200px]"
              >
                <User className="h-4 w-4 text-blue-600" />
                <div className="text-left flex-1">
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-sm">Loading MRs...</span>
                    </div>
                  ) : selectedMR ? (
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">{selectedMR.name}</p>
                      <p className="text-xs text-blue-600">ID: {selectedMR.employee_id}</p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Select MR</span>
                  )}
                </div>
                <ChevronDown className="h-3 w-3" />
              </Button>

              {showMRDropdown && !loading && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-lg shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-3 border-b">
                    <input
                      type="text"
                      placeholder="Search by name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredMRs.length === 0 ? (
                      <div className="p-3 text-sm text-gray-500 text-center">
                        No MRs found matching "{searchTerm}"
                      </div>
                    ) : (
                      filteredMRs.map((mr) => (
                        <button
                          key={mr.id}
                          onClick={() => handleMRSelect(mr)}
                          className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{mr.name}</p>
                              <p className="text-xs text-gray-600">
                                {mr.employee_id} • {mr.territory}
                              </p>
                              <p className="text-xs text-blue-600">
                                Target: ₹{(mr.monthly_target / 100000).toFixed(1)}L
                              </p>
                            </div>
                            {selectedMR?.id === mr.id && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t bg-gray-50 text-xs text-gray-600 text-center">
                    {mrList.length} total active MRs
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-blue-200"></div>

            {/* Territory Selection */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTerritoryDropdown(!showTerritoryDropdown)
                }}
                disabled={loading}
                className="flex items-center space-x-2 bg-white"
              >
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  {selectedTerritory === "all" 
                    ? "All Territories" 
                    : selectedTerritory
                  }
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>

              {showTerritoryDropdown && !loading && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-lg shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleTerritorySelect("all")}
                    className="w-full p-3 text-left hover:bg-gray-50 border-b"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">All Territories</span>
                      <Badge variant="outline" className="text-xs">
                        {mrList.length} MRs
                      </Badge>
                    </div>
                  </button>
                  {territories.map(({ territory, count }) => (
                    <button
                      key={territory}
                      onClick={() => handleTerritorySelect(territory)}
                      className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{territory}</span>
                        <Badge variant="outline" className="text-xs">
                          {count} MRs
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Period Selection */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <select
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className="text-sm border rounded px-2 py-1 bg-white"
              >
                <option value="current">Current Month</option>
                <option value="next">Next Month</option>
                <option value="previous">Previous Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button variant="outline" size="sm" onClick={refetch}>
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
        {(selectedMR || selectedTerritory !== "all" || selectedPeriod !== "current") && (
          <div className="flex items-center space-x-2 mt-3">
            <span className="text-sm font-medium text-blue-700">Active Filters:</span>
            {selectedMR && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {selectedMR.name}
                <button 
                  onClick={() => mrList.length > 0 && onMRChange && onMRChange(mrList[0])}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTerritory !== "all" && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {selectedTerritory}
                <button 
                  onClick={() => onTerritoryChange && onTerritoryChange("all")}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedPeriod !== "current" && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {selectedPeriod === "next" ? "Next Month" : 
                 selectedPeriod === "previous" ? "Previous Month" : 
                 selectedPeriod === "quarter" ? "This Quarter" : selectedPeriod}
                <button 
                  onClick={() => onPeriodChange && onPeriodChange("current")}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* MR Summary (when specific MR is selected) */}
        {selectedMR && (
          <div className="mt-3 p-3 bg-white/60 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Territory:</span>
                <span className="font-medium ml-1">{selectedMR.territory}</span>
              </div>
              <div>
                <span className="text-gray-600">Manager:</span>
                <span className="font-medium ml-1">{selectedMR.manager_name}</span>
              </div>
              <div>
                <span className="text-gray-600">Monthly Target:</span>
                <span className="font-medium ml-1 text-green-600">₹{(selectedMR.monthly_target / 100000).toFixed(1)}L</span>
              </div>
              <div>
                <span className="text-gray-600">Contact:</span>
                <span className="font-medium ml-1">{selectedMR.phone}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
