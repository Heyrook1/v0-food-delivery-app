"use client"

import Link from "next/link"
import { Home, History, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { CartSheet } from "@/components/cart-sheet" // Correct: Named import
import { usePathname } from "next/navigation"

export default function BottomNavbar() {
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg md:hidden h-16 flex items-center justify-around">
        <Link href="/" passHref>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 text-xs h-auto p-1 ${isActive("/") ? "text-appRed" : "text-gray-600"}`}
          >
            <Home className="h-5 w-5" />
            Home
          </Button>
        </Link>
        <Link href="/profile" passHref>
          {" "}
          {/* Link to profile for orders for now */}
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 text-xs h-auto p-1 ${isActive("/profile") ? "text-appRed" : "text-gray-600"}`}
          >
            <History className="h-5 w-5" />
            Orders
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 text-xs h-auto p-1 relative text-gray-600"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-appRed text-white text-xs rounded-full h-4 w-4 flex items-center justify-center -mt-1 -mr-1">
              {cart.length}
            </span>
          )}
          Cart
        </Button>
        <Link href="/profile" passHref>
          <Button
            variant="ghost"
            className={`flex flex-col items-center gap-1 text-xs h-auto p-1 ${isActive("/profile") ? "text-appRed" : "text-gray-600"}`}
          >
            <User className="h-5 w-5" />
            Profile
          </Button>
        </Link>
      </nav>
      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  )
}
