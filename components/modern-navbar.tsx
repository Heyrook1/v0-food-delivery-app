"use client"

import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, LogOut, User } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Named imports
import { useSession } from "@supabase/auth-helpers-react"
import { createClient } from "@/lib/supabase/client"

export function ModernNavbar() {
  // Named export
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const session = useSession()
  const isAuthenticated = !!session?.user

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src="/logo.png" alt="4 Deals Meals Logo" width={120} height={32} className="h-8 w-auto" />
          <span className="sr-only">4 Deals Meals</span>
        </Link>

        {/* Desktop Search */}
        <div className="relative flex-1 max-w-md mx-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for restaurants or dishes..."
            className="w-full pl-9 pr-4 rounded-full bg-gray-100 border-none focus-visible:ring-appRed"
          />
        </div>

        {/* Desktop Nav Icons */}
        <nav className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/profile" passHref>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          ) : (
            <Link href="/login" passHref>
              <Button variant="ghost" className="rounded-full">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Trigger (visible only on mobile) */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center gap-2" prefetch={false} onClick={() => setIsMenuOpen(false)}>
                <Image src="/logo.png" alt="4 Deals Meals Logo" width={100} height={28} className="h-7 w-auto" />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 pr-4 rounded-full bg-gray-100 border-none focus-visible:ring-appRed"
              />
            </div>
            <nav className="flex flex-col gap-2">
              <Link href="/" passHref>
                <Button variant="ghost" className="w-full justify-start text-lg" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Button>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/profile" passHref>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-2 h-5 w-5" /> Profile
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" passHref>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" passHref>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
