// app/api/openai/monthly-plan-persistentV2/route.ts

import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      mrName,
      month,
      year,
      territoryContext,
      action = "generate",
      threadId = null,
      weekNumber = null,
      actualPerformance = null,
      revisionReason = null,
    } = body

    console.log(`🤖 Monthly Planning API V2: ${action} for ${mrName} - ${month}/${year}`)

    // Get assistant ID from environment
    const assistantId = process.env.OPENAI_ASSISTANT_ID
    if (!assistantId) {
      throw new Error("OPENAI_ASSISTANT_ID not configured")
    }

    let result
    switch (action) {
      case "generate":
        result = await generateInitialPlan(assistantId, mrName, month, year, territoryContext)
        break
      case "revise_weekly":
        result = await reviseWeeklyPlan(assistantId, threadId, weekNumber, actualPerformance, revisionReason)
        break
      case "update_daily":
        result = await updateDailyPlan(assistantId, threadId, actualPerformance)
        break
      case "monthly_review":
        result = await monthlyReview(assistantId, threadId, actualPerformance)
        break
      default:
        throw new Error(`Unknown action: ${action}`)
    }

    return NextResponse.json({
      success: true,
      ...result,
      action: action,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error(`❌ Monthly planning failed:`, error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
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
  })
}

// ===================================================================
// PHASE 1: INITIAL PLAN GENERATION
// ===================================================================

async function generateInitialPlan(
  assistantId: string,
  mrName: string,
  month: number,
  year: number,
  territoryContext: any,
) {
  console.log(`🆕 Creating new planning thread for ${mrName} with ${territoryContext.customers.length} customers`)

  // Create persistent thread for the entire month
  const thread = await openai.beta.threads.create({
    metadata: {
      mr_name: mrName,
      month: month.toString(),
      year: year.toString(),
      plan_type: "monthly_tour_plan_v2",
      customer_count: territoryContext.customers.length.toString(),
      created_at: new Date().toISOString(),
      format_version: "customer_dates_grouped",
    },
  })

  console.log("📝 Thread created:", thread.id)

  // Compress customer data using finalized format
  const compressedData = compressCustomerData(territoryContext.customers)

  // Generate complete monthly plan using AI
  const aiPlan = await generateCompletePlan(
    assistantId,
    thread.id,
    mrName,
    month,
    year,
    compressedData,
    territoryContext,
  )

  // Generate customer visit schedule using algorithm
  const customerSchedule = generateCustomerVisitSchedule(territoryContext.customers, month, year)

  // Generate area visit schedule
  const areaSchedule = generateAreaVisitSchedule(territoryContext.customers, month, year)

  // Combine into final plan
  const completePlan = {
    ...aiPlan,
    cvs: customerSchedule, // customer_visit_schedule
    avs: areaSchedule, // area_visit_schedule
    summary: generateSummaryMetrics(customerSchedule, territoryContext.customers),
    metadata: {
      generated_at: new Date().toISOString(),
      plan_version: "1.0",
      generation_method: "ai_complete",
      thread_id: thread.id,
      customer_count: territoryContext.customers.length,
      tokens_used: aiPlan.tokens_used || 0,
    },
  }

  return {
    plan: completePlan,
    thread_id: thread.id,
    tokens_used: aiPlan.tokens_used || 0,
    generation_method: "ai_complete",
    customers_processed: territoryContext.customers.length,
  }
}

