import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Activity,
} from "lucide-react"
import { MRFilterHeader } from "@/components/mr-filter-header"

export function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      <MRFilterHeader />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monthly Tour Planning & Weekly Revision System</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Week 3 Active
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            December 2024
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plan Adherence</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">87%</div>
            <Progress value={87} className="mt-2" />
            <p className="text-xs text-gray-600 mt-2">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Achievement</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹2.4M</div>
            <Progress value={78} className="mt-2" />
            <p className="text-xs text-gray-600 mt-2">78% of monthly target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Coverage</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">342</div>
            <Progress value={92} className="mt-2" />
            <p className="text-xs text-gray-600 mt-2">92% of planned visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8.4</div>
            <Progress value={84} className="mt-2" />
            <p className="text-xs text-gray-600 mt-2">Average visit quality</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Week Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Week 3 Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Monday</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Completed
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tuesday</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Completed
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Wednesday</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                In Progress
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Thursday</span>
              <Badge variant="outline">Planned</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Friday</span>
              <Badge variant="outline">Planned</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <span>Action Items</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">High Priority Customer</p>
                <p className="text-xs text-gray-600">ABC Corp - Missed last 2 visits</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Route Optimization</p>
                <p className="text-xs text-gray-600">Thursday route needs adjustment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Weekly Review</p>
                <p className="text-xs text-gray-600">Due Sunday for Week 4 planning</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Monthly Progress Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Week 1 - Completed</span>
                  <span className="text-sm text-gray-600">95% Achievement</span>
                </div>
                <Progress value={95} className="mt-1" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Week 2 - Completed</span>
                  <span className="text-sm text-gray-600">88% Achievement</span>
                </div>
                <Progress value={88} className="mt-1" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Week 3 - In Progress</span>
                  <span className="text-sm text-gray-600">60% Complete</span>
                </div>
                <Progress value={60} className="mt-1" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                <Calendar className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Week 4 - Planned</span>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <Progress value={0} className="mt-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
