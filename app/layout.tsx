import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ModernNavbar } from "@/components/modern-navbar" // Correct: Named import
import { CartProvider } from "@/context/cart-context" // Correct: Named import
import { AuthProvider } from "@/components/auth-provider" // Correct: Named import
import BottomNavbar from "@/components/bottom-navbar" // Correct: Default import

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "4 Deals Meals",
  description: "Your favorite food, delivered fast!",
    generator: 'v0.dev'
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
            <main className="pb-16 md:pb-0">
              {" "}
              {/* Add padding-bottom for mobile */}
              {children}
            </main>
            <BottomNavbar /> {/* Render BottomNavbar */}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
