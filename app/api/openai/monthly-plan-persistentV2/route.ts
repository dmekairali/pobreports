// app/api/openai/monthly-plan-persistentV2/route.ts

import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase"; // Ensure this path is correct
import { MonthlyPlanServiceV2 } from "@/lib/monthly-plan-service.v2"; // Ensure this path is correct

export async function POST(request: NextRequest) {
  try {
    // Initialize OpenAI client
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY is not configured");
    }
    const openai = new OpenAI({ apiKey: openaiApiKey });

    // Ensure Supabase client is available
    if (!supabase) {
      throw new Error("Supabase client is not available. Check configuration.");
    }
    const monthlyPlanService = new MonthlyPlanServiceV2(supabase, openai);

    const body = await request.json();
    const {
      mrName,
      month,
      year,
      // territoryContext is no longer expected from client for 'generate' action
      action = "generate", // Default action
      threadId = null,
      weekNumber = null,
      actualPerformance = null,
      revisionReason = null,
      // monthlyPerformance might be used for 'monthly_review'
      monthlyPerformance = null,
    } = body;

    console.log(`🤖 API Route: Action: ${action} for MR: ${mrName}, Month: ${month}, Year: ${year}`);

    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      throw new Error("OPENAI_ASSISTANT_ID not configured");
    }

    let result;
    switch (action) {
      case "generate":
        if (!mrName || typeof month !== 'number' || typeof year !== 'number') {
          throw new Error("mrName, month, and year are required and must be correct types for 'generate' action.");
        }
        result = await monthlyPlanService.generateMonthlyPlanForMR(mrName, month, year, assistantId);
        break;

      // --- Placeholder actions ---
      // These sections need to be implemented or adapted to use MonthlyPlanServiceV2 if applicable,
      // or continue using direct OpenAI calls if the service doesn't cover their specific logic yet.
      // For now, they will throw "Not Implemented" errors.
      case "revise_weekly":
        console.warn("Action 'revise_weekly' is not fully implemented with MonthlyPlanServiceV2 yet.");
        // Example of how it might be called if a service method existed:
        // if (!threadId || !weekNumber || !actualPerformance || !revisionReason) {
        //   throw new Error("Missing parameters for revise_weekly action");
        // }
        // result = await monthlyPlanService.reviseWeeklyPlanInDb(threadId, weekNumber, actualPerformance, revisionReason, assistantId);
        result = { success: false, error: "Weekly revision not implemented in V2 service yet." }; // Placeholder
        // Temporary direct call for testing (REMOVE LATER or integrate into service)
        // result = await oldReviseWeeklyPlan(assistantId, threadId, weekNumber, actualPerformance, revisionReason, openai);
        break;
      case "update_daily":
        console.warn("Action 'update_daily' is not fully implemented with MonthlyPlanServiceV2 yet.");
        // result = await monthlyPlanService.updateDailyPlanInDb(threadId, actualPerformance, assistantId);
        result = { success: false, error: "Daily update not implemented in V2 service yet." }; // Placeholder
        break;
      case "monthly_review":
        console.warn("Action 'monthly_review' is not fully implemented with MonthlyPlanServiceV2 yet.");
        // result = await monthlyPlanService.generateMonthlyReview(threadId, monthlyPerformance, assistantId);
        result = { success: false, error: "Monthly review not implemented in V2 service yet." }; // Placeholder
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    // Check if the result from the service (or other actions) indicates failure
    if (result && result.success === false) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Operation failed with no specific error message.',
        action: action,
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }

    // Return the successful result
    return NextResponse.json({
      success: true,
      ...result, // This will include plan, thread_id, tokens_used from generateMonthlyPlanForMR
      action: action,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error(`❌ API Route: Monthly planning process failed:`, error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred in API route.',
      action: request.method === 'POST' ? (await request.clone().json().catch(() => ({}))).action || 'unknown_action' : 'unknown_action',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Adjust in production
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Add Authorization if you use it
    },
  });
}

// All old helper functions (generateInitialPlan, compressCustomerData, generateCompletePlan,
// buildOptimizedPrompt, parseAIResponse, generateCustomerVisitSchedule,
// generateAreaVisitSchedule, getVisitFrequency, calculateCustomerPriority,
// generateWorkingDates, generateSummaryMetrics) are now removed from this file.
// Their logic has been adapted and moved into the MonthlyPlanServiceV2 class.

// If you need to keep old placeholder functions for non-generate actions temporarily:
// async function oldReviseWeeklyPlan(assistantId: string, threadId: string | null, weekNumber: number | null, actualPerformance: any, revisionReason: string | null, openai: OpenAI) {
//   if (!threadId || !weekNumber || !actualPerformance || !revisionReason) {
//     throw new Error("Missing parameters for revise_weekly action (old placeholder)");
//   }
//   console.log("oldReviseWeeklyPlan called - placeholder");
//   throw new Error("Weekly revision (old placeholder) not implemented yet - Phase 2");
// }
// Similar for updateDailyPlan and monthlyReview if needed during transition.
