// Monthly Planning API Integration
export interface MonthlyPlanRequest {
  mrName: string
  month: number
  year: number
  territoryContext: {
    customers: Customer[]
    previous_performance?: {
      total_visits: number
      total_revenue: number
    }
  }
  action?: "generate" | "revise_weekly" | "update_daily" | "monthly_review"
  threadId?: string
  weekNumber?: number
  actualPerformance?: any
  revisionReason?: string
}

export interface Customer {
  customer_code: string
  tier_level: "TIER_2_PERFORMER" | "TIER_3_DEVELOPER" | "TIER_4_PROSPECT"
  area_name: string
  tier_score: number
  recommended_frequency: number
  total_sales_90d: number
  days_since_last_visit: number
  customer_type: string
  total_orders_90d: number
  conversion_rate_90d: number
}

export interface MonthlyPlanResponse {
  success: boolean
  plan?: {
    mo: {
      mr: string
      m: number
      y: number
      wd: number
      tv: number
      tr: number
      nt: number
      td: number[]
    }
    wp: Array<{
      w: number
      sd: number
      ed: number
      tv: number
      tr: number
      fa: string[]
      pc: string[]
      strategy: string
    }>
    acs: Record<
      string,
      {
        tc: number
        pv: number
        fw: number[]
        er: string
        strategy: string
      }
    >
    rc: Array<[number, number, string, string[]]>
    cvs: Record<string, string[]>
    avs: Record<string, string[]>
    summary: {
      total_customers_scheduled: number
      total_visit_days: number
      total_visits_planned: number
      visits_per_day_avg: number
      tier_distribution_actual: Record<string, number>
      efficiency_metrics: {
        customer_coverage: string
        area_clustering: string
        visit_distribution: string
      }
    }
    metadata: {
      generated_at: string
      plan_version: string
      generation_method: string
      thread_id: string
      customer_count: number
      tokens_used: number
    }
  }
  thread_id?: string
  tokens_used?: number
  generation_method?: string
  customers_processed?: number
  error?: string
  action?: string
  timestamp?: string
}

export class MonthlyPlanningAPI {
  private baseUrl: string

  constructor(baseUrl = "/api/openai") {
    this.baseUrl = baseUrl
  }

  async generateMonthlyPlan(request: MonthlyPlanRequest): Promise<MonthlyPlanResponse> {
    try {
      console.log("🚀 Generating monthly plan for:", request.mrName)

      const response = await fetch(`${this.baseUrl}/monthly-plan-persistentV2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to generate monthly plan")
      }

      console.log("✅ Monthly plan generated successfully")
      return result
    } catch (error) {
      console.error("❌ Monthly planning API error:", error)
      throw error
    }
  }

  async reviseWeeklyPlan(
    threadId: string,
    weekNumber: number,
    actualPerformance: any,
    revisionReason: string,
  ): Promise<MonthlyPlanResponse> {
    const request: MonthlyPlanRequest = {
      mrName: "",
      month: 0,
      year: 0,
      territoryContext: { customers: [] },
      action: "revise_weekly",
      threadId,
      weekNumber,
      actualPerformance,
      revisionReason,
    }

    return this.generateMonthlyPlan(request)
  }

  async updateDailyPlan(threadId: string, actualPerformance: any): Promise<MonthlyPlanResponse> {
    const request: MonthlyPlanRequest = {
      mrName: "",
      month: 0,
      year: 0,
      territoryContext: { customers: [] },
      action: "update_daily",
      threadId,
      actualPerformance,
    }

    return this.generateMonthlyPlan(request)
  }

  async monthlyReview(threadId: string, monthlyPerformance: any): Promise<MonthlyPlanResponse> {
    const request: MonthlyPlanRequest = {
      mrName: "",
      month: 0,
      year: 0,
      territoryContext: { customers: [] },
      action: "monthly_review",
      threadId,
      actualPerformance: monthlyPerformance,
    }

    return this.generateMonthlyPlan(request)
  }
}

// Utility functions for plan data processing
export const PlanUtils = {
  formatDate: (dateStr: string, month: number, year: number): string => {
    const day = Number.parseInt(dateStr.substring(0, 2))
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${day} ${monthNames[month - 1]}`
  },

  getTierName: (tierCode: number): string => {
    const tierMap = {
      1: "TIER_2_PERFORMER",
      2: "TIER_3_DEVELOPER",
      3: "TIER_4_PROSPECT",
    }
    return tierMap[tierCode as keyof typeof tierMap] || "Unknown"
  },

  getTierColor: (tierLevel: string): string => {
    switch (tierLevel) {
      case "TIER_2_PERFORMER":
        return "bg-green-100 text-green-800"
      case "TIER_3_DEVELOPER":
        return "bg-blue-100 text-blue-800"
      case "TIER_4_PROSPECT":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  },

  calculateWeekDates: (weekPlan: any, month: number, year: number) => {
    const startDate = new Date(year, month - 1, weekPlan.sd)
    const endDate = new Date(year, month - 1, weekPlan.ed)
    return {
      start: startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      end: endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }
  },

  getWorkingDaysInWeek: (weekPlan: any, month: number, year: number): number => {
    let workingDays = 0
    for (let day = weekPlan.sd; day <= weekPlan.ed; day++) {
      const date = new Date(year, month - 1, day)
      if (date.getDay() !== 0) {
        // Skip Sundays
        workingDays++
      }
    }
    return workingDays
  },
}

// Sample data generator for testing
export const generateSampleCustomers = (): Customer[] => {
  return [
    {
      customer_code: "CUST001",
      tier_level: "TIER_2_PERFORMER",
      area_name: "Central Business District",
      tier_score: 85,
      recommended_frequency: 3,
      total_sales_90d: 125000,
      days_since_last_visit: 5,
      customer_type: "Hospital",
      total_orders_90d: 12,
      conversion_rate_90d: 78,
    },
    {
      customer_code: "CUST002",
      tier_level: "TIER_3_DEVELOPER",
      area_name: "North Zone",
      tier_score: 65,
      recommended_frequency: 2,
      total_sales_90d: 85000,
      days_since_last_visit: 12,
      customer_type: "Clinic",
      total_orders_90d: 8,
      conversion_rate_90d: 65,
    },
    {
      customer_code: "CUST003",
      tier_level: "TIER_4_PROSPECT",
      area_name: "South Zone",
      tier_score: 45,
      recommended_frequency: 1,
      total_sales_90d: 35000,
      days_since_last_visit: 25,
      customer_type: "Pharmacy",
      total_orders_90d: 4,
      conversion_rate_90d: 42,
    },
  ]
}
