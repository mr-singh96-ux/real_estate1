"use client"

import { Button } from "@/components/ui/button"
import { Home, Menu, X } from "lucide-react"
import Link from "next/link"
import { UserMenu } from "@/components/auth/user-menu"
import { useState } from "react"

interface HeaderProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export function Header({ activeTab = "buy", onTabChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab)
    }
    setIsMobileMenuOpen(false) // Close mobile menu after selection
  }

  return (
    <header className="glass-effect border-b border-border/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="p-1.5 sm:p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Home className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <span className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EstateHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <button
              onClick={() => handleTabClick("buy")}
              className={`transition-all duration-300 font-medium text-base lg:text-lg hover:scale-105 ${
                activeTab === "buy"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => handleTabClick("rent")}
              className={`transition-all duration-300 font-medium text-base lg:text-lg hover:scale-105 ${
                activeTab === "rent"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Rent
            </button>
            <button
              onClick={() => handleTabClick("sell")}
              className={`transition-all duration-300 font-medium text-base lg:text-lg hover:scale-105 ${
                activeTab === "sell"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Sell
            </button>
            <button
              onClick={() => handleTabClick("about")}
              className={`transition-all duration-300 font-medium text-base lg:text-lg hover:scale-105 ${
                activeTab === "about"
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              About
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <UserMenu />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-primary/10 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col py-4 space-y-2">
              <button
                onClick={() => handleTabClick("buy")}
                className={`text-left px-4 py-3 transition-all duration-300 font-medium ${
                  activeTab === "buy"
                    ? "text-primary bg-primary/10 border-l-4 border-primary"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                Buy Properties
              </button>
              <button
                onClick={() => handleTabClick("rent")}
                className={`text-left px-4 py-3 transition-all duration-300 font-medium ${
                  activeTab === "rent"
                    ? "text-primary bg-primary/10 border-l-4 border-primary"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                Rent Properties
              </button>
              <button
                onClick={() => handleTabClick("sell")}
                className={`text-left px-4 py-3 transition-all duration-300 font-medium ${
                  activeTab === "sell"
                    ? "text-primary bg-primary/10 border-l-4 border-primary"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                Sell Property
              </button>
              <button
                onClick={() => handleTabClick("about")}
                className={`text-left px-4 py-3 transition-all duration-300 font-medium ${
                  activeTab === "about"
                    ? "text-primary bg-primary/10 border-l-4 border-primary"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                About Us
              </button>
              <div className="px-4 py-2 border-t border-border/50 mt-2">
                <UserMenu />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
