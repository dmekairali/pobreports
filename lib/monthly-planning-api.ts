// lib/monthly-planning-api.ts

// Type definitions (based on usage in hooks and components)
export interface TerritoryContext {
  customers: any[]; // Define more specifically if possible
  previous_performance?: {
    total_visits: number;
    total_revenue: number;
  };
}

export interface BaseRequest {
  action: "generate" | "revise_weekly" | "update_daily" | "monthly_review";
  threadId?: string | null;
}

export interface MonthlyPlanRequest extends BaseRequest {
  mrName?: string;
  month?: number;
  year?: number;
  territoryContext?: TerritoryContext;
  weekNumber?: number;
  actualPerformance?: any;
  revisionReason?: string;
  monthlyPerformance?: any;
}

// This is a guess for the plan structure based on ai-monthly-planner.tsx
export interface MonthlyPlan {
  mo: { // Monthly Overview
    mr: string;
    m: number; // month
    y: number; // year
    wd: number; // working_days
    tv: number; // total_visits
    tr: number; // target_revenue
    nt: number; // nbd_visits_target
    td: number[]; // tier_distribution [tier2, tier3, tier4]
  };
  wp: Array<{ // Weekly Plans
    w: number; // week number
    sd: number; // start_date_of_week
    ed: number; // end_date_of_week
    tv: number; // weekly_visits
    tr: number; // weekly_revenue
    fa: string[]; // focus_areas
    pc: string[]; // priority_customer_types
    strategy: string;
  }>;
  acs: Record<string, { // Area Coverage Strategy
    tc: number; // total_customers
    pv: number; // planned_visits
    fw: number[]; // focus_weeks
    er: string; // efficiency_rating
    strategy: string;
  }>;
  cvs: Record<string, string[]>; // Customer Visit Schedule
  avs: Record<string, string[]>; // Area Visit Schedule
  summary: {
    total_customers_scheduled: number;
    total_visit_days: number;
    total_visits_planned: number;
    visits_per_day_avg: number;
    tier_distribution_actual: Record<string, number>;
    efficiency_metrics: {
      customer_coverage: string;
      area_clustering: string;
      visit_distribution: string;
    };
  };
  metadata: {
    generated_at: string;
    plan_version: string;
    generation_method: string;
    thread_id: string;
    customer_count: number;
    tokens_used: number;
  };
}


export interface MonthlyPlanResponse {
  success: boolean;
  plan?: MonthlyPlan | null;
  thread_id?: string | null;
  error?: string;
  // Other fields from the API response if any
  action?: string;
  timestamp?: string;
  tokens_used?: number;
  generation_method?: string;
  customers_processed?: number;
}

// Client-side API interaction class
export class MonthlyPlanningAPI {
  private async fetchAPI(
    body: MonthlyPlanRequest,
  ): Promise<MonthlyPlanResponse> {
    const endpoint = "monthly-plan-persistentV2"; // Matching the actual API route
    console.log(`API Call to /api/openai/${endpoint}`, body);
    try {
      const response = await fetch(`/api/openai/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Network response was not ok and failed to parse error JSON" }));
        throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      const errorMessage = error instanceof Error ? error.message : "Unknown API error";
      return { success: false, error: errorMessage, plan: null };
    }
  }

  async generateMonthlyPlan(request: MonthlyPlanRequest): Promise<MonthlyPlanResponse> {
    return this.fetchAPI({ ...request, action: "generate" });
  }

  async reviseWeeklyPlan(
    threadId: string,
    weekNumber: number,
    actualPerformance: any,
    reason: string,
  ): Promise<MonthlyPlanResponse> {
    return this.fetchAPI({
      action: "revise_weekly",
      threadId,
      weekNumber,
      actualPerformance,
      revisionReason: reason,
    });
  }

  async updateDailyPlan(threadId: string, actualPerformance: any): Promise<MonthlyPlanResponse> {
    return this.fetchAPI({
      action: "update_daily",
      threadId,
      actualPerformance,
    });
  }

  async monthlyReview(threadId: string, monthlyPerformance: any): Promise<MonthlyPlanResponse> {
    return this.fetchAPI({
      action: "monthly_review",
      threadId,
      monthlyPerformance,
    });
  }
}

// Placeholder/Sample utility functions
export function generateSampleCustomers(count: number = 50): any[] {
  const customers = [];
  const tiers = ["TIER_2_PERFORMER", "TIER_3_DEVELOPER", "TIER_4_PROSPECT"];
  const areas = ["North", "South", "East", "West", "Central"];
  for (let i = 0; i < count; i++) {
    customers.push({
      customer_code: `CUST${1000 + i}`,
      tier_level: tiers[i % tiers.length],
      area_name: areas[i % areas.length],
      tier_score: Math.random() * 100,
      recommended_frequency: (i % 3) + 1,
      total_sales_90d: Math.random() * 50000,
      days_since_last_visit: Math.floor(Math.random() * 60),
      customer_type: "Retailer",
      total_orders_90d: Math.floor(Math.random() * 20),
      conversion_rate_90d: Math.random(),
    });
  }
  return customers;
}

export const PlanUtils = {
  calculateWeekDates: (week: { sd: number, ed: number }, month: number, year: number) => {
    // Simple date formatting, not actual date calculation
    const formatDate = (day: number) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return {
      start: formatDate(week.sd),
      end: formatDate(week.ed),
    };
  },
  getWorkingDaysInWeek: (week: { sd: number, ed: number }, month: number, year: number) => {
    // Placeholder: assumes 5 working days in a full week.
    // A real implementation would need to check day of week for start/end.
    let count = 0;
    const startDate = new Date(year, month - 1, week.sd);
    const endDate = new Date(year, month -1, week.ed);
    let current = new Date(startDate);

    while(current <= endDate) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !==0 && dayOfWeek !==6) { // Exclude Sunday (0) and Saturday (6)
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count > 0 ? count : 5; // return calculated or default 5
  },
  formatDate: (dateCode: string, month: number, year: number) => {
    // dateCode is DDMM
    if (dateCode && dateCode.length === 4) {
      const day = dateCode.substring(0, 2);
      // const m = dateCode.substring(2, 4); // Using passed month for now
      return `${day}/${String(month).padStart(2, '0')}/${year}`;
    }
    return "Invalid Date";
  },
};
