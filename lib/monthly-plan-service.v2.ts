// lib/monthly-plan-service.v2.ts
import { supabase } from './supabase';
import type { SupabaseClient } from '@supabase/supabase-js';
import OpenAI from 'openai'; // Assuming OpenAI will be passed or constructed here if needed by AI call

// Define types based on usage - these should be refined
interface CustomerTierData {
    customer_code: string;
    customer_name: string;
    customer_type: string;
    area_name: string;
    tier_score: number;
    tier_level: string;
    recommended_frequency: number;
    recommended_visit_duration: number;
    total_orders_90d: number;
    total_sales_90d: number;
    conversion_rate_90d: number;
    last_visit_date: string;
    days_since_last_visit: number;
    customer_segment: string;
    // Add other fields from your 'customer_tiers' view
}

interface TerritoryContext {
    customers: CustomerTierData[];
    previous_performance: PreviousPerformance;
    territory_metrics: TerritoryMetrics;
    mr_name: string;
    month: number;
    year: number;
}

interface PreviousPerformance {
    total_visits: number;
    total_revenue: number;
    conversion_rate: number;
}

interface TerritoryMetrics {
    total_customers: number;
    tier_distribution: Record<string, number>;
    area_count: number;
    avg_tier_score: number;
}

// Assuming Plan structure from previous definitions or as returned by AI
// This might need to be imported or defined more concretely
// For now, using a generic 'any' for plan parts for brevity in this step
interface MonthlyPlanV2 {
    mo: any;
    wp: any[];
    cvs: Record<string, string[]>;
    avs: Record<string, string[]>;
    summary?: any; // Make summary optional as it seems to be added later in some contexts
    // Add other plan fields
}

interface AIAPIResult {
    success: boolean;
    plan: MonthlyPlanV2;
    thread_id: string;
    tokens_used: number;
    error?: string;
    // Other potential fields from the actual API call to OpenAI assistant
}

interface SavedPlan {
    id: string; // Assuming UUID or number from DB
    // Add other fields from 'monthly_tour_plans' table
    [key: string]: any;
}


export class MonthlyPlanServiceV2 {
    private cache: Map<string, { data: any; timestamp: number }>;
    private cacheExpiry: number;
    private supabase: SupabaseClient;
    private openai: OpenAI; // To be initialized or passed

    constructor(supabaseClient: SupabaseClient, openaiClient: OpenAI) {
        this.supabase = supabaseClient;
        this.openai = openaiClient; // Store the passed OpenAI client
        this.cache = new Map();
        this.cacheExpiry = 30 * 60 * 1000; // 30 minutes
    }

    // ===================================================================
    // MONTHLY PLAN GENERATION (Adapted for server-side use in API route)
    // ===================================================================
    async generateMonthlyPlanForMR(mrName: string, month: number, year: number, assistantId: string): Promise<AIAPIResult> {
        try {
            console.log(`🗓️ [V2 Service] Generating monthly plan for ${mrName} - ${month}/${year}`);

            const territoryContext = await this.getCompressedTerritoryContext(mrName, month, year);

            if (!territoryContext.customers || territoryContext.customers.length === 0) {
                throw new Error(`No customers found for ${mrName}`);
            }

            // This method will now directly orchestrate the AI call using the passed OpenAI client
            // and assistant ID, rather than making a fetch call to itself.
            const aiResult = await this.orchestrateAICall(
                assistantId,
                mrName,
                month,
                year,
                territoryContext
            );

            this.validatePlanStructure(aiResult.plan);

            const savedPlanEntry = await this.saveMonthlyPlanToDb(mrName, month, year, aiResult.plan, aiResult.thread_id);

            console.log(`✅ [V2 Service] Monthly plan generated and saved for ${mrName}. Plan ID: ${savedPlanEntry.id}`);
            console.log(`📊 Plan metrics:`, {
                customers: Object.keys(aiResult.plan.cvs || {}).length,
                areas: Object.keys(aiResult.plan.avs || {}).length,
                tokens_used: aiResult.tokens_used,
                thread_id: aiResult.thread_id
            });

            return {
                success: true,
                plan: aiResult.plan,
                thread_id: aiResult.thread_id,
                tokens_used: aiResult.tokens_used,
                // plan_id: savedPlanEntry.id, // Include if needed by client
                // generated_at: new Date().toISOString() // Include if needed
            };

        } catch (error: any) {
            console.error('❌ [V2 Service] Monthly plan generation failed:', error);
            return {
                success: false,
                error: error.message,
                plan: {} as MonthlyPlanV2, // Provide a default empty plan structure
                thread_id: "",
                tokens_used: 0
            };
        }
    }

