// File: components/monthly-plan-creation.tsx

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  Target,
  Brain,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Route,
  Zap,
  MapPin,
  RefreshCw,
  Eye,
  Plus,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpdatedAIMonthlyPlanner } from "@/components/updated-ai-monthly-planner"

export function MonthlyPlanCreation() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monthly Planning</h1>
          <p className="text-gray-600">Create and manage monthly tour plans with AI assistance</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      <Tabs defaultValue="ai-planner" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ai-planner" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>AI Planner</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Daily Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Plan Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Performance Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-planner" className="space-y-6">
          <UpdatedAIMonthlyPlanner />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          {/* Calendar Header */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">January 2025 - Daily Visit Schedule</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Total: 420 visits planned
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Route className="h-3 w-3 mr-1" />
                    Optimize Routes
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                ← Previous Week
              </Button>
              <Badge variant="outline" className="px-4 py-2">
                Week 1: Jan 1-7, 2025
              </Badge>
              <Button variant="outline" size="sm">
                Next Week →
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-3 w-3 mr-1" />
                Month View
              </Button>
              <Button size="sm">
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve Week
              </Button>
            </div>
          </div>

          {/* Daily Schedule Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {/* Monday */}
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="text-green-800">Monday, Jan 6</span>
                  <Badge className="bg-green-100 text-green-800">8 visits</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <div className="p-2 bg-green-50 rounded text-xs border-l-2 border-green-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">9:00 AM</span>
                      <Badge variant="outline" className="text-xs">
                        Tier A
                      </Badge>
                    </div>
                    <p className="font-semibold">ABC Pharmaceuticals</p>
                    <p className="text-gray-600">Dr. Sharma • 45 min</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-gray-500">2.3 km</span>
                    </div>
                  </div>

                  <div className="p-2 bg-blue-50 rounded text-xs border-l-2 border-blue-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">10:15 AM</span>
                      <Badge variant="outline" className="text-xs">
                        Tier B
                      </Badge>
                    </div>
                    <p className="font-semibold">City Medical Store</p>
                    <p className="text-gray-600">Mr. Patel • 30 min</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-gray-500">1.8 km</span>
                    </div>
                  </div>

                  <div className="p-2 bg-orange-50 rounded text-xs border-l-2 border-orange-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">11:30 AM</span>
                      <Badge variant="outline" className="text-xs">
                        Tier A
                      </Badge>
                    </div>
                    <p className="font-semibold">Metro Hospital</p>
                    <p className="text-gray-600">Dr. Kumar • 60 min</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-gray-500">3.2 km</span>
                    </div>
                  </div>

                  <div className="p-1 bg-gray-100 rounded text-xs text-center text-gray-600">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Lunch Break (12:30-1:30 PM)
                  </div>

                  <div className="text-xs text-center text-gray-500 mt-2">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +4 more visits
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tuesday */}
            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="text-blue-800">Tuesday, Jan 7</span>
                  <Badge className="bg-blue-100 text-blue-800">9 visits</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <div className="p-2 bg-red-50 rounded text-xs border-l-2 border-red-500">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">8:30 AM</span>
                      <Badge variant="destructive" className="text-xs">
                        Priority
                      </Badge>
                    </div>
                    <p className="font-semibold">Global Healthcare</p>
                    <p className="text-gray-600">Dr. Mehta • 50 min</p>
                  </div>

                  <div className="text-xs text-center text-gray-500 mt-2">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +8 more visits
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wednesday */}
            <Card className="border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="text-purple-800">Wednesday, Jan 8</span>
                  <Badge className="bg-purple-100 text-purple-800">7 visits</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-center text-gray-500 mt-2">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  7 visits planned
                </div>
              </CardContent>
            </Card>

            {/* Thursday */}
            <Card className="border-orange-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="text-orange-800">Thursday, Jan 9</span>
                  <Badge className="bg-orange-100 text-orange-800">10 visits</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-center text-gray-500 mt-2">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  10 visits planned
                </div>
              </CardContent>
            </Card>

            {/* Friday */}
            <Card className="border-indigo-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="text-indigo-800">Friday, Jan 10</span>
                  <Badge className="bg-indigo-100 text-indigo-800">8 visits</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-center text-gray-500 mt-2">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  8 visits planned
                </div>
              </CardContent>
            </Card>

            {/* Saturday */}
            <Card className="border-gray-200 bg-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="text-gray-600">Saturday, Jan 11</span>
                  <Badge variant="outline" className="bg-gray-100 text-gray-600">
                    Rest Day
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Weekend Break</p>
                </div>
              </CardContent>
            </Card>

            {/* Sunday */}
            <Card className="border-gray-200 bg-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="text-gray-600">Sunday, Jan 12</span>
                  <Badge variant="outline" className="bg-gray-100 text-gray-600">
                    Rest Day
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <RefreshCw className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Weekly Review</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Day
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Route className="h-4 w-4 mr-2" />
                  Optimize Route
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Clock className="h-4 w-4 mr-2" />
                  Adjust Timing
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {/* Territory Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Customer Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tier A Customers</span>
                    <Badge className="bg-green-100 text-green-800">24</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tier B Customers</span>
                    <Badge className="bg-blue-100 text-blue-800">67</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tier C Customers</span>
                    <Badge className="bg-gray-100 text-gray-800">143</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Churn Risk</span>
                    <Badge variant="destructive">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Performance Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Visit Quality</span>
                    <span className="font-semibold text-green-600">8.2/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Territory Efficiency</span>
                    <span className="font-semibold text-blue-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue Growth</span>
                    <span className="font-semibold text-green-600">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-semibold text-blue-600">4.6/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span>January Targets</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue Target</span>
                    <span className="font-semibold text-purple-600">₹3.2M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Visits</span>
                    <span className="font-semibold text-blue-600">420</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Customers</span>
                    <span className="font-semibold text-green-600">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quality Score</span>
                    <span className="font-semibold text-orange-600">8.5+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Proposed Weekly Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Week 1</h3>
                    <Badge variant="outline">Jan 1-7</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Planned Visits:</span>
                      <span className="font-medium">98</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Target:</span>
                      <span className="font-medium">₹750K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Focus Areas:</span>
                      <span className="font-medium">Tier A</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Week 2</h3>
                    <Badge variant="outline">Jan 8-14</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Planned Visits:</span>
                      <span className="font-medium">105</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Target:</span>
                      <span className="font-medium">₹820K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Focus Areas:</span>
                      <span className="font-medium">Mixed</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Week 3</h3>
                    <Badge variant="outline">Jan 15-21</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Planned Visits:</span>
                      <span className="font-medium">112</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Target:</span>
                      <span className="font-medium">₹890K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Focus Areas:</span>
                      <span className="font-medium">Tier B</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Week 4</h3>
                    <Badge variant="outline">Jan 22-31</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Planned Visits:</span>
                      <span className="font-medium">105</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Target:</span>
                      <span className="font-medium">₹740K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Focus Areas:</span>
                      <span className="font-medium">Recovery</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Optimization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Route className="h-5 w-5 text-green-600" />
                  <span>Route Optimization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">Optimized Routes</p>
                    <p className="text-sm text-green-600">15% efficiency improvement</p>
                  </div>
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Distance:</span>
                    <span className="font-medium">2,340 km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Travel Time:</span>
                    <span className="font-medium">78 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fuel Cost:</span>
                    <span className="font-medium">₹18,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span>Revenue Projections</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-800">Projected Revenue</p>
                    <p className="text-sm text-blue-600">Based on historical data</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conservative:</span>
                    <span className="font-medium">₹2.8M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Expected:</span>
                    <span className="font-medium">₹3.2M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Optimistic:</span>
                    <span className="font-medium">₹3.6M</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* AI Analysis Status */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <Brain className="h-5 w-5" />
                <span>AI Territory Analysis</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  In Progress
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Tier Analysis</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Performance Metrics</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Seasonal Trends</span>
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Churn Risk Assessment</span>
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
