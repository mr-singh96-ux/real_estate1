"use client"

import { PropertyDetails } from "@/components/property-details"
import { PropertyChat } from "@/components/property-chat"
import { Header } from "@/components/header"
import { notFound } from "next/navigation"
import { useProperties } from "@/lib/property-store"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { properties } = useProperties()
  const property = properties.find((p) => p.id === Number.parseInt(params.id))

  if (!property) {
    notFound()
  }

  const enhancedProperty = {
    ...property,
    images: [
      "/modern-apartment.png",
      "/modern-apartment-kitchen.png",
      "/cozy-apartment-bedroom.png",
      "/luxury-home-interior.png",
    ],
    sqft: property.type === "apartment" ? 1200 : 2400,
    features: [
      "Floor-to-ceiling windows",
      "Hardwood floors",
      "In-unit laundry",
      "Balcony with city views",
      "Stainless steel appliances",
      "Walk-in closet",
      "Parking space included",
      "Pet-friendly",
    ],
    agent: {
      name: property.agent,
      phone: "(206) 555-0123",
      email: "agent@estatehub.com",
      avatar: "/professional-woman-realtor.png",
    },
    yearBuilt: 2018,
    lotSize: property.type === "house" ? "0.25 acres" : "N/A",
    propertyTax: 4500,
    hoaFees: property.type === "condo" ? 250 : 0,
    bedrooms: property.bedrooms || 2,
    bathrooms: property.bathrooms || 2,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyDetails property={enhancedProperty} />
          </div>
          <div className="lg:col-span-1">
            <PropertyChat property={enhancedProperty} />
          </div>
        </div>
      </main>
    </div>
  )
}
