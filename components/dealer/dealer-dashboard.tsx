"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building, Plus, Upload, MapPin, DollarSign, Home, Calendar, X, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useProperties } from "@/lib/property-store"

export function DealerDashboard() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [listingType, setListingType] = useState<"sale" | "rent">("sale")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [removeDialog, setRemoveDialog] = useState<{ open: boolean; propertyId: string | null; propertyTitle: string }>(
    {
      open: false,
      propertyId: null,
      propertyTitle: "",
    },
  )
  const { properties, addProperty, deleteProperty } = useProperties()

  const dealerProperties = properties.filter((p) => p.agent === "Current Dealer")

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedImages(files)

    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setSelectedImages(newImages)
    setImagePreviews(newPreviews)
  }

  const triggerFileInput = () => {
    document.getElementById("images")?.click()
  }

  const handleSubmitProperty = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const mainImage = imagePreviews.length > 0 ? imagePreviews[0] : "/diverse-property-showcase.png"

    const priceValue = Number(formData.get("price") as string)

    const newProperty = {
      title: formData.get("title") as string,
      price: priceValue,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      listingType: listingType,
      status: "pending" as const,
      agent: "Current Dealer",
      dateAdded: new Date().toISOString().split("T")[0],
      bedrooms: Number(formData.get("bedrooms") as string),
      bathrooms: Number(formData.get("bathrooms") as string),
      description: formData.get("description") as string,
      image: mainImage,
      sqft: Number(formData.get("sqft") as string),
    }

    addProperty(newProperty)
    ;(e.target as HTMLFormElement).reset()
    setShowAddForm(false)
    setSelectedImages([])
    setImagePreviews([])
    setListingType("sale")
    setShowSuccessMessage(true)

    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleRemoveProperty = (propertyId: string, propertyTitle: string) => {
    setRemoveDialog({
      open: true,
      propertyId,
      propertyTitle,
    })
  }

  const confirmRemoveProperty = () => {
    if (removeDialog.propertyId) {
      deleteProperty(removeDialog.propertyId)
      setRemoveDialog({ open: false, propertyId: null, propertyTitle: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-emerald-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dealer Portal</h1>
                <p className="text-sm text-gray-600">Manage your property listings</p>
              </div>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Property added successfully! It's now pending admin approval.</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Home className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-2xl font-bold text-gray-900">{dealerProperties.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dealerProperties.filter((p) => p.status === "pending").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dealerProperties.filter((p) => p.status === "approved").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                  <p className="text-2xl font-bold text-gray-900">$550K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Property Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Property</CardTitle>
              <CardDescription>Fill in the details to list your property</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProperty} className="space-y-6">
                <div className="space-y-2">
                  <Label>Listing Type</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={listingType === "sale" ? "default" : "outline"}
                      onClick={() => setListingType("sale")}
                      className="flex-1"
                    >
                      For Sale
                    </Button>
                    <Button
                      type="button"
                      variant={listingType === "rent" ? "default" : "outline"}
                      onClick={() => setListingType("rent")}
                      className="flex-1"
                    >
                      For Rent
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Property Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Modern Downtown Apartment" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">{listingType === "rent" ? "Monthly Rent ($)" : "Sale Price ($)"}</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder={listingType === "rent" ? "2500" : "450000"}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="e.g., Downtown, NYC" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Property Type</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apartment">Apartment</SelectItem>
                        <SelectItem value="House">House</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                        <SelectItem value="Villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select name="bedrooms">
                      <SelectTrigger>
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select name="bathrooms">
                      <SelectTrigger>
                        <SelectValue placeholder="Select bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="3">3+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Square Footage</Label>
                    <Input id="sqft" name="sqft" type="number" placeholder="1200" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Describe your property..." rows={4} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Property Images</Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-500 transition-colors"
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop images</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    <Input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeImage(index)
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    Submit Property
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Properties List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Properties</CardTitle>
            <CardDescription>Manage your listed properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dealerProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Home className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{property.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {property.price}
                        </span>
                        <span>{property.type}</span>
                        {property.listingType && (
                          <Badge variant="secondary" className="text-xs">
                            {property.listingType === "rent" ? "Rental" : "Sale"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={property.status === "approved" ? "default" : "secondary"}
                      className={
                        property.status === "approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {property.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{property.dateAdded}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveProperty(property.id, property.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation dialog for property removal */}
      <AlertDialog open={removeDialog.open} onOpenChange={(open) => setRemoveDialog({ ...removeDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{removeDialog.propertyTitle}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveProperty} className="bg-red-600 hover:bg-red-700">
              Remove Property
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
