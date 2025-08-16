import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import Link from "next/link"

interface Property {
  id: number
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  image: string | File
  type: string
  status: string
  listingType?: "sale" | "rent" // Added listingType property
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const getImageSrc = (image: any) => {
    if (!image) return "/placeholder.svg"

    // If it's a File object, create a blob URL
    if (image instanceof File) {
      return URL.createObjectURL(image)
    }

    // If it's already a string (URL or path), use it directly
    if (typeof image === "string") {
      return image
    }

    // Fallback to placeholder
    return "/placeholder.svg"
  }

  const formatPrice = (price: number, listingType?: "sale" | "rent") => {
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)

    return listingType === "rent" ? `${formattedPrice}/month` : formattedPrice
  }

  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 group border-0 bg-card/80 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <img
          src={getImageSrc(property.image) || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-primary text-primary-foreground shadow-lg font-semibold px-3 py-1">
            {property.listingType === "rent" ? "For Rent" : "For Sale"}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white hover:text-primary shadow-lg backdrop-blur-sm"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-2 text-accent" />
            {property.location}
          </div>
        </div>

        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          {formatPrice(Number(property.price), property.listingType)}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 bg-muted/50 rounded-lg p-3">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">{property.sqft ? property.sqft.toLocaleString() : "N/A"} sqft</span>
          </div>
        </div>

        <Link href={`/property/${property.id}`}>
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
