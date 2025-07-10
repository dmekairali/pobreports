import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export function Reports() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive reporting and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <span>Monthly Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-1">Dec 2024</div>
            <p className="text-xs text-gray-600">Complete performance overview</p>
            <Button size="sm" className="w-full mt-3">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Users className="h-4 w-4 text-green-600" />
              <span>Customer Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-1">234</div>
            <p className="text-xs text-gray-600">Customer insights & metrics</p>
            <Button size="sm" className="w-full mt-3">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <Target className="h-4 w-4 text-purple-600" />
              <span>Territory Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-1">4 Zones</div>
            <p className="text-xs text-gray-600">Coverage & efficiency analysis</p>
            <Button size="sm" className="w-full mt-3">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center space-x-2 text-sm">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <span>Performance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1">6 Months</div>
            <p className="text-xs text-gray-600">Historical trend analysis</p>
            <Button size="sm" className="w-full mt-3">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Recent Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">December Monthly Report</p>
                    <p className="text-xs text-gray-600">Generated 2 hours ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Week 3 Revision Analysis</p>
                    <p className="text-xs text-gray-600">Generated yesterday</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="font-medium text-sm">Customer Tier Analysis</p>
                    <p className="text-xs text-gray-600">In progress...</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" disabled>
                  <Clock className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span>Scheduled Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-blue-800">Weekly Performance</p>
                  <p className="text-xs text-blue-600">Every Sunday at 9:00 AM</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-green-800">Monthly Summary</p>
                  <p className="text-xs text-green-600">1st of every month</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm text-purple-800">Quarterly Review</p>
                  <p className="text-xs text-purple-600">Every 3 months</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-600" />
            <span>Report Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-sm">Performance Dashboard</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Comprehensive performance metrics and KPIs</p>
              <Button size="sm" className="w-full">
                Generate Report
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold text-sm">Customer Insights</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Customer behavior and engagement analysis</p>
              <Button size="sm" className="w-full">
                Generate Report
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-purple-600" />
                <h4 className="font-semibold text-sm">Territory Analysis</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Territory coverage and optimization insights</p>
              <Button size="sm" className="w-full">
                Generate Report
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <h4 className="font-semibold text-sm">Revenue Analysis</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Revenue trends and forecasting</p>
              <Button size="sm" className="w-full">
                Generate Report
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-red-600" />
                <h4 className="font-semibold text-sm">Time Efficiency</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Time utilization and productivity metrics</p>
              <Button size="sm" className="w-full">
                Generate Report
              </Button>
            </div>

            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <h4 className="font-semibold text-sm">Plan vs Actual</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Detailed comparison of planned vs actual performance</p>
              <Button size="sm" className="w-full">
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
