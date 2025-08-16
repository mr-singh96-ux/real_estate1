"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { supabase } from "./supabase/client"

export interface Property {
  id: string // Changed from number to string for UUID
  title: string
  location: string
  price: number
  status: "pending" | "approved" | "rejected"
  agent: string
  dateAdded: string
  type: string
  bedrooms: number
  bathrooms: number
  sqft: number
  image: string
  description?: string
  listingType?: "sale" | "rent" // Added listingType property
}

interface PropertyContextType {
  properties: Property[]
  addProperty: (property: Omit<Property, "id" | "dateAdded">) => Promise<void>
  updateProperty: (id: string, updates: Partial<Property>) => Promise<void>
  deleteProperty: (id: string) => Promise<void>
  loading: boolean
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const loadProperties = useCallback(async () => {
    try {
      console.log("[v0] Loading properties from Supabase...")
      const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading properties:", error)
        setProperties([])
        return
      }

      if (!data) {
        console.log("[v0] No properties data received")
        setProperties([])
        return
      }

      // Transform Supabase data to match our Property interface
      const transformedProperties = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        location: item.location,
        price: item.price,
        status: item.status,
        agent: item.dealer_name,
        dateAdded: new Date(item.created_at).toISOString().split("T")[0],
        type: item.property_type,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        sqft: item.sqft,
        image: item.image_url || "/modern-house.png",
        description: item.description,
        listingType: item.listing_type,
      }))

      console.log("[v0] Loaded", transformedProperties.length, "properties")
      setProperties(transformedProperties)
    } catch (error) {
      console.error("Error loading properties:", error)
      setProperties([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial load
    loadProperties()

    // Set up real-time subscription
    const subscription = supabase
      .channel("properties_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "properties" }, (payload) => {
        console.log("[v0] Real-time change detected:", payload.eventType)
        // Reload properties when any change occurs
        loadProperties()
      })
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [loadProperties])

  const addProperty = async (property: Omit<Property, "id" | "dateAdded">) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .insert([
          {
            title: property.title,
            description: property.description,
            price: property.price,
            location: property.location,
            property_type: property.type,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            sqft: property.sqft,
            listing_type: property.listingType || "sale",
            status: "pending",
            dealer_name: property.agent,
            image_url: property.image,
          },
        ])
        .select()

      if (error) {
        console.error("Error adding property:", error)
        return
      }

      console.log("[v0] Property added successfully")
    } catch (error) {
      console.error("Error adding property:", error)
    }
  }

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const { error } = await supabase
        .from("properties")
        .update({
          title: updates.title,
          description: updates.description,
          price: updates.price,
          location: updates.location,
          property_type: updates.type,
          bedrooms: updates.bedrooms,
          bathrooms: updates.bathrooms,
          sqft: updates.sqft,
          listing_type: updates.listingType,
          status: updates.status,
          dealer_name: updates.agent,
          image_url: updates.image,
        })
        .eq("id", id)

      if (error) {
        console.error("Error updating property:", error)
        return
      }

      console.log("[v0] Property updated successfully")
    } catch (error) {
      console.error("Error updating property:", error)
    }
  }

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase.from("properties").delete().eq("id", id)

      if (error) {
        console.error("Error deleting property:", error)
        return
      }

      console.log("[v0] Property deleted successfully")
    } catch (error) {
      console.error("Error deleting property:", error)
    }
  }

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty, loading }}>
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperty() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider")
  }
  return context
}

// Keep the original export for backward compatibility
export function useProperties() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertyProvider")
  }
  return context
}
