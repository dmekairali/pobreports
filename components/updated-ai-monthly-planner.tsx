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
  const [selectedMonth, setSelectedMonth] = useState(1) // January
  const [selectedYear, setSelectedYear] = useState(2025)

  const handleGeneratePlan = async () => {
    if (!selectedMR) {
      alert("Please select a Medical Representative first")
      return
    }

    // Generate sample customers based on selected MR's territory
    const customers = generateSampleCustomers()

    const request = {
      mrName: selectedMR.name,
      month: selectedMonth,
      year: selectedYear,
      territoryContext: {
        customers,
        previous_performance: {
          total_visits: 380,
          total_revenue: selectedMR.monthly_target * 0.85, // 85% of target as previous performance
        },
      },
      action: "generate" as const,
    }

    await generatePlan(request)
  }

  const getPeriodDates = () => {
    const now = new Date()
    switch (selectedPeriod) {
      case "current":
        return { month: now.getMonth() + 1, year: now.getFullYear() }
      case "next":
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        return { month: nextMonth.getMonth() + 1, year: nextMonth.getFullYear() }
      case "previous":
        const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        return { month: prevMonth.getMonth() + 1, year: prevMonth.getFullYear() }
      case "quarter":
        return { month: now.getMonth() + 1, year: now.getFullYear() }
      default:
        return { month: selectedMonth, year: selectedYear }
    }
  }

  const periodDates = getPeriodDates()
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
              Thread: {threadId.substring(0, 8)}...
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
                  <h3 className="font-semibold text-blue-900">{selectedMR.name}</h3>
                  <p className="text-sm text-blue-700">
                    {selectedMR.territory} • Target: ₹{(selectedMR.monthly_target / 100000).toFixed(1)}L
                  </p>
                  <p className="text-xs text-blue-600">
                    Manager: {selectedMR.manager_name} • ID: {selectedMR.employee_id}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-700">
                    Plan for: {monthNames[periodDates.month - 1]} {periodDates.year}
                  </div>
                  <div className="text-xs text-blue-600">
                    Period: {selectedPeriod === "current" ? "Current Month" : 
                             selectedPeriod === "next" ? "Next Month" : 
                             selectedPeriod === "previous" ? "Previous Month" : 
                             "This Quarter"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Manual Period Override */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Override Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number.parseInt(e.target.value))}
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
              <label className="text-sm font-medium text-gray-700">Override Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number.parseInt(e.target.value))}
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
                Generating AI Plan for {selectedMR?.name}...
              </>
            ) : !selectedMR ? (
              <>
                <AlertCircle className="h-4 w-4 mr-2" />
                Select an MR to Generate Plan
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate Monthly Plan for {selectedMR.name}
              </>
            )}
          </Button>

          {/* Territory Statistics */}
          {selectedMR && !mrLoading && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Territory Context</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Territory:</span>
                  <span className="font-medium ml-1">{selectedMR.territory}</span>
                </div>
                <div>
                  <span className="text-gray-600">Target:</span>
                  <span className="font-medium ml-1 text-green-600">₹{(selectedMR.monthly_target / 100000).toFixed(1)}L</span>
                </div>
                <div>
                  <span className="text-gray-600">Joining Date:</span>
                  <span className="font-medium ml-1">{new Date(selectedMR.joining_date).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium ml-1">
                    {Math.floor((Date.now() - new Date(selectedMR.joining_date).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                  </span>
                </div>
              </div>
            </div>
          )}
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
                      {monthNames[plan.mo.m - 1]} {plan.mo.y} - {plan.mo.mr}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-blue-100 text-blue-800">AI Generated</Badge>
                    {selectedMR && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Target: ₹{(selectedMR.monthly_target / 100000).toFixed(1)}L
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{plan.mo.tv}</div>
                    <div className="text-sm text-gray-600">Total Visits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹{(plan.mo.tr / 100000).toFixed(1)}L</div>
                    <div className="text-sm text-gray-600">Target Revenue</div>
                    {selectedMR && (
                      <div className="text-xs text-gray-500">
                        {((plan.mo.tr / selectedMR.monthly_target) * 100).toFixed(0)}% of target
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{plan.mo.wd}</div>
                    <div className="text-sm text-gray-600">Working Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{plan.mo.nt}</div>
                    <div className="text-sm text-gray-600">NBD Visits</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MR Performance Context */}
            {selectedMR && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-800">
                    <Users className="h-5 w-5" />
                    <span>MR Performance Context</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        ₹{(selectedMR.monthly_target / 100000).toFixed(1)}L
                      </div>
                      <div className="text-sm text-green-700">Monthly Target</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{selectedMR.territory}</div>
                      <div className="text-sm text-blue-700">Territory</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{selectedMR.manager_name}</div>
                      <div className="text-sm text-purple-700">Manager</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-orange-600">
                        {Math.floor((Date.now() - new Date(selectedMR.joining_date).getTime()) / (1000 * 60 * 60 * 24 * 365))}Y
                      </div>
                      <div className="text-sm text-orange-700">Experience</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tier Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Customer Tier Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{plan.mo.td[0]}</div>
                    <div className="text-sm text-green-700">Tier 2 Performers</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{plan.mo.td[1]}</div>
                    <div className="text-sm text-blue-700">Tier 3 Developers</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{plan.mo.td[2]}</div>
                    <div className="text-sm text-orange-700">Tier 4 Prospects</div>
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
                    <div className="text-xl font-semibold">{plan.summary.total_customers_scheduled}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Visit Days</div>
                    <div className="text-xl font-semibold">{plan.summary.total_visit_days}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Avg Visits/Day</div>
                    <div className="text-xl font-semibold">{plan.summary.visits_per_day_avg}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Coverage</div>
                    <div className="text-xl font-semibold text-green-600">
                      {plan.summary.efficiency_metrics.customer_coverage}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            {/* Weekly Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plan.wp.map((week) => {
                const dates = PlanUtils.calculateWeekDates(week, plan.mo.m, plan.mo.y)
                const workingDays = PlanUtils.getWorkingDaysInWeek(week, plan.mo.m, plan.mo.y)

                return (
                  <Card key={week.w} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Week {week.w}</span>
                        <Badge variant="outline">
                          {dates.start} - {dates.end}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Target Visits</div>
                          <div className="text-xl font-semibold text-blue-600">{week.tv}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Target Revenue</div>
                          <div className="text-xl font-semibold text-green-600">₹{(week.tr / 100000).toFixed(1)}L</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">Focus Areas</div>
                        <div className="flex flex-wrap gap-1">
                          {week.fa.map((area, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">Priority Customers</div>
                        <div className="flex flex-wrap gap-1">
                          {week.pc.map((customer, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {customer}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-700 mb-1">Strategy</div>
                        <div className="text-sm text-gray-600">{week.strategy}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-6">
            {/* Area Coverage Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(plan.acs).map(([areaName, areaData]) => (
                <Card key={areaName}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{areaName}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-600">Customers</div>
                        <div className="text-lg font-semibold">{areaData.tc}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600">Planned Visits</div>
                        <div className="text-lg font-semibold text-blue-600">{areaData.pv}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 mb-1">Focus Weeks</div>
                      <div className="flex space-x-1">
                        {areaData.fw.map((week) => (
                          <Badge key={week} variant="outline" className="text-xs">
                            W{week}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-600 mb-1">Efficiency Rating</div>
                      <Badge
                        className={`text-xs ${
                          areaData.er === "HIGH"
                            ? "bg-green-100 text-green-800"
                            : areaData.er === "MEDIUM"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {areaData.er}
                      </Badge>
                    </div>

                    <div className="p-2 bg-gray-50 rounded text-xs">
                      <div className="font-medium text-gray-700 mb-1">Strategy</div>
                      <div className="text-gray-600">{areaData.strategy}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            {/* Visit Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Customer Visit Schedule</span>
                </CardTitle>
                <CardDescription>
                  Detailed visit dates for {selectedMR?.name} in {selectedMR?.territory}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(plan.cvs).map(([customerCode, visitDates]) => (
                    <div key={customerCode} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{customerCode}</div>
                        <div className="text-sm text-gray-600">{visitDates.length} visits planned</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {visitDates.map((date, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {PlanUtils.formatDate(date, plan.mo.m, plan.mo.y)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Area Visit Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Area Visit Schedule</span>
                </CardTitle>
                <CardDescription>
                  Planned visit days for each area in {selectedMR?.territory}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(plan.avs).map(([areaName, visitDates]) => (
                    <div key={areaName} className="p-4 border rounded-lg">
                      <div className="font-medium mb-2">{areaName}</div>
                      <div className="flex flex-wrap gap-1">
                        {visitDates.map((date, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {PlanUtils.formatDate(date, plan.mo.m, plan.mo.y)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Plan Metadata */}
      {plan && selectedMR && (
        <Card className="border-gray-200 bg-gray-50">
          <CardHeader>
            <CardTitle className="text-sm text-gray-700">Plan Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Generated For</div>
                <div className="font-medium">{selectedMR.name}</div>
              </div>
              <div>
                <div className="text-gray-600">Territory</div>
                <div className="font-medium">{selectedMR.territory}</div>
              </div>
              <div>
                <div className="text-gray-600">Generated</div>
                <div className="font-medium">{new Date(plan.metadata.generated_at).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-600">Method</div>
                <div className="font-medium">{plan.metadata.generation_method}</div>
              </div>
              <div>
                <div className="text-gray-600">Tokens Used</div>
                <div className="font-medium">{plan.metadata.tokens_used.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
