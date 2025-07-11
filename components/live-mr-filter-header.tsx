// File: components/live-mr-filter-header.tsx

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, User, MapPin, Calendar, Download, RefreshCw, X, Loader2, ChevronDown } from "lucide-react"
import { useMedicalRepresentatives, type MedicalRepresentative } from "@/hooks/useMedicalRepresentatives"

interface MRFilterHeaderProps {
  selectedMR?: MedicalRepresentative | null
  selectedTerritory?: string
  selectedPeriod?: string
  onMRChange?: (mr: MedicalRepresentative) => void
  onTerritoryChange?: (territory: string) => void
  onPeriodChange?: (period: string) => void
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

  // Auto-select first MR if none selected
  useEffect(() => {
    if (!selectedMR && mrList && mrList.length > 0 && !loading && onMRChange) {
      onMRChange(mrList[0])
    }
  }, [mrList, selectedMR, loading, onMRChange])

  const territories = getUniqueTerritoriesWithCounts() || []
  const validMrList = mrList || []

  const handleMRSelect = (mr: MedicalRepresentative) => {
    if (onMRChange) {
      onMRChange(mr)
    }
    setShowMRDropdown(false)
  }

  const handleTerritorySelect = (territory: string) => {
    if (onTerritoryChange) {
      onTerritoryChange(territory)
    }
    setShowTerritoryDropdown(false)
  }

  if (error) {
    return (
      <Card className="mb-6 border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-red-800">
              <X className="h-5 w-5" />
              <span>Error: {error}</span>
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
                onClick={() => setShowMRDropdown(!showMRDropdown)}
                disabled={loading}
                className="flex items-center space-x-2 bg-white min-w-[200px]"
              >
                <User className="h-4 w-4 text-blue-600" />
                <div className="text-left flex-1">
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-sm">Loading...</span>
                    </div>
                  ) : selectedMR ? (
                    <div>
                      <p className="font-semibold text-blue-900 text-sm">{selectedMR.name || 'Unknown'}</p>
                      <p className="text-xs text-blue-600">ID: {selectedMR.employee_id || 'N/A'}</p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Select MR</span>
                  )}
                </div>
                <ChevronDown className="h-3 w-3" />
              </Button>

              {showMRDropdown && !loading && validMrList.length > 0 && (
                <div className="absolute top-full left-0 mt-1 w-80 bg-white border rounded-lg shadow-lg z-50">
                  <div className="max-h-60 overflow-y-auto">
                    {validMrList.map((mr) => {
                      if (!mr || !mr.id) return null
                      
                      return (
                        <button
                          key={mr.id}
                          onClick={() => handleMRSelect(mr)}
                          className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{mr.name || 'Unknown'}</p>
                              <p className="text-xs text-gray-600">
                                {mr.employee_id || 'N/A'} • {mr.territory || 'N/A'}
                              </p>
                              {mr.monthly_target && (
                                <p className="text-xs text-blue-600">
                                  Target: ₹{(mr.monthly_target / 100000).toFixed(1)}L
                                </p>
                              )}
                            </div>
                            {selectedMR?.id === mr.id && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <div className="p-2 border-t bg-gray-50 text-xs text-gray-600 text-center">
                    {validMrList.length} total MRs
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-blue-200"></div>

            {/* Territory Selection */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowTerritoryDropdown(!showTerritoryDropdown)}
                disabled={loading}
                className="flex items-center space-x-2 bg-white"
              >
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm">
                  {selectedTerritory === "all" ? "All Territories" : selectedTerritory}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>

              {showTerritoryDropdown && !loading && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => handleTerritorySelect("all")}
                    className="w-full p-3 text-left hover:bg-gray-50 border-b"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">All Territories</span>
                      <Badge variant="outline" className="text-xs">
                        {validMrList.length} MRs
                      </Badge>
                    </div>
                  </button>
                  {territories.map(({ territory, count }) => {
                    if (!territory) return null
                    
                    return (
                      <button
                        key={territory}
                        onClick={() => handleTerritorySelect(territory)}
                        className="w-full p-3 text-left hover:bg-gray-50 border-b last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{territory}</span>
                          <Badge variant="outline" className="text-xs">
                            {count || 0} MRs
                          </Badge>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Period Selection */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <select
                value={selectedPeriod || "current"}
                onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
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
              Filters
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

        {/* MR Summary */}
        {selectedMR && (
          <div className="mt-3 p-3 bg-white/60 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Territory:</span>
                <span className="font-medium ml-1">{selectedMR.territory || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Manager:</span>
                <span className="font-medium ml-1">{selectedMR.manager_name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Target:</span>
                <span className="font-medium ml-1 text-green-600">
                  ₹{selectedMR.monthly_target ? (selectedMR.monthly_target / 100000).toFixed(1) : '0'}L
                </span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium ml-1">{selectedMR.phone || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
