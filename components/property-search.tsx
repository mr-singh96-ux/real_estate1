"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Search, MapPin, DollarSign, Home, Bed } from "lucide-react"

interface PropertySearchProps {
  onFiltersChange?: (filters: {
    location: string
    propertyType: string
    priceRange: string
    bedrooms: string
  }) => void
}

export function PropertySearch({ onFiltersChange }: PropertySearchProps) {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
    bedrooms: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleSearch = () => {
    onFiltersChange?.(filters)
  }

  return (
    <Card className="p-4 sm:p-6 lg:p-8 mb-8 lg:mb-12 shadow-2xl border-0 bg-gradient-to-br from-card/90 to-background/90 backdrop-blur-sm mx-4 sm:mx-0">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Find Your Dream Property
        </h2>
        <p className="text-center text-muted-foreground mt-2 text-sm sm:text-base px-2">
          Search through thousands of properties to find your perfect home
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <MapPin className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-primary z-10" />
          <Input
            placeholder="Enter location..."
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="pl-10 sm:pl-12 h-10 sm:h-12 border-2 border-border/50 focus:border-primary bg-background/80 backdrop-blur-sm text-sm sm:text-base"
          />
        </div>

        <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
          <SelectTrigger className="h-10 sm:h-12 border-2 border-border/50 focus:border-primary bg-background/80 backdrop-blur-sm text-sm sm:text-base">
            <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
          <SelectTrigger className="h-10 sm:h-12 border-2 border-border/50 focus:border-primary bg-background/80 backdrop-blur-sm text-sm sm:text-base">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-200000">$0 - $200k</SelectItem>
            <SelectItem value="200000-400000">$200k - $400k</SelectItem>
            <SelectItem value="400000-600000">$400k - $600k</SelectItem>
            <SelectItem value="600000-800000">$600k - $800k</SelectItem>
            <SelectItem value="800000+">$800k+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange("bedrooms", value)}>
          <SelectTrigger className="h-10 sm:h-12 border-2 border-border/50 focus:border-primary bg-background/80 backdrop-blur-sm text-sm sm:text-base">
            <Bed className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
            <SelectValue placeholder="Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3 Bedrooms</SelectItem>
            <SelectItem value="4">4+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleSearch}
          className="w-full h-10 sm:h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base sm:col-span-2 lg:col-span-1"
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Search Properties
        </Button>
      </div>
    </Card>
  )
}
