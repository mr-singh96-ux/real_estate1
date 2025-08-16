import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, MessageSquare, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { useProperties } from "@/hooks/useProperties" // Assuming useProperties is a custom hook to fetch property data

export function AdminOverview() {
  const { properties } = useProperties()

  // Calculate real statistics from property data
  const approvedProperties = properties.filter((p) => p.status === "approved")
  const pendingProperties = properties.filter((p) => p.status === "pending")
  const totalRevenue = approvedProperties.reduce((sum, p) => sum + (p.price || 0), 0)

  const stats = [
    {
      title: "Active Properties",
      value: approvedProperties.length.toString(),
      change: "+12%",
      trend: "up",
      icon: Building,
    },
    {
      title: "Pending Approval",
      value: pendingProperties.length.toString(),
      change: "+8%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Messages Today",
      value: "89",
      change: "-3%",
      trend: "down",
      icon: MessageSquare,
    },
    {
      title: "Total Value",
      value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
      change: "+15%",
      trend: "up",
      icon: DollarSign,
    },
  ]

  const recentProperties = properties
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 4)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Property Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProperties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{property.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${property.price?.toLocaleString()}
                    {property.listingType === "rent" ? "/month" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      property.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : property.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
