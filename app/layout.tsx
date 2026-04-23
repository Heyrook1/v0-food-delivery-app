import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ModernNavbar } from "@/components/modern-navbar" // Named import
import { CartProvider } from "@/context/cart-context" // Named import
import { AuthProvider } from "@/components/auth-provider" // Named import
import BottomNavbar from "@/components/bottom-navbar" // Default import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "4 Deals Meals",
  description: "Your favorite food, delivered fast!",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <ModernNavbar />
            <main className="pb-16 md:pb-0">{children}</main>
            <BottomNavbar />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
