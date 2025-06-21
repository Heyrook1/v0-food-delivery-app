"use server"

import { createClient } from "@/lib/supabase/server"
import { v4 as uuid } from "uuid"

/**
 * Common return type for all actions.
 */
type ActionResult = {
  success: boolean
  message: string
}

/**
 * LOGIN  --------------------------------------------------------------------
 * Called by <LoginForm /> via `useActionState`.
 */
export async function loginAction(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  "use server"

  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")

  if (!email || !password) {
    return { success: false, message: "Email & password are required." }
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { success: false, message: error.message }
  }

  return {
    success: true,
    message: "Logged in successfully. Redirecting…",
  }
}

/**
 * SIGN-UP  -------------------------------------------------------------------
 * Called by <SignupForm /> via `useActionState`.
 */
export async function signupAction(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  "use server"

  const name = String(formData.get("name") || "")
  const email = String(formData.get("email") || "")
  const password = String(formData.get("password") || "")

  if (!name || !email || !password) {
    return { success: false, message: "All fields are required." }
  }

  const supabase = createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  })

  if (error) {
    return { success: false, message: error.message }
  }

  return {
    success: true,
    message: "Account created! Please check your email to confirm.",
  }
}

/**
 * PLACE ORDER  ---------------------------------------------------------------
 * Called by <CheckoutForm /> via `useActionState`.
 * NOTE: A real implementation would persist the order in your database.
 */
export async function placeOrderAction(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  "use server"

  // Extract basic order info (sent from CheckoutForm)
  const deliveryAddress = String(formData.get("deliveryAddress") || "")
  const paymentMethod = String(formData.get("paymentMethod") || "")
  const cartItems = JSON.parse(String(formData.get("cartItems") || "[]"))
  const total = Number(formData.get("total") || 0)

  if (!deliveryAddress || !paymentMethod || cartItems.length === 0) {
    return { success: false, message: "Missing order details." }
  }

  // TODO: Replace with real DB insert (Supabase table `orders`, etc.)
  const fakeOrderId = `order-${uuid().slice(0, 8)}`

  console.info("[placeOrderAction] New order:", {
    id: fakeOrderId,
    deliveryAddress,
    paymentMethod,
    total,
  })

  return {
    success: true,
    message: `Order placed! Your order ID is ${fakeOrderId}.`,
  }
}