    /**
     * This method will replace the 'callMonthlyPlanAPI' and integrate
     * the OpenAI assistant logic directly.
     * It will be similar to 'generateInitialPlan' from the current API route,
     * but using the territoryContext prepared by this service.
     */
    private async orchestrateAICall(
        assistantId: string,
        mrName: string,
        month: number,
        year: number,
        territoryContext: TerritoryContext
    ): Promise<AIAPIResult> {
        console.log(`🤖 [V2 Service] Orchestrating AI call for ${mrName}`);

        // TODO: Reuse or adapt logic from app/api/openai/monthly-plan-persistentV2/route.ts
        // This includes:
        // 1. Creating a thread (if new plan) or using existing threadId
        // 2. Compressing customer data (territoryContext.customers) if needed by the prompt
        //    (The getCompressedTerritoryContext already fetches customers, this step might be about formatting for AI)
        // 3. Building the prompt using the new territoryContext.
        // 4. Creating and waiting for the OpenAI run.
        // 5. Parsing the response.

        // For now, a placeholder structure:
        // This is where the actual OpenAI API interaction logic from your
        // app/api/openai/monthly-plan-persistentV2/route.ts's generateInitialPlan
        // and its helpers (compressCustomerData, generateCompletePlan, buildOptimizedPrompt, parseAIResponse)
        // will be invoked or adapted.

        // Example of creating a new thread:
        const thread = await this.openai.beta.threads.create({
            metadata: {
                mr_name: mrName,
                month: month.toString(),
                year: year.toString(),
                plan_type: "monthly_tour_plan_v2_service", // Indicate new service
            },
        });
        console.log("📝 [V2 Service] Thread created:", thread.id);

        // Compress customer data (example, adapt from your API route)
        const compressedCustomers = this._compressCustomerDataForAI(territoryContext.customers);

        const prompt = this._buildPromptForAI(mrName, month, year, compressedCustomers, territoryContext);

        const run = await this.openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
            instructions: prompt,
        });

        // Wait for completion
        let runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id);
        let attempts = 0;
        const maxAttempts = 120; // 2 minutes

        while (
            (runStatus.status === "running" || runStatus.status === "queued" || runStatus.status === "in_progress") &&
            attempts < maxAttempts
        ) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            runStatus = await this.openai.beta.threads.runs.retrieve(thread.id, run.id);
            attempts++;
            if (attempts % 10 === 0) {
                console.log(`⏳ [V2 Service] AI thinking... Status: ${runStatus.status} (${attempts}/${maxAttempts}s)`);
            }
        }

        if (runStatus.status !== "completed") {
            throw new Error(`[V2 Service] Assistant run failed with status: ${runStatus.status}. Details: ${JSON.stringify(runStatus.last_error)}`);
        }

        const messages = await this.openai.beta.threads.messages.list(thread.id);
        const responseContent = messages.data[0]?.content[0];

        if (responseContent?.type !== "text") {
            throw new Error("[V2 Service] Unexpected response type from assistant");
        }

        const aiPlan = this._parseAIResponse(responseContent.text.value);

        // The algorithmic generation of cvs and avs might happen here or be part of AI's output
        // Based on your original service, it seems AI provides the core plan, and CVS/AVS might be separate.
        // For now, let's assume aiPlan is the complete structure including cvs/avs or they are added.
        // If they are algorithmically generated like in the current API route, that logic needs to be here.

        // Placeholder for algorithmic generation if needed:
        // const customerSchedule = this._generateCustomerVisitSchedule(territoryContext.customers, month, year);
        // const areaSchedule = this._generateAreaVisitSchedule(territoryContext.customers, month, year);
        // const finalPlan = { ...aiPlan, cvs: customerSchedule, avs: areaSchedule, summary: this._generateSummaryMetrics(customerSchedule, territoryContext.customers) };

        return {
            success: true,
            plan: aiPlan, // Or finalPlan if CVS/AVS are added algorithmically
            thread_id: thread.id,
            tokens_used: runStatus.usage?.total_tokens || 0,
        };
    }

    // Adapted from API route's compressCustomerData
    private _compressCustomerDataForAI(customers: CustomerTierData[]): any {
        console.log(`📊 [V2 Service] Compressing ${customers.length} customers for AI format.`);
        const compressed: Record<string, any[]> = {};
        // Assuming tier_level in CustomerTierData matches keys like "TIER_2_PERFORMER"
        const tierMap: Record<string, number> = {
            "TIER_2_PERFORMER": 1, // Example, ensure these match your actual tier_level values
            "TIER_3_DEVELOPER": 2,
            "TIER_4_PROSPECT": 3,
            // Add other tiers if necessary
        };

        customers.forEach((customer) => {
            const customerCode = customer.customer_code;
            compressed[customerCode] = [
                tierMap[customer.tier_level] || 3, // Default to prospect if tier not in map
                customer.area_name || "Unknown",
                Math.round(customer.tier_score || 0),
                customer.recommended_frequency || 1,
                Math.round(customer.total_sales_90d || 0),
                customer.days_since_last_visit || 0,
                customer.customer_type || "Unknown",
                customer.total_orders_90d || 0,
                Math.round(customer.conversion_rate_90d || 0),
            ];
        });

        return {
            customers: compressed,
            field_mapping: {
                fields: [
                    "tier_code", "area_name", "tier_score", "frequency",
                    "sales_90d", "days_since_visit", "customer_type",
                    "orders_90d", "conversion_rate",
                ],
                tier_codes: { // Inverse mapping for prompt reference
                    1: "TIER_2_PERFORMER",
                    2: "TIER_3_DEVELOPER",
                    3: "TIER_4_PROSPECT",
                },
            },
        };
    }

    // Adapted from API route's buildOptimizedPrompt
    private _buildPromptForAI(mrName: string, month: number, year: number, compressedCustomerDataForAI: any, territoryContext: TerritoryContext): string {
        console.log(`📝 [V2 Service] Building AI prompt for ${mrName}.`);
        const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = monthNames[month];
        const daysInMonth = new Date(year, month, 0).getDate();
        const workingDays = Math.floor((daysInMonth * 6) / 7); // Approx 6 working days a week

        // Use territoryContext.territory_metrics and territoryContext.previous_performance
        const { total_customers, tier_distribution, area_count } = territoryContext.territory_metrics;
        const { total_visits: prev_visits, total_revenue: prev_revenue } = territoryContext.previous_performance;

        const areasList = territoryContext.customers.map(c => c.area_name).filter((v, i, a) => a.indexOf(v) === i);


        return `Generate a complete monthly tour plan for ${mrName} for ${monthName} ${year}.

COMPRESSED CUSTOMER DATA:
${JSON.stringify(compressedCustomerDataForAI.customers)}

FIELD MAPPING:
${JSON.stringify(compressedCustomerDataForAI.field_mapping)}

TERRITORY SUMMARY:
- Total customers: ${total_customers}
- Working days: ${workingDays} (approx)
- Areas: ${areasList.join(", ")} (${area_count} unique areas)
- Tier distribution: ${JSON.stringify(tier_distribution)}
- Previous performance (last month): ${prev_visits} visits, ₹${prev_revenue} revenue

Generate the strategic framework using our finalized compressed format:
{
  "mo": { "mr": "${mrName}", "m": ${month}, "y": ${year}, "wd": ${workingDays}, "tv": <total_planned_visits>, "tr": <target_revenue>, "nt": <nbd_visits_target>, "td": [<tier2_count>, <tier3_count>, <tier4_count>] },
  "wp": [
    { "w": 1, "sd": 1, "ed": 7, "tv": <weekly_visits>, "tr": <weekly_revenue>, "fa": ["<area1>", "<area2>"], "pc": ["<priority_customer_types>"], "strategy": "<week_strategy>" },
    { "w": 2, "sd": 8, "ed": 14, "tv": <weekly_visits>, "tr": <weekly_revenue>, "fa": ["<area3>", "<area4>"], "pc": ["<priority_customer_types>"], "strategy": "<week_strategy>" },
    { "w": 3, "sd": 15, "ed": 21, "tv": <weekly_visits>, "tr": <weekly_revenue>, "fa": ["<area5>", "<area6>"], "pc": ["<priority_customer_types>"], "strategy": "<week_strategy>" },
    { "w": 4, "sd": 22, "ed": ${daysInMonth}, "tv": <weekly_visits>, "tr": <weekly_revenue>, "fa": ["<area7>", "<area8>"], "pc": ["<priority_customer_types>"], "strategy": "<week_strategy>" }
  ],
  "acs": { "<area_name>": { "tc": <total_customers_in_area>, "pv": <planned_visits_for_area>, "fw": [<focus_weeks>], "er": "<efficiency_rating>", "strategy": "<area_strategy>" } },
  "rc": [
    [7, 1, "Week 1 performance vs targets", ["visit_completion", "revenue_achievement"]],
    [14, 2, "Mid-month optimization review", ["customer_coverage", "area_efficiency"]],
    [21, 3, "Week 3 progress assessment", ["tier_balance", "relationship_quality"]],
    [28, 4, "Month-end performance review", ["overall_targets", "next_month_planning"]]
  ]
}

IMPORTANT:
- Use FULL area names (not codes) in all responses.
- Base visit frequencies on tier codes: tier_code 1 (TIER_2_PERFORMER) = 3 visits, tier_code 2 (TIER_3_DEVELOPER) = 2 visits, tier_code 3 (TIER_4_PROSPECT) = 1 visit.
- Distribute areas across weeks for optimal coverage.
- Consider customer priorities based on tier scores and days since last visit.
- Ensure realistic targets based on customer count and working days.

Return ONLY the compressed JSON format above. No additional text.`;
    }

    // Reusing from API route (already good)
    private _parseAIResponse(responseText: string): MonthlyPlanV2 {
        console.log("📝 [V2 Service] Parsing AI Response.");
        try {
            let cleaned = responseText.replace(/```json\n?|\n?```/g, "").trim();
            const firstBrace = cleaned.indexOf("{");
            if (firstBrace > 0) cleaned = cleaned.substring(firstBrace);
            const lastBrace = cleaned.lastIndexOf("}");
            if (lastBrace >= 0 && lastBrace < cleaned.length - 1) {
                cleaned = cleaned.substring(0, lastBrace + 1);
            }
            return JSON.parse(cleaned);
        } catch (error: any) {
            console.error("❌ [V2 Service] AI response parsing failed:", error);
            throw new Error(`[V2 Service] AI response parsing failed: ${error.message}`);
        }
    }

    // --- Algorithmic Schedule Generation Methods (adapted from API route) ---
    private _generateCustomerVisitSchedule(customers: CustomerTierData[], month: number, year: number): Record<string, string[]> {
        console.log(`📅 [V2 Service] Generating customer visit schedule for ${customers.length} customers`);
        const schedule: Record<string, string[]> = {};
        const workingDates = this._generateWorkingDates(month, year);

        const sortedCustomers = [...customers].sort((a, b) => {
            const scoreA = this._calculateCustomerPriority(a);
            const scoreB = this._calculateCustomerPriority(b);
            return scoreB - scoreA;
        });

        let dateIndex = 0;
        sortedCustomers.forEach((customer) => {
            const frequency = this._getVisitFrequency(customer.tier_level);
            const dates: string[] = [];
            if (frequency === 0 || workingDates.length === 0) { // Handle no visits or no working days
                schedule[customer.customer_code] = [];
                return;
            }
            const interval = Math.max(1, Math.floor(workingDates.length / frequency)); // Ensure interval is at least 1

            for (let i = 0; i < frequency; i++) {
                const visitDateIndex = (dateIndex + i * interval) % workingDates.length;
                if (workingDates[visitDateIndex]) {
                    dates.push(workingDates[visitDateIndex]);
                }
            }
            schedule[customer.customer_code] = dates;
            dateIndex = (dateIndex + 1) % workingDates.length; // Stagger start for next customer
        });
        return schedule;
    }

    private _generateAreaVisitSchedule(customers: CustomerTierData[], month: number, year: number): Record<string, string[]> {
        console.log(`🗺️ [V2 Service] Generating area visit schedule`);
        const areaSchedule: Record<string, string[]> = {};
        const workingDates = this._generateWorkingDates(month, year);

        const customersByArea: Record<string, CustomerTierData[]> = {};
        customers.forEach((customer) => {
            const area = customer.area_name || "UnknownArea";
            if (!customersByArea[area]) customersByArea[area] = [];
            customersByArea[area].push(customer);
        });

        Object.entries(customersByArea).forEach(([area, areaCustomers]) => {
            const totalVisitsInArea = areaCustomers.reduce((sum, customer) => {
                return sum + this._getVisitFrequency(customer.tier_level);
            }, 0);

            const visitsPerDayTarget = 6; // Target visits per day in an area
            if (totalVisitsInArea === 0 || workingDates.length === 0) {
                 areaSchedule[area] = [];
                 return;
            }
            const visitDaysNeeded = Math.ceil(totalVisitsInArea / visitsPerDayTarget);
            const dates: string[] = [];
            // Distribute visit days somewhat evenly
            const interval = Math.max(1, Math.floor(workingDates.length / visitDaysNeeded));

            for (let i = 0; i < visitDaysNeeded && i < workingDates.length; i++) {
                const dateIndex = (i * interval) % workingDates.length;
                 if (workingDates[dateIndex] && !dates.includes(workingDates[dateIndex])) {
                    dates.push(workingDates[dateIndex]);
                }
            }
             // If not enough unique dates were found due to modulo, fill up from start
            let workingDateIdx = 0;
            while(dates.length < visitDaysNeeded && workingDateIdx < workingDates.length) {
                if(!dates.includes(workingDates[workingDateIdx])) {
                    dates.push(workingDates[workingDateIdx]);
                }
                workingDateIdx++;
            }
            areaSchedule[area] = dates.sort();
        });
        return areaSchedule;
    }

    private _getVisitFrequency(tier: string): number {
        // Ensure tier levels match exactly what's in CustomerTierData.tier_level
        switch (tier) {
            case "TIER_2_PERFORMER": return 3;
            case "TIER_3_DEVELOPER": return 2;
            case "TIER_4_PROSPECT": return 1;
            default: return 1; // Default for unknown tiers
        }
    }

    private _calculateCustomerPriority(customer: CustomerTierData): number {
        let score = 0;
        switch (customer.tier_level) {
            case "TIER_2_PERFORMER": score += 100; break;
            case "TIER_3_DEVELOPER": score += 75; break;
            case "TIER_4_PROSPECT": score += 50; break;
        }
        score += Number(customer.tier_score) || 0;
        const daysSince = Number(customer.days_since_last_visit) || 0;
        if (daysSince > 30) score += 20;
        else if (daysSince > 14) score += 10;
        score += (Number(customer.total_sales_90d) || 0) / 1000; // Example weighting
        return score;
    }

    private _generateWorkingDates(month: number, year: number): string[] {
        const dates: string[] = [];
        const daysInMonth = new Date(year, month, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day);
            if (date.getDay() !== 0) { // Exclude Sundays (getDay() === 0)
                dates.push(`${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}`);
            }
        }
        return dates;
    }

    private _generateSummaryMetrics(cvs: Record<string, string[]>, customers: CustomerTierData[]): any {
        console.log(`📊 [V2 Service] Generating summary metrics.`);
        const tierCounts: Record<string, number> = {};
        customers.forEach(c => {
            tierCounts[c.tier_level] = (tierCounts[c.tier_level] || 0) + 1;
        });
        const totalVisits = Object.values(cvs).reduce((sum, dates) => sum + dates.length, 0);
        const totalVisitDays = new Set(Object.values(cvs).flat()).size;
        const workingDaysInMonth = this._generateWorkingDates( // This needs month/year if used
            new Date().getMonth() + 1, // Placeholder, ideally pass month/year if this fn is used in isolation
            new Date().getFullYear()
        ).length;


        return {
            total_customers_scheduled: customers.length,
            total_visit_days: totalVisitDays,
            total_visits_planned: totalVisits,
            visits_per_day_avg: workingDaysInMonth > 0 ? Math.round((totalVisits / workingDaysInMonth) * 10) / 10 : 0,
            tier_distribution_actual: tierCounts,
            efficiency_metrics: {
                customer_coverage: customers.length > 0 ? `${(Object.keys(cvs).length / customers.length * 100).toFixed(0)}%` : "0%",
                area_clustering: "OPTIMIZED", // Placeholder
                visit_distribution: "BALANCED", // Placeholder
            },
        };
    }
    // --- End of Algorithmic Schedule Generation Methods ---

    public async getCompressedTerritoryContext(mrName: string, month: number, year: number): Promise<TerritoryContext> {
        console.log(`🔍 [V2 Service] Fetching territory context for ${mrName}`);
        try {
            const { data: customers, error: customersError } = await this.supabase
                .from('customer_tiers') // Using the materialized view
                .select(`
                    customer_code, customer_name, customer_type, area_name,
                    tier_score, tier_level, recommended_frequency, recommended_visit_duration,
                    total_orders_90d, total_sales_90d, conversion_rate_90d,
                    last_visit_date, days_since_last_visit, customer_segment
                `)
                .eq('mr_name', mrName)
                .eq('status', 'ACTIVE'); // Assuming your view has mr_name and status

            if (customersError) {
                console.error('❌ [V2 Service] Customer data fetch error:', customersError);
                throw new Error(`Customer data fetch failed: ${customersError.message}`);
            }
            console.log(`📊 [V2 Service] Retrieved ${customers?.length || 0} customers for ${mrName}`);

            const previousPerformance = await this.getPreviousPerformance(mrName, month, year);
            const territoryMetrics = this.calculateTerritoryMetrics(customers || []);

            return {
                customers: customers || [],
                previous_performance: previousPerformance,
                territory_metrics: territoryMetrics,
                mr_name: mrName,
                month: month,
                year: year
            };
        } catch (error: any) {
            console.error('❌ [V2 Service] Territory context fetch failed:', error);
            throw error;
        }
    }

    public async saveMonthlyPlanToDb(mrName: string, month: number, year: number, plan: MonthlyPlanV2, threadId: string): Promise<SavedPlan> {
        try {
            console.log(`💾 [V2 Service] Saving monthly plan for ${mrName}`);
            const planData = {
                mr_name: mrName,
                plan_month: month,
                plan_year: year,
                original_plan_json: plan,
                current_plan_json: plan, // Initially same as original
                current_revision: 0,
                status: 'ACTIVE', // Or some initial status
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                thread_id: threadId
            };

            const { data: existingPlan, error: existingError } = await this.supabase
                .from('monthly_tour_plans')
                .select('id')
                .eq('mr_name', mrName)
                .eq('plan_month', month)
                .eq('plan_year', year)
                .single();

            if (existingError && existingError.code !== 'PGRST116') { // PGRST116: row not found
                throw existingError;
            }

            let savedPlan: SavedPlan;
            if (existingPlan) {
                const { data, error } = await this.supabase
                    .from('monthly_tour_plans')
                    .update({ ...planData, updated_at: new Date().toISOString() })
                    .eq('id', existingPlan.id)
                    .select()
                    .single();
                if (error) throw error;
                savedPlan = data;
                console.log(`✅ [V2 Service] Updated existing plan with ID: ${savedPlan.id}`);
            } else {
                const { data, error } = await this.supabase
                    .from('monthly_tour_plans')
                    .insert(planData)
                    .select()
                    .single();
                if (error) throw error;
                savedPlan = data;
                console.log(`✅ [V2 Service] Created new plan with ID: ${savedPlan.id}`);
            }
            return savedPlan;
        } catch (error: any) {
            console.error('❌ [V2 Service] Failed to save monthly plan:', error);
            throw error;
        }
    }

    public async getMonthlyPlanFromDb(mrName: string, month: number, year: number): Promise<SavedPlan | null> {
        try {
            const cacheKey = `plan_${mrName}_${month}_${year}`;
            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey)!;
                if (Date.now() - cached.timestamp < this.cacheExpiry) {
                    console.log(`📋 [V2 Service] Using cached plan for ${mrName}`);
                    return cached.data as SavedPlan;
                }
            }

            const { data: plan, error } = await this.supabase
                .from('monthly_tour_plans')
                .select('*')
                .eq('mr_name', mrName)
                .eq('plan_month', month)
                .eq('plan_year', year)
                .maybeSingle(); // Use maybeSingle to handle null gracefully

            if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, not an error for maybeSingle
                throw error;
            }

            if (plan) {
                this.cache.set(cacheKey, { data: plan, timestamp: Date.now() });
                console.log(`📋 [V2 Service] Retrieved plan from DB for ${mrName} - ${month}/${year}`);
            }
            return plan;
        } catch (error: any) {
            console.error('❌ [V2 Service] Failed to get monthly plan from DB:', error);
            return null;
        }
    }

    async getPreviousPerformance(mrName: string, month: number, year: number): Promise<PreviousPerformance> {
        try {
            const previousMonth = month === 1 ? 12 : month - 1;
            const previousYear = month === 1 ? year - 1 : year;

            const previousPlanData = await this.getMonthlyPlanFromDb(mrName, previousMonth, previousYear);

            if (previousPlanData?.current_plan_json?.summary) {
                const summary = previousPlanData.current_plan_json.summary;
                const mo = previousPlanData.current_plan_json.mo;
                return {
                    total_visits: summary.total_visits_planned || summary.total_visits || 0, // Check for different possible keys
                    total_revenue: mo?.tr || summary.target_revenue || 0,
                    conversion_rate: 75 // Default estimate or calculate if possible
                };
            }
            return { total_visits: 0, total_revenue: 0, conversion_rate: 0 };
        } catch (error: any) {
            console.warn('⚠️ [V2 Service] Could not fetch previous performance:', error.message);
            return { total_visits: 0, total_revenue: 0, conversion_rate: 0 };
        }
    }

    calculateTerritoryMetrics(customers: CustomerTierData[]): TerritoryMetrics {
        if (!customers || customers.length === 0) {
            return { total_customers: 0, tier_distribution: {}, area_count: 0, avg_tier_score: 0 };
        }
        const tierDistribution: Record<string, number> = {};
        const areas = new Set<string>();
        let totalTierScore = 0;

        customers.forEach(customer => {
            const tier = customer.tier_level || 'TIER_4_PROSPECT'; // Default if null
            tierDistribution[tier] = (tierDistribution[tier] || 0) + 1;
            if (customer.area_name) areas.add(customer.area_name);
            totalTierScore += Number(customer.tier_score) || 0;
        });
        return {
            total_customers: customers.length,
            tier_distribution: tierDistribution,
            area_count: areas.size,
            avg_tier_score: customers.length > 0 ? Math.round(totalTierScore / customers.length) : 0
        };
    }

    validatePlanStructure(plan: MonthlyPlanV2) {
        if (!plan) throw new Error('[V2 Service] Plan is null or undefined');
        if (!plan.mo) throw new Error('[V2 Service] Missing monthly overview (mo)');
        if (!plan.wp || !Array.isArray(plan.wp)) throw new Error('[V2 Service] Missing weekly plans (wp)');
        if (!plan.cvs) throw new Error('[V2 Service] Missing customer visit schedule (cvs)');
        if (!plan.avs) throw new Error('[V2 Service] Missing area visit schedule (avs)');
        if (!plan.mo.mr || !plan.mo.m || !plan.mo.y) throw new Error('[V2 Service] Invalid monthly overview structure');
        if (plan.wp.length !== 4) throw new Error('[V2 Service] Must have exactly 4 weekly plans');
        plan.wp.forEach((week, index) => {
            if (!week.w || week.w !== index + 1) throw new Error(`[V2 Service] Invalid week number in week ${index + 1}`);
            if (!week.fa || !Array.isArray(week.fa)) throw new Error(`[V2 Service] Missing focus areas in week ${index + 1}`);
        });
        console.log('✅ [V2 Service] Plan structure validation passed');
    }

    // Query methods (can be expanded or used by API route)
    getCustomerVisitsForDate(plan: MonthlyPlanV2, targetDate: string): string[] { /* ... as before ... */ return []; }
    getAreasForDate(plan: MonthlyPlanV2, targetDate: string): string[] { /* ... as before ... */ return []; }
    // ... other query methods ...

    clearCache() {
        this.cache.clear();
        console.log('🧹 [V2 Service] Cache cleared');
    }
}

// Example of how it might be instantiated in the API route:
// import { supabase } from '@/lib/supabase'; // Path to your Supabase client
// import { OpenAI } from 'openai';
// const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const monthlyPlanServiceV2 = new MonthlyPlanServiceV2(supabase, openaiClient);
// Then use monthlyPlanServiceV2.generateMonthlyPlanForMR(...)
// or monthlyPlanServiceV2.getMonthlyPlanFromDb(...)
