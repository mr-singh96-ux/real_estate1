"use client"

import { PropertyCard } from "@/components/property-card"
import { useProperties } from "@/lib/property-store"

interface PropertyGridProps {
  searchFilters?: {
    location: string
    propertyType: string
    priceRange: string
    bedrooms: string
  }
  activeTab?: string
}

export function PropertyGrid({ searchFilters, activeTab = "buy" }: PropertyGridProps) {
  const { properties } = useProperties()

  const filteredProperties = properties.filter((property) => {
    // Only show approved properties to customers
    if (property.status !== "approved") return false

    if (activeTab === "rent") {
      if (property.listingType !== "rent") return false
    } else if (activeTab === "buy") {
      if (property.listingType !== "sale") return false
    }

    // Apply search filters if provided
    if (searchFilters) {
      if (searchFilters.location && !property.location.toLowerCase().includes(searchFilters.location.toLowerCase())) {
        return false
      }

      if (searchFilters.propertyType && property.type !== searchFilters.propertyType) {
        return false
      }

      if (searchFilters.priceRange) {
        const [min, max] = searchFilters.priceRange.split("-").map((p) => Number.parseInt(p.replace("+", "")))
        const propertyPrice =
          typeof property.price === "number"
            ? property.price
            : Number.parseInt(property.price.toString().replace(/[^0-9]/g, ""))
        if (max) {
          if (propertyPrice < min || propertyPrice > max) return false
        } else {
          if (propertyPrice < min) return false
        }
      }

      if (searchFilters.bedrooms) {
        const bedroomCount = Number.parseInt(searchFilters.bedrooms)
        if (searchFilters.bedrooms === "4" && property.bedrooms < 4) return false
        else if (property.bedrooms !== bedroomCount) return false
      }
    }

    return true
  })

  return (
    <div className="px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          {activeTab === "rent" ? "Available Rentals" : "Featured Properties"}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">{filteredProperties.length} properties found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <p className="text-lg sm:text-xl text-muted-foreground mb-2">No properties found</p>
          <p className="text-sm sm:text-base text-muted-foreground">
            Try adjusting your search filters to see more results
          </p>
        </div>
      )}
    </div>
  )
}
