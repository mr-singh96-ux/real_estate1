"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  name: string
  email: string
  role: "customer" | "agent" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "customer",
    avatar: "/user-avatar-1.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@estatehub.com",
    role: "agent",
    avatar: "/professional-woman-realtor.png",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@estatehub.com",
    role: "admin",
    avatar: "/admin-avatar.png",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser && password === "password") {
      // Mock password check
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (name: string, email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock signup - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    const newUser: User = {
      id: mockUsers.length + 1,
      name,
      email,
      role: role as "customer" | "agent" | "admin",
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
