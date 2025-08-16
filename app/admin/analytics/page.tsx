"use client";
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Eye, Users, Building, DollarSign } from "lucide-react"
import { useAnalytics } from "@/lib/analytics-store"

export default function AdminAnalyticsPage() {
  const { analytics } = useAnalytics()

  const analyticsData = [
    { title: "Page Views", value: analytics.pageViews.toString(), change: "+0%", icon: Eye },
    { title: "Property Views", value: analytics.propertyViews.toString(), change: "+0%", icon: Building },
    { title: "User Registrations", value: analytics.userRegistrations.toString(), change: "+0%", icon: Users },
    { title: "Revenue", value: `$${analytics.revenue}`, change: "+0%", icon: DollarSign },
  ]

  const topProperties: any[] = []

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
              <p className="text-muted-foreground">Track platform performance and user engagement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsData.map((item) => (
                <Card key={item.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      <span className="text-green-500">{item.change}</span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProperties.map((property, index) => (
                      <div key={property.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{property.name}</p>
                            <p className="text-sm text-muted-foreground">{property.views} views</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{property.inquiries}</p>
                          <p className="text-sm text-muted-foreground">inquiries</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                      <p>Chart visualization would go here</p>
                      <p className="text-sm">Integration with charting library needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
