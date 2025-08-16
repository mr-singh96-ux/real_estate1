"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Calendar, Heart, Share, ChevronLeft, ChevronRight } from "lucide-react"

interface PropertyDetailsProps {
  property: {
    id: number
    title: string
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    sqft: number
    images: string[]
    type: string
    status: string
    description: string
    features: string[]
    agent: {
      name: string
      phone: string
      email: string
      avatar: string
    }
    yearBuilt: number
    lotSize: string
    propertyTax: number
    hoaFees: number
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      <Card className="overflow-hidden">
        <div className="relative">
          <img
            src={property.images[currentImageIndex] || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {property.status === "for-sale" ? "For Sale" : "For Rent"}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
              <Share className="h-4 w-4" />
            </Button>
          </div>

          {property.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Property Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
              <div className="text-sm text-muted-foreground">${Math.round(property.price / property.sqft)}/sqft</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center">
              <Bed className="h-5 w-5 mr-2 text-primary" />
              <div>
                <div className="font-semibold">{property.bedrooms}</div>
                <div className="text-sm text-muted-foreground">Bedrooms</div>
              </div>
            </div>
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-2 text-primary" />
              <div>
                <div className="font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Bathrooms</div>
              </div>
            </div>
            <div className="flex items-center">
              <Square className="h-5 w-5 mr-2 text-primary" />
              <div>
                <div className="font-semibold">{property.sqft.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Sq Ft</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <div>
                <div className="font-semibold">{property.yearBuilt}</div>
                <div className="text-sm text-muted-foreground">Year Built</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">Property Tax</div>
              <div className="font-semibold">{formatPrice(property.propertyTax)}/year</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">HOA Fees</div>
              <div className="font-semibold">
                {property.hoaFees > 0 ? `${formatPrice(property.hoaFees)}/month` : "None"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Lot Size</div>
              <div className="font-semibold">{property.lotSize}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
