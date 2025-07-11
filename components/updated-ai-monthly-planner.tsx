// File: components/updated-ai-monthly-planner.tsx

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Calendar, Users, Target, TrendingUp, MapPin, AlertCircle, Loader2, RefreshCw } from "lucide-react"
import { useMonthlyPlanning } from "@/hooks/use-monthly-planning"
import { useMedicalRepresentatives, type MedicalRepresentative } from "@/hooks/useMedicalRepresentatives"
import { LiveMRFilterHeader } from "@/components/live-mr-filter-header"
import { generateSampleCustomers, PlanUtils } from "@/lib/monthly-planning-api"

export function UpdatedAIMonthlyPlanner() {
  const { plan, isLoading, error, threadId, generatePlan, clearError, resetPlan } = useMonthlyPlanning()
  const { mrList, loading: mrLoading, error: mrError } = useMedicalRepresentatives()

  const [selectedMR, setSelectedMR] = useState<MedicalRepresentative | null>(null)
  const [selectedTerritory, setSelectedTerritory] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [selectedMonth, setSelectedMonth] = useState(1)
  const [selectedYear, setSelectedYear] = useState(2025)

  const handleGeneratePlan = async () => {
    if (!selectedMR) {
      alert("Please select a Medical Representative first")
      return
    }

    const customers = generateSampleCustomers()

    const request = {
      mrName: selectedMR.name || 'Unknown MR',
      month: selectedMonth,
      year: selectedYear,
      territoryContext: {
        customers,
        previous_performance: {
          total_visits: 380,
          total_revenue: selectedMR.monthly_target ? selectedMR.monthly_target * 0.85 : 2000000,
        },
      },
      action: "generate" as const,
    }

    await generatePlan(request)
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="space-y-6">
      {/* Live MR Filter Header */}
      <LiveMRFilterHeader
        selectedMR={selectedMR}
        selectedTerritory={selectedTerritory}
        selectedPeriod={selectedPeriod}
        onMRChange={setSelectedMR}
        onTerritoryChange={setSelectedTerritory}
        onPeriodChange={setSelectedPeriod}
      />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Monthly Planner</h1>
          <p className="text-gray-600">Generate comprehensive monthly tour plans using AI</p>
        </div>
        <div className="flex items-center space-x-2">
          {threadId && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Active Plan
            </Badge>
          )}
          <Button onClick={resetPlan} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Error Alerts */}
      {mrError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Database Error: {mrError}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            {error}
            <Button onClick={clearError} variant="ghost" size="sm">
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Plan Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>Generate Monthly Plan</span>
          </CardTitle>
          <CardDescription>Create an AI-powered comprehensive monthly tour plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected MR Summary */}
          {selectedMR && (
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">{selectedMR.name || 'Unknown MR'}</h3>
                  <p className="text-sm text-blue-700">
                    {selectedMR.territory || 'N/A'} • Target: ₹{selectedMR.monthly_target ? (selectedMR.monthly_target / 100000).toFixed(1) : '0'}L
                  </p>
                  <p className="text-xs text-blue-600">
                    Manager: {selectedMR.manager_name || 'N/A'} • ID: {selectedMR.employee_id || 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-700">
                    Plan for: {monthNames[selectedMonth - 1]} {selectedYear}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manual Period Override */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full mt-1 p-2 border rounded-md bg-white"
                disabled={isLoading}
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full mt-1 p-2 border rounded-md bg-white"
                disabled={isLoading}
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={handleGeneratePlan} 
            disabled={isLoading || mrLoading || !selectedMR} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating AI Plan...
              </>
            ) : !selectedMR ? (
              <>
                <AlertCircle className="h-4 w-4 mr-2" />
                Select an MR to Generate Plan
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate Plan for {selectedMR.name || 'Selected MR'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Plan Display */}
      {plan && (
        <Tabs defaultValue="overview" className="w-full space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Plans</TabsTrigger>
            <TabsTrigger value="areas">Area Strategy</TabsTrigger>
            <TabsTrigger value="schedule">Visit Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Plan Overview */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="text-blue-800">
                      {plan.mo?.m ? monthNames[plan.mo.m - 1] : 'Unknown'} {plan.mo?.y || 'Unknown'} - {plan.mo?.mr || 'Unknown MR'}
                    </span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">AI Generated</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{plan.mo?.tv || 0}</div>
                    <div className="text-sm text-gray-600">Total Visits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹{plan.mo?.tr ? (plan.mo.tr / 100000).toFixed(1) : '0'}L</div>
                    <div className="text-sm text-gray-600">Target Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{plan.mo?.wd || 0}</div>
                    <div className="text-sm text-gray-600">Working Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{plan.mo?.nt || 0}</div>
                    <div className="text-sm text-gray-600">NBD Visits</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Plan Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Customers Scheduled</div>
                    <div className="text-xl font-semibold">{plan.summary?.total_customers_scheduled || 0}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Visit Days</div>
                    <div className="text-xl font-semibold">{plan.summary?.total_visit_days || 0}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Avg Visits/Day</div>
                    <div className="text-xl font-semibold">{plan.summary?.visits_per_day_avg || 0}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Coverage</div>
                    <div className="text-xl font-semibold text-green-600">
                      {plan.summary?.efficiency_metrics?.customer_coverage || 'N/A'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Weekly breakdown view coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-6">
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Area strategy view coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Visit schedule view coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
