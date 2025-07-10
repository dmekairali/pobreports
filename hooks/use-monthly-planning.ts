"use client"

import { useState, useCallback } from "react"
import { MonthlyPlanningAPI, type MonthlyPlanRequest, type MonthlyPlanResponse } from "@/lib/monthly-planning-api"

export interface UseMonthlyPlanningReturn {
  plan: MonthlyPlanResponse["plan"] | null
  isLoading: boolean
  error: string | null
  threadId: string | null
  generatePlan: (request: MonthlyPlanRequest) => Promise<void>
  reviseWeeklyPlan: (weekNumber: number, actualPerformance: any, reason: string) => Promise<void>
  updateDailyPlan: (actualPerformance: any) => Promise<void>
  monthlyReview: (monthlyPerformance: any) => Promise<void>
  clearError: () => void
  resetPlan: () => void
}

export function useMonthlyPlanning(): UseMonthlyPlanningReturn {
  const [plan, setPlan] = useState<MonthlyPlanResponse["plan"] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [threadId, setThreadId] = useState<string | null>(null)

  const api = new MonthlyPlanningAPI()

  const generatePlan = useCallback(async (request: MonthlyPlanRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log("🚀 Starting plan generation...", request)
      const response = await api.generateMonthlyPlan(request)

      if (response.success && response.plan) {
        setPlan(response.plan)
        setThreadId(response.thread_id || null)
        console.log("✅ Plan generated successfully")
      } else {
        throw new Error(response.error || "Failed to generate plan")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      console.error("❌ Plan generation failed:", errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reviseWeeklyPlan = useCallback(
    async (weekNumber: number, actualPerformance: any, reason: string) => {
      if (!threadId) {
        setError("No active plan thread found")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await api.reviseWeeklyPlan(threadId, weekNumber, actualPerformance, reason)

        if (response.success && response.plan) {
          setPlan(response.plan)
          console.log("✅ Weekly plan revised successfully")
        } else {
          throw new Error(response.error || "Failed to revise weekly plan")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
        setError(errorMessage)
        console.error("❌ Weekly revision failed:", errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [threadId],
  )

  const updateDailyPlan = useCallback(
    async (actualPerformance: any) => {
      if (!threadId) {
        setError("No active plan thread found")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await api.updateDailyPlan(threadId, actualPerformance)

        if (response.success && response.plan) {
          setPlan(response.plan)
          console.log("✅ Daily plan updated successfully")
        } else {
          throw new Error(response.error || "Failed to update daily plan")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
        setError(errorMessage)
        console.error("❌ Daily update failed:", errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [threadId],
  )

  const monthlyReview = useCallback(
    async (monthlyPerformance: any) => {
      if (!threadId) {
        setError("No active plan thread found")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await api.monthlyReview(threadId, monthlyPerformance)

        if (response.success && response.plan) {
          setPlan(response.plan)
          console.log("✅ Monthly review completed successfully")
        } else {
          throw new Error(response.error || "Failed to complete monthly review")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
        setError(errorMessage)
        console.error("❌ Monthly review failed:", errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [threadId],
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const resetPlan = useCallback(() => {
    setPlan(null)
    setThreadId(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    plan,
    isLoading,
    error,
    threadId,
    generatePlan,
    reviseWeeklyPlan,
    updateDailyPlan,
    monthlyReview,
    clearError,
    resetPlan,
  }
}
