"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Star,
  DollarSign,
  Users,
  FileText,
  Route,
  AlertTriangle,
  CheckCircle,
  Eye,
} from "lucide-react"

export function DailyScheduleDetail() {
  return (
    <div className="space-y-6">
      {/* Day Header */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-900">Monday, January 6, 2025</h2>
              <p className="text-blue-700 mt-1">Rajesh Kumar - North Zone Schedule</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">8 visits planned</Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                <Route className="h-3 w-3 mr-1" />
                32.5 km total
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">8:30 AM</div>
              <div className="text-sm text-blue-700">Start Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">6:15 PM</div>
              <div className="text-sm text-green-700">End Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">₹85K</div>
              <div className="text-sm text-purple-700">Revenue Target</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">9h 45m</div>
              <div className="text-sm text-orange-700">Total Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="h-5 w-5 text-green-600" />
            <span>Optimized Route Map</span>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              15% more efficient
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Interactive Route Map</p>
              <p className="text-sm text-gray-500">8 stops • 32.5 km • 2h 15m travel time</p>
              <Button className="mt-3" size="sm">
                <Navigation className="h-3 w-3 mr-1" />
                Open in Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Visit Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Detailed Visit Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {/* Visit 1 */}
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-green-100 text-green-800">9:00 - 9:45 AM</Badge>
                    <Badge variant="destructive">Tier A</Badge>
                    <Badge variant="outline">High Priority</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">ABC Pharmaceuticals</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Contact Person</p>
                      <p className="font-semibold">Dr. Rajesh Sharma</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold">45 minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue Target</p>
                      <p className="font-semibold text-green-600">₹15K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Visit</p>
                      <p className="font-semibold">Dec 15, 2024</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Star className="h-3 w-3 mr-1" />
                      VIP Customer
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <FileText className="h-3 w-3 mr-1" />
                      Product Demo
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Contract Renewal
                    </Badge>
                  </div>
                  <div className="mt-3 p-2 bg-white rounded border">
                    <p className="text-sm font-medium text-gray-700">Visit Objectives:</p>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Present new product line Q1 2025</li>
                      <li>• Discuss annual contract renewal</li>
                      <li>• Address inventory management concerns</li>
                      <li>• Collect feedback on current products</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    Navigate
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-3 w-3 mr-1" />
                    Notes
                  </Button>
                </div>
              </div>
            </div>

            {/* Visit 2 */}
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-800">10:15 - 10:45 AM</Badge>
                    <Badge className="bg-blue-100 text-blue-800">Tier B</Badge>
                    <Badge variant="outline">Regular</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">City Medical Store</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Contact Person</p>
                      <p className="font-semibold">Mr. Suresh Patel</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold">30 minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue Target</p>
                      <p className="font-semibold text-blue-600">₹8K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Distance</p>
                      <p className="font-semibold">1.8 km (5 min)</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Users className="h-3 w-3 mr-1" />
                      Retail Chain
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Stock Review
                    </Badge>
                  </div>
                  <div className="mt-3 p-2 bg-white rounded border">
                    <p className="text-sm font-medium text-gray-700">Visit Objectives:</p>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Monthly stock review and replenishment</li>
                      <li>• Introduce seasonal products</li>
                      <li>• Collect payment for previous orders</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <MapPin className="h-3 w-3 mr-1" />
                    Navigate
                  </Button>
                </div>
              </div>
            </div>

            {/* Visit 3 */}
            <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-orange-100 text-orange-800">11:30 AM - 12:30 PM</Badge>
                    <Badge variant="destructive">Tier A</Badge>
                    <Badge className="bg-red-100 text-red-800">Critical</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">Metro Hospital</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Contact Person</p>
                      <p className="font-semibold">Dr. Amit Kumar</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold">60 minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Revenue Target</p>
                      <p className="font-semibold text-orange-600">₹25K</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Distance</p>
                      <p className="font-semibold">3.2 km (8 min)</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Complaint Resolution
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      <Star className="h-3 w-3 mr-1" />
                      Key Account
                    </Badge>
                  </div>
                  <div className="mt-3 p-2 bg-white rounded border border-red-200">
                    <p className="text-sm font-medium text-red-700">⚠️ Critical Visit Objectives:</p>
                    <ul className="text-sm text-red-600 mt-1 space-y-1">
                      <li>• Address quality complaint from Dec 20</li>
                      <li>• Present corrective action plan</li>
                      <li>• Negotiate compensation terms</li>
                      <li>• Restore relationship and trust</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" variant="destructive">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Priority
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-3 w-3 mr-1" />
                    Complaint
                  </Button>
                </div>
              </div>
            </div>

            {/* Lunch Break */}
            <div className="p-3 bg-gray-100 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-700">Lunch Break</span>
                <Badge variant="outline" className="bg-gray-50">
                  12:30 - 1:30 PM
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">Recommended: Cafe Central (Near Metro Hospital)</p>
            </div>

            {/* Remaining visits summary */}
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <div className="text-center">
                <h4 className="font-semibold text-gray-700 mb-2">Afternoon Schedule</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="p-2 bg-white rounded">
                    <p className="font-medium">2:00 PM</p>
                    <p className="text-gray-600">Health Plus Clinic</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-medium">3:15 PM</p>
                    <p className="text-gray-600">Wellness Pharmacy</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-medium">4:30 PM</p>
                    <p className="text-gray-600">Care Medical</p>
                  </div>
                  <div className="p-2 bg-white rounded">
                    <p className="font-medium">5:45 PM</p>
                    <p className="text-gray-600">Prime Healthcare</p>
                  </div>
                </div>
                <Button className="mt-3 bg-transparent" size="sm" variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  View All Visits
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Day Summary & Preparation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Required Materials</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm">Product Samples (New Line)</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="text-sm">Contract Documents</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <span className="text-sm">Complaint Resolution Report</span>
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="text-sm">Promotional Materials</span>
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Success Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Revenue Target</span>
                  <span className="font-semibold">₹85,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Visit Completion</span>
                  <span className="font-semibold">8/8 visits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quality Score Target</span>
                  <span className="font-semibold">8.5+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Customer Satisfaction</span>
                  <span className="font-semibold">4.5+ rating</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
