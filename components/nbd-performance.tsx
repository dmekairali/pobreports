"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MRFilterHeader } from "@/components/mr-filter-header"
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Calendar,
  Clock,
  Star,
  Award,
  Zap,
  BarChart3,
  MapPin,
  Phone,
  Mail,
  Plus,
} from "lucide-react"

export function NBDPerformance() {
  return (
    <div className="p-6 space-y-6">
      <MRFilterHeader />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NBD Performance Dashboard</h1>
          <p className="text-gray-600 mt-1">New Business Development tracking and performance analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <TrendingUp className="h-3 w-3 mr-1" />
            +15% This Month
          </Badge>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Prospect
          </Button>
        </div>
      </div>

      {/* NBD Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+3</span>
              </div>
            </div>
            <Progress value={80} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Target: 15 this month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-600">₹1.8M</div>
              <div className="flex items-center text-blue-600">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm">+22%</span>
              </div>
            </div>
            <Progress value={72} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Target: ₹2.5M</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-purple-600">24%</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+4%</span>
              </div>
            </div>
            <Progress value={24} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Industry avg: 18%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-orange-600">₹150K</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8%</span>
              </div>
            </div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Target: ₹200K</p>
          </CardContent>
        </Card>
      </div>

      {/* NBD Performance Tabs */}
      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pipeline" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Pipeline</span>
          </TabsTrigger>
          <TabsTrigger value="prospects" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Prospects</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Activities</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Sales Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Sales Pipeline Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">45</div>
                  <div className="text-sm text-blue-700">Prospects</div>
                  <div className="text-xs text-gray-600 mt-1">₹6.8M value</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">23</div>
                  <div className="text-sm text-green-700">Qualified</div>
                  <div className="text-xs text-gray-600 mt-1">₹3.5M value</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">15</div>
                  <div className="text-sm text-orange-700">Proposal</div>
                  <div className="text-xs text-gray-600 mt-1">₹2.3M value</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-purple-700">Negotiation</div>
                  <div className="text-xs text-gray-600 mt-1">₹1.2M value</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <div className="text-sm text-yellow-700">Closed Won</div>
                  <div className="text-xs text-gray-600 mt-1">₹1.8M value</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Deals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-green-600" />
                <span>High Priority Deals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-green-100 text-green-800">HOT</Badge>
                        <span className="font-semibold text-green-800">Metro Healthcare Chain</span>
                        <Badge variant="outline" className="text-green-600">
                          Rajesh Kumar
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Deal Value</p>
                          <p className="font-semibold text-green-600">₹450K</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Stage</p>
                          <p className="font-semibold">Negotiation</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Probability</p>
                          <p className="font-semibold text-green-600">85%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Close Date</p>
                          <p className="font-semibold">Dec 28, 2024</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Star className="h-3 w-3 mr-1" />
                          High Value
                        </Badge>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Closing Soon
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Phone className="h-3 w-3 mr-1" />
                        Follow Up
                      </Button>
                      <Button size="sm" variant="outline">
                        <Target className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-800">WARM</Badge>
                        <span className="font-semibold text-blue-800">City Medical Center</span>
                        <Badge variant="outline" className="text-blue-600">
                          Priya Sharma
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Deal Value</p>
                          <p className="font-semibold text-blue-600">₹320K</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Stage</p>
                          <p className="font-semibold">Proposal</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Probability</p>
                          <p className="font-semibold text-blue-600">65%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Close Date</p>
                          <p className="font-semibold">Jan 15, 2025</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          <Users className="h-3 w-3 mr-1" />
                          Multiple Stakeholders
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          <Calendar className="h-3 w-3 mr-1" />
                          Presentation Scheduled
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Mail className="h-3 w-3 mr-1" />
                        Send Proposal
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-6">
          {/* Prospect Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>New Prospects This Month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Apollo Diagnostics</p>
                      <p className="text-sm text-gray-600">Healthcare • North Zone</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">Qualified</Badge>
                      <p className="text-sm text-gray-600 mt-1">₹280K potential</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Wellness Pharmacy</p>
                      <p className="text-sm text-gray-600">Retail • South Zone</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-blue-100 text-blue-800">Contacted</Badge>
                      <p className="text-sm text-gray-600 mt-1">₹150K potential</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Care Hospital</p>
                      <p className="text-sm text-gray-600">Hospital • East Zone</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-orange-100 text-orange-800">Research</Badge>
                      <p className="text-sm text-gray-600 mt-1">₹400K potential</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <span>Territory Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">North Zone</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={35} className="w-20" />
                      <span className="text-sm font-semibold">16 prospects</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">South Zone</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={28} className="w-20" />
                      <span className="text-sm font-semibold">13 prospects</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">East Zone</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={22} className="w-20" />
                      <span className="text-sm font-semibold">10 prospects</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">West Zone</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={15} className="w-20" />
                      <span className="text-sm font-semibold">6 prospects</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* MR NBD Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-gold-600" />
                <span>MR NBD Performance Ranking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-800">Priya Sharma</p>
                      <p className="text-sm text-green-600">South Zone Champion</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">8</div>
                    <div className="text-sm text-green-700">New Customers</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">Rajesh Kumar</p>
                      <p className="text-sm text-blue-600">North Zone</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">6</div>
                    <div className="text-sm text-blue-700">New Customers</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-800">Sneha Reddy</p>
                      <p className="text-sm text-orange-600">West Zone</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">4</div>
                    <div className="text-sm text-orange-700">New Customers</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">4</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Amit Patel</p>
                      <p className="text-sm text-gray-600">East Zone</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-600">2</div>
                    <div className="text-sm text-gray-700">New Customers</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Monthly NBD Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">December 2024</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={80} className="w-20" />
                      <span className="text-sm font-semibold text-green-600">12 customers</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">November 2024</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={60} className="w-20" />
                      <span className="text-sm font-semibold">9 customers</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">October 2024</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={47} className="w-20" />
                      <span className="text-sm font-semibold">7 customers</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">September 2024</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={33} className="w-20" />
                      <span className="text-sm font-semibold">5 customers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span>NBD Targets vs Achievement</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly Target</span>
                    <span className="text-sm font-semibold">15 customers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Achievement</span>
                    <span className="text-sm font-semibold text-green-600">12 customers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Achievement Rate</span>
                    <span className="text-sm font-semibold text-blue-600">80%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Remaining Days</span>
                    <span className="text-sm font-semibold text-orange-600">3 days</span>
                  </div>
                  <Progress value={80} className="mt-3" />
                  <p className="text-xs text-gray-600 mt-1">3 more customers needed to reach target</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          {/* NBD Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Recent NBD Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">New customer onboarded</p>
                      <span className="text-sm text-gray-600">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Metro Healthcare Chain - ₹450K deal closed</p>
                    <Badge variant="outline" className="mt-1">
                      Rajesh Kumar
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Proposal sent</p>
                      <span className="text-sm text-gray-600">5 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600">City Medical Center - ₹320K proposal</p>
                    <Badge variant="outline" className="mt-1">
                      Priya Sharma
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Follow-up call scheduled</p>
                      <span className="text-sm text-gray-600">1 day ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Apollo Diagnostics - Initial discussion</p>
                    <Badge variant="outline" className="mt-1">
                      Sneha Reddy
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Prospect research completed</p>
                      <span className="text-sm text-gray-600">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Care Hospital - Market analysis done</p>
                    <Badge variant="outline" className="mt-1">
                      Amit Patel
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* NBD Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>Conversion Funnel</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Initial Contact</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={100} className="w-20" />
                      <span className="text-sm font-semibold">45 prospects</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Qualified Leads</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={51} className="w-20" />
                      <span className="text-sm font-semibold">23 prospects</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Proposal Stage</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={33} className="w-20" />
                      <span className="text-sm font-semibold">15 prospects</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Negotiation</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={18} className="w-20" />
                      <span className="text-sm font-semibold">8 prospects</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Closed Won</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={27} className="w-20" />
                      <span className="text-sm font-semibold text-green-600">12 customers</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Revenue Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">₹1.8M</div>
                  <div className="text-sm text-gray-600">Total NBD Revenue</div>
                  <div className="text-xs text-green-600 mt-1">+22% vs last month</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Avg. Deal Size</span>
                    <span className="font-semibold">₹150K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sales Cycle</span>
                    <span className="font-semibold">45 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Win Rate</span>
                    <span className="font-semibold text-green-600">24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pipeline Value</span>
                    <span className="font-semibold text-blue-600">₹3.2M</span>
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
