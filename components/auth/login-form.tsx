"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth/auth-context"
import { Mail, Lock, Loader2, User, Shield, Building } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (success) {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.role === "admin") {
        router.push("/admin")
      } else if (user.role === "agent") {
        router.push("/dealer")
      } else {
        router.push("/")
      }
    } else {
      setError("Invalid email or password")
    }
  }

  const quickLogin = async (email: string) => {
    setEmail(email)
    setPassword("password")
    const success = await login(email, "password")
    if (success) {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.role === "admin") {
        router.push("/admin")
      } else if (user.role === "agent") {
        router.push("/dealer")
      } else {
        router.push("/")
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">Quick Demo Login:</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin("john@example.com")}
                disabled={isLoading}
                className="flex items-center justify-start gap-2"
              >
                <User className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Customer</div>
                  <div className="text-xs text-muted-foreground">View & contact dealers</div>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin("sarah@estatehub.com")}
                disabled={isLoading}
                className="flex items-center justify-start gap-2"
              >
                <Building className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Dealer</div>
                  <div className="text-xs text-muted-foreground">Add & manage properties</div>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => quickLogin("admin@estatehub.com")}
                disabled={isLoading}
                className="flex items-center justify-start gap-2"
              >
                <Shield className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">Admin</div>
                  <div className="text-xs text-muted-foreground">Full access & management</div>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
