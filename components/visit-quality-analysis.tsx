"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MRFilterHeader } from "@/components/mr-filter-header"
import {
  Activity,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Calendar,
  Phone,
  Camera,
  FileText,
  Zap,
} from "lucide-react"

export function VisitQualityAnalysis() {
  return (
    <div className="p-6 space-y-6">
      <MRFilterHeader />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visit Quality Analysis</h1>
          <p className="text-gray-600 mt-1">Real-time visit quality monitoring and suspicious activity detection</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            Live Tracking
          </Badge>
          <Badge variant="destructive" className="animate-pulse">
            <AlertTriangle className="h-3 w-3 mr-1" />2 Suspicious Visits
          </Badge>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            Live Monitor
          </Button>
        </div>
      </div>

      {/* Real-time Quality Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Visit Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-green-600">8.4</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+0.3</span>
              </div>
            </div>
            <Progress value={84} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Target: 8.0+</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Visit Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-600">42m</div>
              <div className="flex items-center text-blue-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Avg</span>
              </div>
            </div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Range: 30-60 min</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Suspicious Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="flex items-center text-red-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm">Today</span>
              </div>
            </div>
            <Progress value={15} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Flagged for review</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">+2%</span>
              </div>
            </div>
            <Progress value={94} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Documentation complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Quality Analysis Tabs */}
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Real-time</span>
          </TabsTrigger>
          <TabsTrigger value="suspicious" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Suspicious</span>
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Quality Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Compliance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-6">
          {/* Live Visit Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Live Visit Tracking</span>
                <Badge className="bg-green-100 text-green-800 animate-pulse">LIVE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-green-800">Active Visit</span>
                        <Badge variant="outline" className="text-green-600">
                          Rajesh Kumar
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Customer</p>
                          <p className="font-semibold">ABC Pharmaceuticals</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Check-in Time</p>
                          <p className="font-semibold">10:15 AM</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold text-green-600">35 min</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Location</p>
                          <p className="font-semibold">Verified ✓</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          GPS Verified
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Camera className="h-3 w-3 mr-1" />
                          Photos Uploaded
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <FileText className="h-3 w-3 mr-1" />
                          Notes Added
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold text-blue-800">Recently Completed</span>
                        <Badge variant="outline" className="text-blue-600">
                          Priya Sharma
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Customer</p>
                          <p className="font-semibold">XYZ Medical Center</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Visit Duration</p>
                          <p className="font-semibold">48 min</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Quality Score</p>
                          <p className="font-semibold text-blue-600">9.2/10</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Completed</p>
                          <p className="font-semibold">9:45 AM</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          All Requirements Met
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          High Quality
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Visit Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Today's Visit Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-green-700">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-blue-700">In Progress</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">5</div>
                    <div className="text-sm text-orange-700">Scheduled</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-red-700">Flagged</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  <span>Quality Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Excellent (9-10)</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={35} className="w-20" />
                      <span className="text-sm font-semibold">8 visits</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Good (7-8.9)</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={52} className="w-20" />
                      <span className="text-sm font-semibold">12 visits</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average (5-6.9)</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={13} className="w-20" />
                      <span className="text-sm font-semibold">3 visits</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Poor (&lt; 5)</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={0} className="w-20" />
                      <span className="text-sm font-semibold">0 visits</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suspicious" className="space-y-6">
          {/* Suspicious Visit Detection */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                <span>Suspicious Visit Detection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="destructive">HIGH RISK</Badge>
                        <span className="font-semibold text-red-800">Suspicious Check-in/out Pattern</span>
                        <Badge variant="outline" className="text-red-600">
                          Vikram Singh
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Customer</p>
                          <p className="font-semibold">Metro Hospital</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Check-in</p>
                          <p className="font-semibold">2:15 PM</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Check-out</p>
                          <p className="font-semibold text-red-600">2:18 PM</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold text-red-600">3 min</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Extremely short visit
                        </Badge>
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          Location mismatch
                        </Badge>
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          No documentation
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" variant="destructive">
                        <Phone className="h-3 w-3 mr-1" />
                        Call Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Investigate
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-orange-100 text-orange-800">MEDIUM RISK</Badge>
                        <span className="font-semibold text-orange-800">Unusual Visit Pattern</span>
                        <Badge variant="outline" className="text-orange-600">
                          Amit Patel
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Customer</p>
                          <p className="font-semibold">City Clinic</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Visit Time</p>
                          <p className="font-semibold">11:30 PM</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold text-orange-600">15 min</p>
                        </div>
                        <div>
                          <p className="text-gray-600">GPS Accuracy</p>
                          <p className="font-semibold text-orange-600">±50m</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Unusual timing
                        </Badge>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          GPS variance
                        </Badge>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          <FileText className="h-3 w-3 mr-1" />
                          Minimal notes
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Eye className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suspicious Activity Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-red-600" />
                  <span>Risk Indicators</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                    <span className="text-sm font-medium">Visit Duration &lt; 5 min</span>
                    <Badge variant="destructive">1 case</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                    <span className="text-sm font-medium">GPS Location Variance</span>
                    <Badge className="bg-orange-100 text-orange-800">3 cases</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span className="text-sm font-medium">Missing Documentation</span>
                    <Badge className="bg-yellow-100 text-yellow-800">2 cases</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm font-medium">Unusual Timing</span>
                    <Badge className="bg-blue-100 text-blue-800">1 case</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingDown className="h-5 w-5 text-orange-600" />
                  <span>Weekly Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">This Week</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={15} className="w-20" />
                      <span className="text-sm font-semibold text-red-600">7 flags</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Week</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={8} className="w-20" />
                      <span className="text-sm font-semibold">4 flags</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">2 Weeks Ago</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={12} className="w-20" />
                      <span className="text-sm font-semibold">6 flags</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">3 Weeks Ago</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={5} className="w-20" />
                      <span className="text-sm font-semibold">2 flags</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          {/* Quality Metrics Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span>Quality Score Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Visit Duration</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={85} className="w-20" />
                      <span className="text-sm font-semibold">8.5/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Documentation Quality</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={92} className="w-20" />
                      <span className="text-sm font-semibold">9.2/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Interaction</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={78} className="w-20" />
                      <span className="text-sm font-semibold">7.8/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Follow-up Actions</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={88} className="w-20" />
                      <span className="text-sm font-semibold">8.8/10</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>MR Performance Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Priya Sharma</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={92} className="w-20" />
                      <span className="text-sm font-semibold text-green-600">9.2</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rajesh Kumar</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={84} className="w-20" />
                      <span className="text-sm font-semibold text-blue-600">8.4</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sneha Reddy</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={79} className="w-20" />
                      <span className="text-sm font-semibold text-orange-600">7.9</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Amit Patel</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={76} className="w-20" />
                      <span className="text-sm font-semibold text-yellow-600">7.6</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Compliance Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700">Completed Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">GPS Location Verification</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Photo Documentation</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Visit Notes</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Customer Signature</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700">Missing Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">Product Samples Tracking</span>
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm">Competitor Analysis</span>
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <span className="text-sm">Follow-up Schedule</span>
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
