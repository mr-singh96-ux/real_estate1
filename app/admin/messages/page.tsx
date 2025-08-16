// app/admin/messages/page.tsx
"use client"

import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Clock, Reply } from "lucide-react"
import { useAnalytics } from "@/lib/analytics-store"

interface Message {
  id: string
  from: string
  subject: string
  message: string
  property: string
  status: "unread" | "replied" | "read"
  time: string
}

export default function AdminMessagesPage() {
  const { analytics } = useAnalytics()
  const messages: Message[] = analytics.messages || []

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Messages</h1>
              <p className="text-muted-foreground">
                Manage customer inquiries and communications
              </p>
            </div>

            {messages.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                  <p className="text-muted-foreground">
                    Customer inquiries will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {messages.map((message) => (
                  <Card
                    key={message.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <CardTitle className="text-lg">{message.from}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {message.subject}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              message.status === "unread"
                                ? "destructive"
                                : message.status === "replied"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {message.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {message.time}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">{message.message}</p>
                      <p className="text-sm font-medium">
                        Property: {message.property}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          Mark as Read
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
