"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, TrendingUp, Target, CheckCircle, AlertTriangle, Clock, RefreshCw, FileText, Eye } from "lucide-react"
import { MRFilterHeader } from "@/components/mr-filter-header"

export function WeeklyRevision() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Weekly Revision</h1>
        <p className="text-gray-600">Review and adjust weekly plans</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Week of January 15-21, 2024</CardTitle>
          <CardDescription>Performance review and plan adjustments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 space-y-6">
            <MRFilterHeader />

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Weekly Revision & Analysis</h1>
                <p className="text-gray-600 mt-1">Performance review and plan adjustments for Week 2, January 2025</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Revisions
                </Button>
              </div>
            </div>

            <Tabs defaultValue="performance" className="w-full space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="performance">Performance Review</TabsTrigger>
                <TabsTrigger value="deviations">Plan Deviations</TabsTrigger>
                <TabsTrigger value="adjustments">Proposed Adjustments</TabsTrigger>
                <TabsTrigger value="approval">Approval & Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="performance" className="space-y-6">
                {/* Week Summary */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-800">
                      <Calendar className="h-5 w-5" />
                      <span>Week 2 Performance Summary (Jan 8-14, 2025)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">98</div>
                        <div className="text-sm text-blue-700">Planned Visits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">89</div>
                        <div className="text-sm text-green-700">Completed Visits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">₹742K</div>
                        <div className="text-sm text-purple-700">Revenue Generated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">91%</div>
                        <div className="text-sm text-orange-700">Completion Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-green-600" />
                        <span>Target vs Achievement</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Visit Completion</span>
                          <span>89 / 98 visits</span>
                        </div>
                        <Progress value={91} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>91% completed</span>
                          <span className="text-green-600">+3% vs target</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Revenue Target</span>
                          <span>₹742K / ₹820K</span>
                        </div>
                        <Progress value={90} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>90% achieved</span>
                          <span className="text-red-600">-10% vs target</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Quality Score</span>
                          <span>8.4 / 8.5</span>
                        </div>
                        <Progress value={99} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>99% of target</span>
                          <span className="text-green-600">Excellent</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>New Customers</span>
                          <span>3 / 4 customers</span>
                        </div>
                        <Progress value={75} className="h-3" />
                        <div className="flex justify-between text-xs text-gray-600 mt-1">
                          <span>75% achieved</span>
                          <span className="text-yellow-600">Below target</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span>Performance Trends</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-green-800">Visit Efficiency</p>
                          <p className="text-sm text-green-600">Improved by 5%</p>
                        </div>
                        <div className="text-2xl font-bold text-green-600">↑</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-red-800">Revenue per Visit</p>
                          <p className="text-sm text-red-600">Decreased by 8%</p>
                        </div>
                        <div className="text-2xl font-bold text-red-600">↓</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-blue-800">Customer Satisfaction</p>
                          <p className="text-sm text-blue-600">Maintained at 4.6/5</p>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">→</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-yellow-800">Territory Coverage</p>
                          <p className="text-sm text-yellow-600">Slight improvement</p>
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">↗</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Daily Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      <span>Daily Performance Breakdown</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                      {[
                        { day: "Mon", date: "8", visits: "14/15", revenue: "₹98K", status: "good" },
                        { day: "Tue", date: "9", visits: "13/14", revenue: "₹112K", status: "excellent" },
                        { day: "Wed", date: "10", visits: "12/13", revenue: "₹89K", status: "good" },
                        { day: "Thu", date: "11", visits: "15/16", revenue: "₹134K", status: "excellent" },
                        { day: "Fri", date: "12", visits: "11/14", revenue: "₹87K", status: "warning" },
                        { day: "Sat", date: "13", visits: "12/13", revenue: "₹108K", status: "good" },
                        { day: "Sun", date: "14", visits: "12/13", revenue: "₹114K", status: "good" },
                      ].map((day) => (
                        <div key={day.day} className="p-3 border rounded-lg text-center">
                          <div className="font-semibold text-gray-900">{day.day}</div>
                          <div className="text-sm text-gray-600 mb-2">Jan {day.date}</div>
                          <div className="space-y-1">
                            <div className="text-xs">
                              <span className="font-medium">{day.visits}</span>
                              <div className="text-gray-500">visits</div>
                            </div>
                            <div className="text-xs">
                              <span className="font-medium text-green-600">{day.revenue}</span>
                              <div className="text-gray-500">revenue</div>
                            </div>
                            <Badge
                              className={`text-xs ${
                                day.status === "excellent"
                                  ? "bg-green-100 text-green-800"
                                  : day.status === "good"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {day.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deviations" className="space-y-6">
                {/* Plan Deviations */}
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Identified Plan Deviations</span>
                      <Badge className="bg-orange-100 text-orange-800">9 issues</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-red-800">Missed High-Priority Visits</h4>
                            <p className="text-sm text-red-600 mt-1">
                              3 Tier-A customers were not visited as planned on Friday
                            </p>
                            <div className="mt-2 space-y-1">
                              <p className="text-xs text-red-700">• Metro Hospital - Dr. Kumar (Rescheduled)</p>
                              <p className="text-xs text-red-700">• ABC Pharmaceuticals - Dr. Sharma (Cancelled)</p>
                              <p className="text-xs text-red-700">• Prime Healthcare - Dr. Patel (No-show)</p>
                            </div>
                          </div>
                          <Badge variant="destructive">Critical</Badge>
                        </div>
                      </div>

                      <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-yellow-800">Route Optimization Issues</h4>
                            <p className="text-sm text-yellow-600 mt-1">
                              Inefficient routing on Tuesday and Thursday increased travel time by 2.5 hours
                            </p>
                            <div className="mt-2">
                              <p className="text-xs text-yellow-700">
                                Impact: Reduced visit time, increased fuel costs
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                        </div>
                      </div>

                      <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-blue-800">New Customer Acquisition Shortfall</h4>
                            <p className="text-sm text-blue-600 mt-1">Only 3 new customers acquired vs target of 4</p>
                            <div className="mt-2">
                              <p className="text-xs text-blue-700">
                                Reason: One prospect meeting cancelled due to scheduling conflict
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">Low</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Root Cause Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <span>Root Cause Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700">Primary Causes</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium">Customer Availability Issues</p>
                              <p className="text-xs text-gray-600">40% of deviations</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium">Traffic & Route Planning</p>
                              <p className="text-xs text-gray-600">30% of deviations</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium">MR Time Management</p>
                              <p className="text-xs text-gray-600">20% of deviations</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium">External Factors</p>
                              <p className="text-xs text-gray-600">10% of deviations</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700">Impact Assessment</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Revenue Impact</span>
                            <span className="font-semibold text-red-600">-₹78K</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Time Efficiency Loss</span>
                            <span className="font-semibold text-yellow-600">-12%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Customer Satisfaction</span>
                            <span className="font-semibold text-blue-600">-0.2 points</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Territory Coverage</span>
                            <span className="font-semibold text-orange-600">-5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="adjustments" className="space-y-6">
                {/* Proposed Adjustments */}
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-800">
                      <RefreshCw className="h-5 w-5" />
                      <span>AI-Recommended Adjustments</span>
                      <Badge className="bg-green-100 text-green-800">7 suggestions</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border border-green-200 rounded-lg bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-green-800">Reschedule Missed Tier-A Visits</h4>
                            <p className="text-sm text-green-600 mt-1">
                              Priority rescheduling for the 3 missed high-value customers
                            </p>
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>Metro Hospital - Dr. Kumar</span>
                                <Badge variant="outline" className="bg-green-50">
                                  Mon 9:00 AM
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span>ABC Pharmaceuticals - Dr. Sharma</span>
                                <Badge variant="outline" className="bg-green-50">
                                  Tue 10:30 AM
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span>Prime Healthcare - Dr. Patel</span>
                                <Badge variant="outline" className="bg-green-50">
                                  Wed 2:00 PM
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Badge className="bg-green-100 text-green-800">High Impact</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-800">Optimize Route Planning</h4>
                            <p className="text-sm text-blue-600 mt-1">
                              Implement AI-optimized routing to reduce travel time by 20%
                            </p>
                            <div className="mt-3 text-xs text-blue-700">
                              <p>• Cluster nearby customers for same-day visits</p>
                              <p>• Use real-time traffic data for route optimization</p>
                              <p>• Schedule buffer time between distant locations</p>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Badge className="bg-blue-100 text-blue-800">Medium Impact</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-purple-800">Increase New Customer Focus</h4>
                            <p className="text-sm text-purple-600 mt-1">
                              Allocate additional time slots for prospect meetings
                            </p>
                            <div className="mt-3 text-xs text-purple-700">
                              <p>• Schedule 2 prospect meetings per week minimum</p>
                              <p>• Follow up on cancelled meetings within 24 hours</p>
                              <p>• Prepare backup prospect list for quick scheduling</p>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Badge className="bg-purple-100 text-purple-800">Medium Impact</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Week 3 Revised Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span>Week 3 Revised Plan (Jan 15-21)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700">Adjusted Targets</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Total Visits</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500 line-through">112</span>
                              <span className="font-semibold text-green-600">115</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Revenue Target</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500 line-through">₹890K</span>
                              <span className="font-semibold text-green-600">₹920K</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">New Customers</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500 line-through">4</span>
                              <span className="font-semibold text-green-600">5</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Quality Score Target</span>
                            <span className="font-semibold text-blue-600">8.6</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-700">Key Changes</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">3 makeup visits scheduled</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Route optimization implemented</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Additional prospect meetings added</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Buffer time increased by 15 minutes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approval" className="space-y-6">
                {/* Approval Summary */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-blue-800">
                      <FileText className="h-5 w-5" />
                      <span>Revision Summary for Approval</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">7</div>
                        <div className="text-sm text-green-700">Adjustments Proposed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">₹156K</div>
                        <div className="text-sm text-blue-700">Potential Revenue Recovery</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">18%</div>
                        <div className="text-sm text-purple-700">Efficiency Improvement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Immediate Actions Required</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Contact missed Tier-A customers</p>
                            <p className="text-xs text-gray-600">Reschedule within 48 hours</p>
                          </div>
                          <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Update route optimization settings</p>
                            <p className="text-xs text-gray-600">Apply AI recommendations</p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">High</Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Schedule additional prospect meetings</p>
                            <p className="text-xs text-gray-600">Target 2 new prospects for Week 3</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">Medium</Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Checkbox className="rounded" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Provide MR training on time management</p>
                            <p className="text-xs text-gray-600">Schedule for next week</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Low</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span>Timeline & Responsibilities</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="text-sm font-medium">Today (Jan 15)</p>
                          <p className="text-xs text-gray-600">Territory Manager: Approve revisions</p>
                          <p className="text-xs text-gray-600">MR: Contact missed customers</p>
                        </div>
                        <div className="border-l-4 border-yellow-500 pl-4">
                          <p className="text-sm font-medium">Tomorrow (Jan 16)</p>
                          <p className="text-xs text-gray-600">IT Team: Update route optimization</p>
                          <p className="text-xs text-gray-600">MR: Confirm rescheduled appointments</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-4">
                          <p className="text-sm font-medium">This Week</p>
                          <p className="text-xs text-gray-600">HR: Schedule training session</p>
                          <p className="text-xs text-gray-600">MR: Execute revised Week 3 plan</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <p className="text-sm font-medium">Next Week</p>
                          <p className="text-xs text-gray-600">All: Review Week 3 performance</p>
                          <p className="text-xs text-gray-600">Plan Week 4 adjustments</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Final Approval */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Final Approval</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-700 mb-2">Approval Checklist</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Performance analysis completed</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Root cause analysis documented</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Adjustments reviewed and validated</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Action items assigned with timelines</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Reviewed by: Territory Manager</p>
                          <p className="text-xs text-gray-500">Date: January 15, 2025</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline">Request Changes</Button>
                          <Button className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve All Revisions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
