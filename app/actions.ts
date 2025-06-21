"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server" // Import server-side Supabase client
import type { Order, CartItem, User } from "@/lib/data" // Keep types
import { mockUser } from "@/lib/data" // Keep mockUser for order history simulation

// --- Supabase Auth Actions ---

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error.message)
    return { success: false, message: error.message }
  }

  redirect("/profile") // Redirect to profile on successful login
}

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string // Supabase auth doesn't directly store name on signup
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name, // Store name in user_metadata
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"}/auth/callback`, // For email confirmation
    },
  })

  if (error) {
    console.error("Signup error:", error.message)
    return { success: false, message: error.message }
  }

  return {
    success: true,
    message: "Account created successfully! Please check your email to confirm your account, then log in.",
  }
}

export async function logoutAction() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Logout error:", error.message)
    return { success: false, message: error.message }
  }

  redirect("/login") // Redirect to login after logout
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    // In a real app, you'd fetch user details from your database
    // For now, we'll combine Supabase user data with mockUser's orders/cart
    return {
      id: user.id,
      name: user.user_metadata.full_name || user.email || "User",
      email: user.email!,
      address: mockUser.address, // Keep mock address for now
      cart: mockUser.cart, // Keep mock cart for now
      orders: mockUser.orders, // Keep mock orders for now
    }
  }
  return null
}

// --- Order Placement Action (remains largely the same, but uses mockUser for now) ---

interface PlaceOrderState {
  success: boolean
  message: string
  orderId?: string
}

export async function placeOrderAction(
  prevState: PlaceOrderState | null,
  formData: FormData,
): Promise<PlaceOrderState> {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

  const deliveryAddress = formData.get("deliveryAddress") as string
  const paymentMethod = formData.get("paymentMethod") as string
  const cartItemsJson = formData.get("cartItems") as string
  const subtotal = Number.parseFloat(formData.get("subtotal") as string)
  const deliveryFee = Number.parseFloat(formData.get("deliveryFee") as string)
  const total = Number.parseFloat(formData.get("total") as string)
  const restaurantId = formData.get("restaurantId") as string
  const restaurantName = formData.get("restaurantName") as string

  if (!deliveryAddress || !paymentMethod || !cartItemsJson || !restaurantId || !restaurantName) {
    return { success: false, message: "Missing required order details." }
  }

  let cartItems: CartItem[]
  try {
    cartItems = JSON.parse(cartItemsJson)
  } catch (error) {
    return { success: false, message: "Invalid cart items data." }
  }

  if (cartItems.length === 0) {
    return { success: false, message: "Cart is empty." }
  }

  // In a real app, you'd get the actual logged-in user's ID here
  const currentUser = await getCurrentUser()
  const userId = currentUser?.id || "anonymous" // Fallback for unauthenticated orders

  // Simulate saving the order to mockUser's orders
  const newOrderId = `order-${Date.now()}`
  const newOrder: Order = {
    id: newOrderId,
    userId: userId,
    restaurantId,
    restaurantName,
    items: cartItems,
    subtotal,
    deliveryFee,
    total,
    status: "Confirmed", // Initial status
    deliveryAddress,
    paymentMethod,
    createdAt: new Date().toISOString(),
  }

  // For demonstration, we'll still add to mockUser's orders
  // In a real app, this would be a database insert
  mockUser.orders.unshift(newOrder)
  mockUser.cart = [] // Clear user's cart after placing order

  console.log("Order placed:", newOrder)

  redirect(`/order-confirmation/${newOrderId}`)
}
