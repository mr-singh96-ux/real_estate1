"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "./supabase/client"

interface AnalyticsData {
  pageViews: number
  propertyViews: number
  userRegistrations: number
  revenue: number
  messages: any[]
}

interface AnalyticsContextType {
  analytics: AnalyticsData
  incrementPageViews: () => Promise<void>
  incrementPropertyViews: () => Promise<void>
  incrementUserRegistrations: () => Promise<void>
  addRevenue: (amount: number) => Promise<void>
  addMessage: (message: any) => Promise<void>
  loading: boolean
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 0,
    propertyViews: 0,
    userRegistrations: 0,
    revenue: 0,
    messages: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      // Load analytics data
      const { data: analyticsData, error: analyticsError } = await supabase.from("analytics").select("*").single()

      if (analyticsError && analyticsError.code !== "PGRST116") {
        console.error("Error loading analytics:", analyticsError)
      }

      // Load messages data
      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (messagesError) {
        console.error("Error loading messages:", messagesError)
      }

      setAnalytics({
        pageViews: analyticsData?.page_views || 0,
        propertyViews: analyticsData?.active_properties || 0,
        userRegistrations: analyticsData?.total_users || 0,
        revenue: 0, // Revenue calculation can be added later
        messages: messagesData || [],
      })
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const incrementPageViews = async () => {
    try {
      const { error } = await supabase.rpc("increment_page_views")

      if (error) {
        // Fallback: update directly if RPC doesn't exist
        const { data, error: selectError } = await supabase.from("analytics").select("page_views").single()

        if (!selectError && data) {
          await supabase
            .from("analytics")
            .update({ page_views: data.page_views + 1 })
            .eq("id", data.id)
        }
      }

      // Update local state
      setAnalytics((prev) => ({ ...prev, pageViews: prev.pageViews + 1 }))
    } catch (error) {
      console.error("Error incrementing page views:", error)
    }
  }

  const incrementPropertyViews = async () => {
    setAnalytics((prev) => ({ ...prev, propertyViews: prev.propertyViews + 1 }))
  }

  const incrementUserRegistrations = async () => {
    setAnalytics((prev) => ({ ...prev, userRegistrations: prev.userRegistrations + 1 }))
  }

  const addRevenue = async (amount: number) => {
    setAnalytics((prev) => ({ ...prev, revenue: prev.revenue + amount }))
  }

  const addMessage = async (message: any) => {
    try {
      const { error } = await supabase.from("messages").insert([
        {
          sender_name: message.sender_name,
          sender_email: message.sender_email,
          subject: message.subject,
          message: message.message,
          status: "unread",
        },
      ])

      if (error) {
        console.error("Error adding message:", error)
        return
      }

      // Reload analytics to get updated messages
      await loadAnalytics()
    } catch (error) {
      console.error("Error adding message:", error)
    }
  }

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        incrementPageViews,
        incrementPropertyViews,
        incrementUserRegistrations,
        addRevenue,
        addMessage,
        loading,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
