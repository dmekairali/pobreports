// app/api/openai/monthly-plan-persistentV2/route.ts

import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase"; // Ensure this path is correct
import { MonthlyPlanServiceV2 } from "@/lib/monthly-plan-service.v2"; // Ensure this path is correct

export async function POST(request: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const monthlyPlanService = new MonthlyPlanServiceV2(supabase!, openai); // Pass Supabase client and OpenAI client

    const body = await request.json();
    const {
      mrName,
      month,
      year,
      // territoryContext is no longer expected from client for 'generate'
      action = "generate",
      threadId = null,
      weekNumber = null,
      actualPerformance = null,
      revisionReason = null,
    } = body;

    console.log(`🤖 API Route: Action: ${action} for ${mrName} - ${month}/${year}`);

    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      throw new Error("OPENAI_ASSISTANT_ID not configured");
    }

    let result;
    switch (action) {
      case "generate":
        if (!mrName || !month || !year) {
          throw new Error("mrName, month, and year are required for generate action.");
        }
        // The service method now handles fetching territory context, AI call, and saving.
        result = await monthlyPlanService.generateMonthlyPlanForMR(mrName, month, year, assistantId);
        // The result from the service should already be in the desired format { success, plan, thread_id, tokens_used, error? }
        break;
      case "revise_weekly":
        // TODO: Adapt this call if MonthlyPlanServiceV2 will handle revisions
        // For now, keeping existing placeholder logic, but it needs an OpenAI instance.
        result = await reviseWeeklyPlan(assistantId, threadId, weekNumber, actualPerformance, revisionReason, openai);
        break;
      case "update_daily":
        // TODO: Adapt for service
        result = await updateDailyPlan(assistantId, threadId, actualPerformance, openai);
        break;
      case "monthly_review":
        // TODO: Adapt for service
        result = await monthlyReview(assistantId, threadId, actualPerformance, openai);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    // If the service call itself failed (e.g., result.success === false), return its error.
    if (result && result.success === false) {
      return NextResponse.json({
        success: false,
        error: result.error || 'Service call failed with no specific error message.',
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }

    // Otherwise, return the successful result from the service or other actions
    return NextResponse.json({
      success: true,
      ...result, // This will include plan, thread_id, tokens_used from generateMonthlyPlanForMR
      action: action, // Ensure action is part of the response
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error(`❌ API Route: Monthly planning failed:`, error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error in API route',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}


// Placeholder functions for actions not yet migrated to MonthlyPlanServiceV2
// These would need the OpenAI client passed to them if they make direct AI calls.
async function reviseWeeklyPlan(assistantId: string, threadId: string | null, weekNumber: number | null, actualPerformance: any, revisionReason: string | null, openai: OpenAI) {
  if (!threadId || !weekNumber || !actualPerformance || !revisionReason) {
    throw new Error("Missing parameters for revise_weekly action");
  }
  console.log("reviseWeeklyPlan called - not implemented in service yet");
  // Placeholder: Call OpenAI directly or implement in service
  throw new Error("Weekly revision not implemented yet - Phase 2");
}

async function updateDailyPlan(assistantId: string, threadId: string | null, actualPerformance: any, openai: OpenAI) {
   if (!threadId || !actualPerformance) {
    throw new Error("Missing parameters for update_daily action");
  }
  console.log("updateDailyPlan called - not implemented in service yet");
  throw new Error("Daily update not implemented yet - Phase 2");
}

async function monthlyReview(assistantId: string, threadId: string | null, monthlyPerformance: any, openai: OpenAI) {
  if (!threadId || !monthlyPerformance) {
    throw new Error("Missing parameters for monthly_review action");
  }
  console.log("monthlyReview called - not implemented in service yet");
  throw new Error("Monthly review not implemented yet - Phase 3");
}

// The original helper functions (generateInitialPlan, compressCustomerData, etc.)
// are removed from here as their logic has been moved into MonthlyPlanServiceV2.
