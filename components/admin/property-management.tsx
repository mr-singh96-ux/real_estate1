"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, Plus, Eye, Edit, Trash2, Check, X } from "lucide-react"
import { useProperties } from "@/lib/property-store"

export function PropertyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [listingTypeFilter, setListingTypeFilter] = useState("all")
  const { properties, updateProperty, deleteProperty, addProperty, loading } = useProperties()
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    property: any | null
  }>({ open: false, property: null })
  const [deleteReason, setDeleteReason] = useState("")
  const [detailsDialog, setDetailsDialog] = useState<{
    open: boolean
    property: any | null
  }>({ open: false, property: null })
  const [addDialog, setAddDialog] = useState(false)
  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    description: "",
    listingType: "sale",
    agent: "Admin",
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading properties...</p>
          </div>
        </div>
      </div>
    )
  }

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    const matchesListingType = listingTypeFilter === "all" || property.listingType === listingTypeFilter
    return matchesSearch && matchesStatus && matchesListingType
  })

  const handleDeleteClick = (property: any) => {
    setDeleteDialog({ open: true, property })
    setDeleteReason("")
  }

  const handleDeleteConfirm = () => {
    if (deleteDialog.property) {
      deleteProperty(deleteDialog.property.id)
      console.log(
        `[v0] Property "${deleteDialog.property.title}" deleted. Reason: ${deleteReason || "No reason provided"}`,
      )
      setDeleteDialog({ open: false, property: null })
      setDeleteReason("")
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, property: null })
    setDeleteReason("")
  }

  const handleApprove = (propertyId: string) => {
    updateProperty(propertyId, { status: "approved" })
  }

  const handleReject = (propertyId: string) => {
    updateProperty(propertyId, { status: "rejected" })
  }

  const handleViewDetails = (property: any) => {
    setDetailsDialog({ open: true, property })
  }

  const handleDetailsClose = () => {
    setDetailsDialog({ open: false, property: null })
  }

  const handleAddProperty = () => {
    setAddDialog(true)
  }

  const handleSubmitProperty = () => {
    if (!newProperty.title || !newProperty.location || !newProperty.price) {
      alert("Please fill in all required fields")
      return
    }

    const property = {
      id: Date.now(),
      title: newProperty.title,
      location: newProperty.location,
      price: Number.parseInt(newProperty.price),
      type: newProperty.type,
      bedrooms: Number.parseInt(newProperty.bedrooms) || 0,
      bathrooms: Number.parseInt(newProperty.bathrooms) || 0,
      sqft: Number.parseInt(newProperty.sqft) || 0,
      description: newProperty.description,
      listingType: newProperty.listingType as "sale" | "rent",
      status: "approved" as const,
      agent: "Admin",
      dateAdded: new Date().toISOString().split("T")[0],
      image: "/modern-property.png",
    }

    addProperty(property)
    setAddDialog(false)
    setNewProperty({
      title: "",
      location: "",
      price: "",
      type: "",
      bedrooms: "",
      bathrooms: "",
      sqft: "",
      description: "",
      listingType: "sale",
      agent: "Admin",
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
          <p className="text-muted-foreground">Manage and review property listings</p>
        </div>
        <Button onClick={handleAddProperty}>
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={listingTypeFilter} onValueChange={setListingTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Properties ({filteredProperties.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {properties.length === 0
                  ? "No properties found. Dealers can add properties from their portal."
                  : "No properties match your current filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{property.title}</h4>
                      <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                      {property.listingType && (
                        <Badge variant="outline" className="text-xs">
                          {property.listingType === "rent" ? "Rental" : "Sale"}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <div>Location: {property.location}</div>
                      <div>Price: {formatPrice(property.price)}</div>
                      <div>Agent: {property.agent}</div>
                      <div>Added: {property.dateAdded}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {property.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 hover:text-green-700 bg-transparent"
                          onClick={() => handleApprove(property.id.toString())}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleReject(property.id.toString())}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(property)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => handleDeleteClick(property)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && handleDeleteCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteDialog.property?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="delete-reason">Reason for deletion (optional)</Label>
              <Textarea
                id="delete-reason"
                placeholder="e.g., Fake listing, Duplicate property, Inappropriate content..."
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Property Details Dialog */}
      <Dialog open={detailsDialog.open} onOpenChange={(open) => !open && handleDetailsClose()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
            <DialogDescription>Complete information for {detailsDialog.property?.title}</DialogDescription>
          </DialogHeader>
          {detailsDialog.property && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-semibold">Title</Label>
                  <p>{detailsDialog.property.title}</p>
                </div>
                <div>
                  <Label className="font-semibold">Price</Label>
                  <p>{formatPrice(detailsDialog.property.price)}</p>
                </div>
                <div>
                  <Label className="font-semibold">Location</Label>
                  <p>{detailsDialog.property.location}</p>
                </div>
                <div>
                  <Label className="font-semibold">Type</Label>
                  <p className="capitalize">{detailsDialog.property.type}</p>
                </div>
                {detailsDialog.property.listingType && (
                  <div>
                    <Label className="font-semibold">Listing Type</Label>
                    <p className="capitalize">
                      {detailsDialog.property.listingType === "rent" ? "For Rent" : "For Sale"}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="font-semibold">Bedrooms</Label>
                  <p>{detailsDialog.property.bedrooms}</p>
                </div>
                <div>
                  <Label className="font-semibold">Bathrooms</Label>
                  <p>{detailsDialog.property.bathrooms}</p>
                </div>
                <div>
                  <Label className="font-semibold">Square Feet</Label>
                  <p>{detailsDialog.property.sqft?.toLocaleString() || "N/A"}</p>
                </div>
                <div>
                  <Label className="font-semibold">Agent</Label>
                  <p>{detailsDialog.property.agent}</p>
                </div>
              </div>
              {detailsDialog.property.description && (
                <div>
                  <Label className="font-semibold">Description</Label>
                  <p className="mt-1">{detailsDialog.property.description}</p>
                </div>
              )}
              {detailsDialog.property.image && (
                <div>
                  <Label className="font-semibold">Property Image</Label>
                  <div className="mt-2">
                    {typeof detailsDialog.property.image === "string" ? (
                      <img
                        src={detailsDialog.property.image || "/placeholder.svg"}
                        alt={detailsDialog.property.title}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "/diverse-property-showcase.png"
                        }}
                      />
                    ) : detailsDialog.property.image instanceof File ? (
                      <img
                        src={URL.createObjectURL(detailsDialog.property.image) || "/placeholder.svg"}
                        alt={detailsDialog.property.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">No image available</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleDetailsClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Property Dialog */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>Create a new property listing</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newProperty.title}
                  onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                  placeholder="Property title"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newProperty.location}
                  onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                  placeholder="City, State"
                />
              </div>
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProperty.price}
                  onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                  placeholder="450000"
                />
              </div>
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={newProperty.type}
                  onValueChange={(value) => setNewProperty({ ...newProperty, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={newProperty.bedrooms}
                  onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={newProperty.bathrooms}
                  onChange={(e) => setNewProperty({ ...newProperty, bathrooms: e.target.value })}
                  placeholder="1"
                />
              </div>
              <div>
                <Label htmlFor="sqft">Square Feet</Label>
                <Input
                  id="sqft"
                  type="number"
                  value={newProperty.sqft}
                  onChange={(e) => setNewProperty({ ...newProperty, sqft: e.target.value })}
                  placeholder="1200"
                />
              </div>
              <div>
                <Label htmlFor="listingType">Listing Type</Label>
                <Select
                  value={newProperty.listingType}
                  onValueChange={(value) => setNewProperty({ ...newProperty, listingType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProperty.description}
                onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                placeholder="Property description..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitProperty}>Add Property</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
