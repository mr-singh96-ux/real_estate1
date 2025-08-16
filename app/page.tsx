"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PropertySearch } from "@/components/property-search"
import { PropertyGrid } from "@/components/property-grid"

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
    bedrooms: "",
  })
  const [activeTab, setActiveTab] = useState("buy")

  const handleFiltersChange = (filters: typeof searchFilters) => {
    setSearchFilters(filters)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 px-2">
            {activeTab === "buy" && "Find Your Dream Home"}
            {activeTab === "rent" && "Find Your Perfect Rental"}
            {activeTab === "sell" && "Sell Your Property"}
            {activeTab === "about" && "About Our Real Estate Platform"}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            {activeTab === "buy" &&
              "Discover the perfect property with our comprehensive search tools and expert guidance"}
            {activeTab === "rent" && "Browse through premium rental properties in your desired location"}
            {activeTab === "sell" && "Get the best value for your property with our expert real estate services"}
            {activeTab === "about" && "Learn more about our mission to connect buyers, sellers, and renters"}
          </p>
        </div>

        {(activeTab === "buy" || activeTab === "rent") && (
          <>
            <PropertySearch onFiltersChange={handleFiltersChange} />
            <PropertyGrid searchFilters={searchFilters} activeTab={activeTab} />
          </>
        )}

        {activeTab === "sell" && (
          <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Sell Your Property?</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Contact our expert agents to get started with a free property valuation
            </p>
            <button className="bg-primary text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto max-w-xs">
              Get Free Valuation
            </button>
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-4xl mx-auto py-12 sm:py-16 lg:py-20 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">About Our Platform</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">For Buyers & Renters</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Find your perfect home with our advanced search tools and comprehensive property listings.
                </p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">For Property Dealers</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  List your properties and connect with qualified buyers and renters through our platform.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
