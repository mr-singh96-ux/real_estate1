"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Mail } from "lucide-react"

interface PropertyChatProps {
  property: {
    agent: {
      name: string
      phone: string
      email: string
      avatar: string
    }
  }
}

interface Message {
  id: number
  sender: "user" | "agent"
  message: string
  timestamp: Date
}

export function PropertyChat({ property }: PropertyChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "agent",
      message: "Hi! I'm Sarah, your agent for this property. How can I help you today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: "user",
      message: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: Message = {
        id: messages.length + 2,
        sender: "agent",
        message: "Thanks for your message! I'll get back to you shortly with more information.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentResponse])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      {/* Agent Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Agent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={property.agent.avatar || "/placeholder.svg"} alt={property.agent.name} />
              <AvatarFallback>
                {property.agent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{property.agent.name}</div>
              <div className="text-sm text-muted-foreground">Licensed Real Estate Agent</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 text-primary" />
              {property.agent.phone}
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              {property.agent.email}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Live Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  <div className="text-sm">{message.message}</div>
                  <div className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Schedule a Tour
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Request More Info
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Get Pre-Approved
          </Button>
          <Button className="w-full">Make an Offer</Button>
        </CardContent>
      </Card>
    </div>
  )
}
