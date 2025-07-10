"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  TrendingDown,
  Clock,
  MapPin,
  Phone,
  Mail,
  Users,
  Target,
  Zap,
  Shield,
  Activity,
  Calendar,
  CheckCircle,
} from "lucide-react"

export function EmergencyTerritoryManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emergency Territory Management</h1>
        <p className="text-gray-600">Critical performance monitoring and intervention</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Alerts</CardTitle>
          <CardDescription>Critical territory performance issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-800 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Critical Territories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">3</div>
                <p className="text-xs text-red-700 mt-1">Immediate intervention required</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-orange-800 flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Performance Drop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">-23%</div>
                <p className="text-xs text-orange-700 mt-1">Avg. decline this week</p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-yellow-800 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">2.3h</div>
                <p className="text-xs text-yellow-700 mt-1">Avg. intervention time</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-800 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Active Interventions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">7</div>
                <p className="text-xs text-blue-700 mt-1">Currently being addressed</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>

        {/* Emergency Tabs */}
        <Tabs defaultValue="critical" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="critical" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Critical Issues</span>
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Live Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="intervention" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Interventions</span>
            </TabsTrigger>
            <TabsTrigger value="recovery" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Recovery Plans</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="critical" className="space-y-6">
            {/* Critical Territory Alerts */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Critical Territory Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="destructive">CRITICAL</Badge>
                          <span className="font-semibold text-red-800">North Zone - Sector A</span>
                          <Badge variant="outline" className="text-red-600">
                            Rajesh Kumar
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Performance Drop</p>
                            <p className="font-semibold text-red-600">-35%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Revenue Loss</p>
                            <p className="font-semibold text-red-600">₹450K</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Missed Visits</p>
                            <p className="font-semibold text-red-600">23/45</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-semibold text-red-600">5 days</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            <MapPin className="h-3 w-3 mr-1" />
                            High-value customers affected
                          </Badge>
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Escalated 2h ago
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="destructive">
                          <Phone className="h-3 w-3 mr-1" />
                          Call MR
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-3 w-3 mr-1" />
                          Intervene
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-orange-100 text-orange-800">HIGH</Badge>
                            <span className="font-semibold text-orange-800">West Zone - Sector C</span>
                            <Badge variant="outline" className="text-orange-600">
                              Sneha Reddy
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Performance Drop</p>
                              <p className="font-semibold text-orange-600">-18%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Revenue Loss</p>
                              <p className="font-semibold text-orange-600">₹180K</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Quality Score</p>
                              <p className="font-semibold text-orange-600">6.2/10</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Duration</p>
                              <p className="font-semibold text-orange-600">3 days</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              <Users className="h-3 w-3 mr-1" />
                              Customer complaints
                            </Badge>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Declining trend
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                            <Mail className="h-3 w-3 mr-1" />
                            Send Alert
                          </Button>
                          <Button size="sm" variant="outline">
                            <Target className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-yellow-100 text-yellow-800">MEDIUM</Badge>
                            <span className="font-semibold text-yellow-800">East Zone - Sector B</span>
                            <Badge variant="outline" className="text-yellow-600">
                              Amit Patel
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Visit Efficiency</p>
                              <p className="font-semibold text-yellow-600">62%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Route Deviation</p>
                              <p className="font-semibold text-yellow-600">+45%</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Time Variance</p>
                              <p className="font-semibold text-yellow-600">+2.5h</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Duration</p>
                              <p className="font-semibold text-yellow-600">2 days</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              <MapPin className="h-3 w-3 mr-1" />
                              Route optimization needed
                            </Badge>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Time management issue
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                            <Zap className="h-3 w-3 mr-1" />
                            Optimize
                          </Button>
                          <Button size="sm" variant="outline">
                            <Activity className="h-3 w-3 mr-1" />
                            Monitor
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            {/* Real-time Territory Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span>Live Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">North Zone</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <Progress value={65} className="w-20" />
                        <span className="text-sm font-semibold text-red-600">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">South Zone</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <Progress value={92} className="w-20" />
                        <span className="text-sm font-semibold text-green-600">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">East Zone</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <Progress value={78} className="w-20" />
                        <span className="text-sm font-semibold text-yellow-600">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">West Zone</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <Progress value={82} className="w-20" />
                        <span className="text-sm font-semibold text-orange-600">82%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Response Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm font-medium">Critical Alert Response</span>
                      <Badge variant="destructive">Less than 1 hour</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <span className="text-sm font-medium">High Priority Response</span>
                      <Badge className="bg-orange-100 text-orange-800">Less than 4 hours</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm font-medium">Medium Priority Response</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Less than 24 hours</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm font-medium">Routine Monitoring</span>
                      <Badge className="bg-blue-100 text-blue-800">Daily</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="intervention" className="space-y-6">
            {/* Active Interventions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>Active Interventions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">IN PROGRESS</Badge>
                        <span className="font-semibold">Emergency Route Optimization</span>
                      </div>
                      <span className="text-sm text-gray-600">Started 2h ago</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Territory</p>
                        <p className="font-semibold">North Zone - Sector A</p>
                      </div>
                      <div>
                        <p className="text-gray-600">MR Assigned</p>
                        <p className="font-semibold">Rajesh Kumar + Support</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expected Completion</p>
                        <p className="font-semibold">Today 6:00 PM</p>
                      </div>
                    </div>
                    <Progress value={65} className="mt-3" />
                    <p className="text-xs text-gray-600 mt-1">65% Complete - On track</p>
                  </div>

                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">COMPLETED</Badge>
                        <span className="font-semibold">Customer Recovery Program</span>
                      </div>
                      <span className="text-sm text-gray-600">Completed 1h ago</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Territory</p>
                        <p className="font-semibold">West Zone - Sector C</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Recovery Rate</p>
                        <p className="font-semibold text-green-600">87%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue Recovered</p>
                        <p className="font-semibold text-green-600">₹125K</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">Successfully resolved customer complaints</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recovery" className="space-y-6">
            {/* Recovery Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span>Recovery Strategies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-green-500 bg-green-50">
                      <h4 className="font-semibold text-green-800">Immediate Actions</h4>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>Emergency MR deployment</li>
                        <li>High-priority customer outreach</li>
                        <li>Route optimization</li>
                        <li>Quality assurance checks</li>
                      </ul>
                    </div>
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                      <h4 className="font-semibold text-blue-800">Short-term Recovery</h4>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>Performance coaching</li>
                        <li>Territory restructuring</li>
                        <li>Customer relationship repair</li>
                        <li>Process improvements</li>
                      </ul>
                    </div>
                    <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                      <h4 className="font-semibold text-purple-800">Long-term Prevention</h4>
                      <ul className="text-sm text-purple-700 mt-2 space-y-1">
                        <li>Enhanced monitoring systems</li>
                        <li>Predictive analytics</li>
                        <li>Training programs</li>
                        <li>Performance incentives</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span>Recovery Timeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                        <span className="text-xs font-bold text-red-600">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Emergency Response</span>
                          <Badge variant="destructive">0-4 hours</Badge>
                        </div>
                        <Progress value={100} className="mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                        <span className="text-xs font-bold text-orange-600">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Stabilization</span>
                          <Badge className="bg-orange-100 text-orange-800">1-3 days</Badge>
                        </div>
                        <Progress value={75} className="mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <span className="text-xs font-bold text-blue-600">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Recovery</span>
                          <Badge className="bg-blue-100 text-blue-800">1-2 weeks</Badge>
                        </div>
                        <Progress value={45} className="mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <span className="text-xs font-bold text-green-600">4</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Optimization</span>
                          <Badge className="bg-green-100 text-green-800">2-4 weeks</Badge>
                        </div>
                        <Progress value={20} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
