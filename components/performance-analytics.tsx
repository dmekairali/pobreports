import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  MapPin,
  Clock,
  Star,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Filter,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { MRFilterHeader } from "@/components/mr-filter-header"

export function PerformanceAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <MRFilterHeader />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive performance insights and trend analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency Metrics</TabsTrigger>
          <TabsTrigger value="quality">Quality Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹18.4M</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      <p className="text-xs text-green-600">+12% vs last month</p>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Visit Completion</p>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-blue-600 mr-1" />
                      <p className="text-xs text-blue-600">+5% improvement</p>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Quality Score</p>
                    <p className="text-2xl font-bold text-gray-900">8.2</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-600 mr-1" />
                      <p className="text-xs text-yellow-600">Excellent rating</p>
                    </div>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Territory Coverage</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 text-purple-600 mr-1" />
                      <p className="text-xs text-purple-600">Optimal coverage</p>
                    </div>
                  </div>
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>MR Performance Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Excellent (90%+)</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={25} className="w-24 h-2" />
                      <span className="text-sm font-semibold">6 MRs</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Good (80-89%)</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={50} className="w-24 h-2" />
                      <span className="text-sm font-semibold">12 MRs</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average (70-79%)</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={20} className="w-24 h-2" />
                      <span className="text-sm font-semibold">5 MRs</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Below Average (70% and below)</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={5} className="w-24 h-2" />
                      <span className="text-sm font-semibold">1 MR</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-green-600" />
                  <span>Revenue by Zone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">North Zone</span>
                    </div>
                    <span className="font-semibold">₹5.2M (28%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">West Zone</span>
                    </div>
                    <span className="font-semibold">₹4.8M (26%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">South Zone</span>
                    </div>
                    <span className="font-semibold">₹4.6M (25%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">East Zone</span>
                    </div>
                    <span className="font-semibold">₹3.8M (21%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top and Bottom Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <TrendingUp className="h-5 w-5" />
                  <span>Top Performers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Neha Patel", zone: "East", score: 96, revenue: "₹3.5M" },
                    { name: "Rajesh Kumar", zone: "North", score: 94, revenue: "₹3.2M" },
                    { name: "Suresh Reddy", zone: "South", score: 89, revenue: "₹2.9M" },
                  ].map((mr, index) => (
                    <div key={mr.name} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-green-800">{mr.name}</p>
                          <p className="text-sm text-green-600">{mr.zone} Zone</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-800">{mr.score}%</p>
                        <p className="text-sm text-green-600">{mr.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <TrendingUp className="h-5 w-5 rotate-180" />
                  <span>Needs Improvement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Amit Shah", zone: "West", score: 68, revenue: "₹1.8M", issue: "Low visit completion" },
                    { name: "Ravi Kumar", zone: "South", score: 72, revenue: "₹2.1M", issue: "Quality concerns" },
                    { name: "Deepak Singh", zone: "North", score: 75, revenue: "₹2.3M", issue: "Territory coverage" },
                  ].map((mr, index) => (
                    <div key={mr.name} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          !
                        </div>
                        <div>
                          <p className="font-semibold text-red-800">{mr.name}</p>
                          <p className="text-sm text-red-600">{mr.zone} Zone</p>
                          <p className="text-xs text-red-500">{mr.issue}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-red-800">{mr.score}%</p>
                        <p className="text-sm text-red-600">{mr.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          {/* Revenue Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">₹18.4M</p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-sm text-gray-600">Target Achievement</p>
                  <p className="text-xs text-blue-600 mt-1">₹20M target</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">₹9,967</p>
                  <p className="text-sm text-gray-600">Revenue per Visit</p>
                  <p className="text-xs text-purple-600 mt-1">Above average</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span>Revenue Breakdown by Category</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm">Tier A Customers</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress value={65} className="w-32 h-2" />
                    <span className="font-semibold">₹11.96M (65%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm">Tier B Customers</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress value={25} className="w-32 h-2" />
                    <span className="font-semibold">₹4.6M (25%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">Tier C Customers</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress value={10} className="w-32 h-2" />
                    <span className="font-semibold">₹1.84M (10%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                <span>Monthly Revenue Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Revenue Trend Chart</p>
                  <p className="text-sm text-gray-500">6-month revenue progression with forecasting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Efficiency Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">6.2h</p>
                  <p className="text-sm text-gray-600">Avg Visit Time</p>
                  <p className="text-xs text-blue-600 mt-1">Optimal range</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">89%</p>
                  <p className="text-sm text-gray-600">Route Efficiency</p>
                  <p className="text-xs text-green-600 mt-1">+7% improvement</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                  <p className="text-sm text-gray-600">Visit Completion</p>
                  <p className="text-xs text-purple-600 mt-1">Above target</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">7.7</p>
                  <p className="text-sm text-gray-600">Visits per Day</p>
                  <p className="text-xs text-orange-600 mt-1">High productivity</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Efficiency Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Time Utilization Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Visits</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={70} className="w-24 h-2" />
                      <span className="text-sm font-semibold">70%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Travel Time</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={20} className="w-24 h-2" />
                      <span className="text-sm font-semibold">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Administrative Tasks</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={7} className="w-24 h-2" />
                      <span className="text-sm font-semibold">7%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Break Time</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={3} className="w-24 h-2" />
                      <span className="text-sm font-semibold">3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Territory Coverage Efficiency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High-Value Areas</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={95} className="w-24 h-2" />
                      <span className="text-sm font-semibold">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medium-Value Areas</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={87} className="w-24 h-2" />
                      <span className="text-sm font-semibold">87%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Low-Value Areas</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={72} className="w-24 h-2" />
                      <span className="text-sm font-semibold">72%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Territories</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={45} className="w-24 h-2" />
                      <span className="text-sm font-semibold">45%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          {/* Quality Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">8.2</p>
                  <p className="text-sm text-gray-600">Avg Quality Score</p>
                  <p className="text-xs text-yellow-600 mt-1">Excellent rating</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">4.6</p>
                  <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  <p className="text-xs text-green-600 mt-1">Out of 5.0</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-sm text-gray-600">Visit Quality</p>
                  <p className="text-xs text-blue-600 mt-1">Above standard</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">2.1%</p>
                  <p className="text-sm text-gray-600">Quality Issues</p>
                  <p className="text-xs text-red-600 mt-1">Low incident rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quality Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Quality Score Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Excellent (9.0-10.0)</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={35} className="w-32 h-2" />
                    <span className="text-sm font-semibold">35% of visits</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Good (8.0-8.9)</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={45} className="w-32 h-2" />
                    <span className="text-sm font-semibold">45% of visits</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average (7.0-7.9)</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={15} className="w-32 h-2" />
                    <span className="text-sm font-semibold">15% of visits</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Below Average (7.0 and below)</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={5} className="w-32 h-2" />
                    <span className="text-sm font-semibold">5% of visits</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Trend Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                <span>Performance Trends (Last 6 Months)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Multi-metric Trend Analysis</p>
                  <p className="text-sm text-gray-500">Revenue, Quality, Efficiency trends over time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <TrendingUp className="h-5 w-5" />
                  <span>Positive Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Revenue Growth</span>
                    <Badge className="bg-green-100 text-green-800">+12% MoM</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Visit Completion Rate</span>
                    <Badge className="bg-green-100 text-green-800">+5% MoM</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Customer Satisfaction</span>
                    <Badge className="bg-green-100 text-green-800">+0.3 points</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700">Territory Coverage</span>
                    <Badge className="bg-green-100 text-green-800">+8% MoM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Areas for Attention</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-700">New Customer Acquisition</span>
                    <Badge className="bg-yellow-100 text-yellow-800">-2% MoM</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-700">Average Visit Duration</span>
                    <Badge className="bg-yellow-100 text-yellow-800">+15 min</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-700">Route Efficiency</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Stable</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-700">Quality Consistency</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Variable</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