// ===================================================================
// CUSTOMER DATA COMPRESSION
// ===================================================================
function compressCustomerData(customers: any[]) {
  console.log(`📊 Compressing ${customers.length} customers using finalized format`)

  const compressed: Record<string, any[]> = {}
  const tierMap = {
    TIER_2_PERFORMER: 1,
    TIER_3_DEVELOPER: 2,
    TIER_4_PROSPECT: 3,
  }

  customers.forEach((customer) => {
    const customerCode = customer.customer_code

    compressed[customerCode] = [
      tierMap[customer.tier_level as keyof typeof tierMap] || 3,
      customer.area_name || "Unknown",
      Math.round(customer.tier_score || 0),
      customer.recommended_frequency || 1,
      Math.round(customer.total_sales_90d || 0),
      customer.days_since_last_visit || 0,
      customer.customer_type || "Unknown",
      customer.total_orders_90d || 0,
      Math.round(customer.conversion_rate_90d || 0),
    ]
  })

  return {
    customers: compressed,
    field_mapping: {
      fields: [
        "tier_code",
        "area_name",
        "tier_score",
        "frequency",
        "sales_90d",
        "days_since_visit",
        "customer_type",
        "orders_90d",
        "conversion_rate",
      ],
      tier_codes: {
        1: "TIER_2_PERFORMER",
        2: "TIER_3_DEVELOPER",
        3: "TIER_4_PROSPECT",
      },
    },
  }
}

// ===================================================================
// COMPLETE AI PLAN GENERATION
// ===================================================================
async function generateCompletePlan(
  assistantId: string,
  threadId: string,
  mrName: string,
  month: number,
  year: number,
  compressedData: any,
  territoryContext: any,
) {
  console.log(`🤖 Generating complete AI plan for ${mrName}`)

  const prompt = buildOptimizedPrompt(mrName, month, year, compressedData, territoryContext)

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    instructions: prompt,
  })

  // Wait for completion with 2-minute timeout
  let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
  let attempts = 0
  const maxAttempts = 120

  while (
    (runStatus.status === "running" || runStatus.status === "queued" || runStatus.status === "in_progress") &&
    attempts < maxAttempts
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id)
    attempts++

    if (attempts % 10 === 0) {
      console.log(`⏳ AI thinking... Status: ${runStatus.status} (${attempts}/120s)`)
    }
  }

  if (runStatus.status !== "completed") {
    if (runStatus.status === "in_progress") {
      throw new Error(`AI is still processing after 2 minutes. Please try again in a few minutes.`)
    } else {
      throw new Error(`Assistant run failed with status: ${runStatus.status}`)
    }
  }

  const messages = await openai.beta.threads.messages.list(threadId)
  const response = messages.data[0].content[0]

  if (response.type !== "text") {
    throw new Error("Unexpected response type from assistant")
  }

  const responseText = response.text.value
  console.log("📝 AI Response received, parsing...")

  const aiPlan = parseAIResponse(responseText)
  aiPlan.tokens_used = runStatus.usage?.total_tokens || 0
  console.log(`✅ AI plan generated. Tokens used: ${aiPlan.tokens_used}`)

  return aiPlan
}

