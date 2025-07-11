// lib/monthly-planning-api.ts

// Type definitions
export interface BaseRequest {
  action: "generate" | "revise_weekly" | "update_daily" | "monthly_review";
  threadId?: string | null;
}

export interface MonthlyPlanRequest extends BaseRequest {
  mrName?: string;
  month?: number;
  year?: number;
  // territoryContext is removed
  weekNumber?: number;
  actualPerformance?: any;
  revisionReason?: string;
  monthlyPerformance?: any;
}

// This is a guess for the plan structure based on ai-monthly-planner.tsx
// and what MonthlyPlanServiceV2 is expected to return.
export interface MonthlyPlan {
  mo: {
    mr: string;
    m: number;
    y: number;
    wd: number;
    tv: number;
    tr: number;
    nt: number;
    td: number[];
  };
  wp: Array<{
    w: number;
    sd: number;
    ed: number;
    tv: number;
    tr: number;
    fa: string[];
    pc: string[];
    strategy: string;
  }>;
  acs: Record<string, {
    tc: number;
    pv: number;
    fw: number[];
    er: string;
    strategy: string;
  }>;
  cvs: Record<string, string[]>;
  avs: Record<string, string[]>;
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
    const endpoint = "monthly-plan-persistentV2";
    console.log(`Client API Call to /api/openai/${endpoint} with body:`, body);
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
      console.error(`Error in fetchAPI for ${endpoint}:`, error);
      const errorMessage = error instanceof Error ? error.message : "Unknown API error";
      return { success: false, error: errorMessage, plan: null };
    }
  }

  async generateMonthlyPlan(request: { mrName: string; month: number; year: number }): Promise<MonthlyPlanResponse> {
    const body: MonthlyPlanRequest = {
      action: "generate",
      mrName: request.mrName,
      month: request.month,
      year: request.year,
    };
    return this.fetchAPI(body);
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

// PlanUtils is kept for now, assuming it might be used elsewhere for display.
export const PlanUtils = {
  calculateWeekDates: (week: { sd: number, ed: number }, month: number, year: number) => {
    const formatDate = (day: number) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return {
      start: formatDate(week.sd),
      end: formatDate(week.ed),
    };
  },
  getWorkingDaysInWeek: (week: { sd: number, ed: number }, month: number, year: number) => {
    let count = 0;
    const startDate = new Date(year, month - 1, week.sd);
    const endDate = new Date(year, month -1, week.ed);
    let current = new Date(startDate);
    while(current <= endDate) {
        const dayOfWeek = current.getDay();
        if (dayOfWeek !==0 && dayOfWeek !==6) {
            count++;
        }
        current.setDate(current.getDate() + 1);
    }
    return count > 0 ? count : 5;
  },
  formatDate: (dateCode: string, month: number, year: number) => {
    if (dateCode && dateCode.length === 4) {
      const day = dateCode.substring(0, 2);
      return `${day}/${String(month).padStart(2, '0')}/${year}`;
    }
    return "Invalid Date";
  },
};
