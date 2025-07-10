"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MRFilterHeader } from "@/components/mr-filter-header"
import { MRSelectionModal } from "@/components/mr-selection-modal"
import { User, Calendar, Target, TrendingUp, Clock, Activity, CheckCircle, AlertTriangle } from "lucide-react"

export function MRDashboard() {
  return (
    <div className="p-6 space-y-6">
      <MRFilterHeader />

      {/* MR Selection Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <span>Medical Representative Selection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MRSelectionModal />
        </CardContent>
      </Card>

      {/* Individual MR Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-600">87%</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+5%</span>
              </div>
            </div>
            <Progress value={87} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Target: 85%</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenue Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-green-600">₹2.4M</div>
              <div className="flex items-center text-red-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">78%</span>
              </div>
            </div>
            <Progress value={78} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Target: ₹3.1M</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Customer Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-purple-600">342</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12</span>
              </div>
            </div>
            <Progress value={92} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Planned: 372</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-orange-600">8.4</div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+0.3</span>
              </div>
            </div>
            <Progress value={84} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">Target: 8.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed MR Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Weekly Performance Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Week 1</span>
                <div className="flex items-center space-x-2">
                  <Progress value={95} className="w-20" />
                  <span className="text-sm font-semibold">95%</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Week 2</span>
                <div className="flex items-center space-x-2">
                  <Progress value={88} className="w-20" />
                  <span className="text-sm font-semibold">88%</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Week 3</span>
                <div className="flex items-center space-x-2">
                  <Progress value={86} className="w-20" />
                  <span className="text-sm font-semibold">86%</span>
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Week 4</span>
                <div className="flex items-center space-x-2">
                  <Progress value={0} className="w-20" />
                  <span className="text-sm font-semibold">Planned</span>
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Territory Coverage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">North-A</div>
                <div className="text-sm text-green-700">95% Coverage</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">North-B</div>
                <div className="text-sm text-blue-700">89% Coverage</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">North-C</div>
                <div className="text-sm text-orange-700">78% Coverage</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">North-D</div>
                <div className="text-sm text-purple-700">92% Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items for Selected MR */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Action Items for Rajesh Kumar</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-red-700">High Priority</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">ABC Corp - Missed Visit</p>
                    <p className="text-xs text-gray-600">High-value customer, reschedule immediately</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Revenue Gap</p>
                    <p className="text-xs text-gray-600">₹700K behind target, focus on Tier A</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-orange-700">Medium Priority</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Route Optimization</p>
                    <p className="text-xs text-gray-600">Thursday route needs adjustment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Customer Feedback</p>
                    <p className="text-xs text-gray-600">3 customers requested follow-up</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