function buildOptimizedPrompt(mrName: string, month: number, year: number, compressedData: any, territoryContext: any) {
  const monthNames = [
    "",
    "January",
    "February", 
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const monthName = monthNames[month]
  const daysInMonth = new Date(year, month, 0).getDate()
  const workingDays = Math.floor((daysInMonth * 6) / 7)

  const tierDistribution: Record<string, number> = {}
  Object.values(compressedData.customers).forEach((customerData: any) => {
    const tierCode = customerData[0]
    const tierName = compressedData.field_mapping.tier_codes[tierCode]
    tierDistribution[tierName] = (tierDistribution[tierName] || 0) + 1
  })

  const areas = [...new Set(Object.values(compressedData.customers).map((c: any) => c[1]))]

  return `Generate a complete monthly tour plan for ${mrName} for ${monthName} ${year}.

COMPRESSED CUSTOMER DATA:
${JSON.stringify(compressedData.customers)}

FIELD MAPPING:
${JSON.stringify(compressedData.field_mapping)}

TERRITORY SUMMARY:
- Total customers: ${Object.keys(compressedData.customers).length}
- Working days: ${workingDays}
- Areas: ${areas.join(", ")}
- Tier distribution: ${Object.entries(tierDistribution)
    .map(([tier, count]) => `${tier}: ${count}`)
    .join(", ")}
- Previous performance: ${territoryContext.previous_performance?.total_visits || 0} visits, ₹${territoryContext.previous_performance?.total_revenue || 0} revenue

Generate the strategic framework using our finalized compressed format:
{
  "mo": {
    "mr": "${mrName}",
    "m": ${month},
    "y": ${year},
    "wd": ${workingDays},
    "tv": <total_planned_visits>,
    "tr": <target_revenue>,
    "nt": <nbd_visits_target>,
    "td": [<tier2_count>, <tier3_count>, <tier4_count>]
  },
  "wp": [
    {
      "w": 1,
      "sd": 1, "ed": 7,
      "tv": <weekly_visits>, "tr": <weekly_revenue>,
      "fa": ["<area1>", "<area2>"],
      "pc": ["<priority_customer_types>"],
      "strategy": "<week_strategy>"
    },
    {
      "w": 2,
      "sd": 8, "ed": 14,
      "tv": <weekly_visits>, "tr": <weekly_revenue>,
      "fa": ["<area3>", "<area4>"],
      "pc": ["<priority_customer_types>"],
      "strategy": "<week_strategy>"
    },
    {
      "w": 3,
      "sd": 15, "ed": 21,
      "tv": <weekly_visits>, "tr": <weekly_revenue>,
      "fa": ["<area5>", "<area6>"],
      "pc": ["<priority_customer_types>"],
      "strategy": "<week_strategy>"
    },
    {
      "w": 4,
      "sd": 22, "ed": ${daysInMonth},
      "tv": <weekly_visits>, "tr": <weekly_revenue>,
      "fa": ["<area7>", "<area8>"],
      "pc": ["<priority_customer_types>"],
      "strategy": "<week_strategy>"
    }
  ],
  "acs": {
    "<area_name>": {
      "tc": <total_customers>,
      "pv": <planned_visits>,
      "fw": [<focus_weeks>],
      "er": "<efficiency_rating>",
      "strategy": "<area_strategy>"
    }
  },
  "rc": [
    [7, 1, "Week 1 performance vs targets", ["visit_completion", "revenue_achievement"]],
    [14, 2, "Mid-month optimization review", ["customer_coverage", "area_efficiency"]],
    [21, 3, "Week 3 progress assessment", ["tier_balance", "relationship_quality"]],
    [28, 4, "Month-end performance review", ["overall_targets", "next_month_planning"]]
  ]
}

IMPORTANT:
- Use FULL area names (not codes) in all responses
- Base visit frequencies on tier codes: 1=3visits, 2=2visits, 3=1visit
- Distribute areas across weeks for optimal coverage
- Consider customer priorities based on tier scores and days since last visit
- Ensure realistic targets based on customer count and working days

Return ONLY the compressed JSON format above. No additional text.`
}

// Utility functions
function generateCustomerVisitSchedule(customers: any[], month: number, year: number) {
  const schedule: Record<string, string[]> = {}
  const workingDates = generateWorkingDates(month, year)
  
  const sortedCustomers = customers.sort((a, b) => {
    const scoreA = calculateCustomerPriority(a)
    const scoreB = calculateCustomerPriority(b)
    return scoreB - scoreA
  })

  let dateIndex = 0
  sortedCustomers.forEach((customer) => {
    const frequency = getVisitFrequency(customer.tier_level)
    const dates: string[] = []
    const interval = Math.floor(workingDates.length / frequency)

    for (let i = 0; i < frequency; i++) {
      if (workingDates[dateIndex]) {
        dates.push(workingDates[dateIndex])
        dateIndex = (dateIndex + interval) % workingDates.length
      }
    }
    schedule[customer.customer_code] = dates
  })

  return schedule
}

function generateAreaVisitSchedule(customers: any[], month: number, year: number) {
  const areaSchedule: Record<string, string[]> = {}
  const workingDates = generateWorkingDates(month, year)
  
  const customersByArea: Record<string, any[]> = {}
  customers.forEach((customer) => {
    const area = customer.area_name
    if (!customersByArea[area]) customersByArea[area] = []
    customersByArea[area].push(customer)
  })

  Object.entries(customersByArea).forEach(([area, areaCustomers]) => {
    const totalVisits = areaCustomers.reduce((sum, customer) => {
      return sum + getVisitFrequency(customer.tier_level)
    }, 0)

    const visitsPerDay = 6
    const visitDaysNeeded = Math.ceil(totalVisits / visitsPerDay)
    const dates: string[] = []
    const interval = Math.floor(workingDates.length / visitDaysNeeded)

    for (let i = 0; i < visitDaysNeeded; i++) {
      const dateIndex = (i * interval) % workingDates.length
      if (workingDates[dateIndex] && !dates.includes(workingDates[dateIndex])) {
        dates.push(workingDates[dateIndex])
      }
    }
    areaSchedule[area] = dates.sort()
  })

  return areaSchedule
}

function getVisitFrequency(tier: string): number {
  switch (tier) {
    case "TIER_2_PERFORMER": return 3
    case "TIER_3_DEVELOPER": return 2
    case "TIER_4_PROSPECT": return 1
    default: return 1
  }
}

function calculateCustomerPriority(customer: any): number {
  let score = 0
  switch (customer.tier_level) {
    case "TIER_2_PERFORMER": score += 100; break
    case "TIER_3_DEVELOPER": score += 75; break
    case "TIER_4_PROSPECT": score += 50; break
  }
  score += Number.parseFloat(customer.tier_score) || 0
  const daysSince = Number.parseInt(customer.days_since_last_visit) || 0
  if (daysSince > 30) score += 20
  else if (daysSince > 14) score += 10
  score += (Number.parseFloat(customer.total_sales_90d) || 0) / 1000
  return score
}

function generateWorkingDates(month: number, year: number): string[] {
  const dates: string[] = []
  const daysInMonth = new Date(year, month, 0).getDate()
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    const dayOfWeek = date.getDay()
    if (dayOfWeek !== 0) {
      dates.push(`${day.toString().padStart(2, "0")}${month.toString().padStart(2, "0")}`)
    }
  }
  return dates
}

