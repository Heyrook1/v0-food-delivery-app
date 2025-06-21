import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Search } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Image src="/logo.png" alt="4 Deals Meals Logo" width={120} height={32} className="h-8 w-auto" />
          <span className="sr-only">4 Deals Meals</span>
        </Link>
        <div className="relative flex-1 max-w-md mx-4 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for restaurants or dishes..."
            className="w-full pl-9 pr-4 rounded-full bg-gray-100 border-none focus-visible:ring-appRed"
          />
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
