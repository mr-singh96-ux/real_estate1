"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Eye, Edit, Trash2, Mail, Phone, Building, TrendingUp, Calendar } from "lucide-react"

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "(206) 555-0123",
    role: "customer",
    status: "active",
    joinDate: "2024-01-10",
    avatar: "/user-avatar-1.png",
    propertiesViewed: 15,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@estatehub.com",
    phone: "(206) 555-0456",
    role: "agent",
    status: "active",
    joinDate: "2023-12-15",
    avatar: "/professional-woman-realtor.png",
    propertiesViewed: 0,
    dealerDetails: {
      propertiesListed: 12,
      propertiesSold: 8,
      totalRevenue: "$2,450,000",
      avgPropertyPrice: "$306,250",
      rating: 4.8,
      reviews: 24,
      specialization: "Luxury Homes",
      licenseNumber: "RE-2023-4567",
      yearsExperience: 5,
    },
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@estatehub.com",
    phone: "(425) 555-0789",
    role: "agent",
    status: "active",
    joinDate: "2023-11-20",
    avatar: "/professional-realtor.png",
    propertiesViewed: 0,
    dealerDetails: {
      propertiesListed: 18,
      propertiesSold: 15,
      totalRevenue: "$3,750,000",
      avgPropertyPrice: "$250,000",
      rating: 4.9,
      reviews: 31,
      specialization: "Commercial Properties",
      licenseNumber: "RE-2023-1234",
      yearsExperience: 8,
    },
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(206) 555-0321",
    role: "customer",
    status: "inactive",
    joinDate: "2024-01-05",
    avatar: "/user-avatar-2.png",
    propertiesViewed: 8,
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "agent":
        return "bg-blue-100 text-blue-800"
      case "customer":
        return "bg-green-100 text-green-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage users, agents, and administrators</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{user.name}</h4>
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {user.phone}
                      </div>
                      <div>Joined: {user.joinDate}</div>
                    </div>
                    {user.role === "customer" && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Properties viewed: {user.propertiesViewed}
                      </div>
                    )}
                    {user.role === "agent" && user.dealerDetails && (
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>Listed: {user.dealerDetails.propertiesListed}</span>
                        <span>Sold: {user.dealerDetails.propertiesSold}</span>
                        <span>Revenue: {user.dealerDetails.totalRevenue}</span>
                        <span>Rating: ⭐ {user.dealerDetails.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>User Details - {user.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-xl font-semibold">{user.name}</h3>
                            <div className="flex gap-2 mt-1">
                              <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Contact Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                {user.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                {user.phone}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                Joined: {user.joinDate}
                              </div>
                            </div>
                          </div>

                          {user.role === "agent" && user.dealerDetails && (
                            <div>
                              <h4 className="font-medium mb-2">Dealer Performance</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center">
                                  <Building className="h-4 w-4 mr-2" />
                                  {user.dealerDetails.specialization}
                                </div>
                                <div className="flex items-center">
                                  <TrendingUp className="h-4 w-4 mr-2" />
                                  {user.dealerDetails.yearsExperience} years experience
                                </div>
                                <div>License: {user.dealerDetails.licenseNumber}</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {user.role === "agent" && user.dealerDetails && (
                          <div>
                            <h4 className="font-medium mb-3">Performance Metrics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <Card>
                                <CardContent className="p-3 text-center">
                                  <div className="text-2xl font-bold text-emerald-600">
                                    {user.dealerDetails.propertiesListed}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Properties Listed</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-3 text-center">
                                  <div className="text-2xl font-bold text-blue-600">
                                    {user.dealerDetails.propertiesSold}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Properties Sold</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-3 text-center">
                                  <div className="text-2xl font-bold text-purple-600">
                                    {user.dealerDetails.totalRevenue}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Total Revenue</div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="p-3 text-center">
                                  <div className="text-2xl font-bold text-orange-600">
                                    ⭐ {user.dealerDetails.rating}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {user.dealerDetails.reviews} Reviews
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