function generateSummaryMetrics(customerSchedule: Record<string, string[]>, customers: any[]) {
  const tierCounts = { TIER_2_PERFORMER: 0, TIER_3_DEVELOPER: 0, TIER_4_PROSPECT: 0 }
  const totalVisits = Object.values(customerSchedule).reduce((sum, dates) => sum + dates.length, 0)
  
  customers.forEach((customer) => {
    tierCounts[customer.tier_level as keyof typeof tierCounts]++
  })

  return {
    total_customers_scheduled: customers.length,
    total_visit_days: new Set(Object.values(customerSchedule).flat()).size,
    total_visits_planned: totalVisits,
    visits_per_day_avg: Math.round((totalVisits / 26) * 10) / 10,
    tier_distribution_actual: tierCounts,
    efficiency_metrics: {
      customer_coverage: "100%",
      area_clustering: "OPTIMIZED",
      visit_distribution: "BALANCED",
    },
  }
}

function parseAIResponse(response: string) {
  try {
    let cleaned = response.replace(/```json\n?|\n?```/g, "").trim()
    const firstBrace = cleaned.indexOf("{")
    if (firstBrace > 0) cleaned = cleaned.substring(firstBrace)
    const lastBrace = cleaned.lastIndexOf("}")
    if (lastBrace >= 0 && lastBrace < cleaned.length - 1) {
      cleaned = cleaned.substring(0, lastBrace + 1)
    }
    return JSON.parse(cleaned)
  } catch (error) {
    console.error("❌ AI response parsing failed:", error)
    throw new Error(`AI response parsing failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Phase 2 & 3 placeholders
async function reviseWeeklyPlan(assistantId: string, threadId: string, weekNumber: number, actualPerformance: any, revisionReason: string) {
  throw new Error("Weekly revision not implemented yet - Phase 2")
}

async function updateDailyPlan(assistantId: string, threadId: string, actualPerformance: any) {
  throw new Error("Daily update not implemented yet - Phase 2")
}

async function monthlyReview(assistantId: string, threadId: string, monthlyPerformance: any) {
  throw new Error("Monthly review not implemented yet - Phase 3")
}
