"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { CartItem, MenuItem, Restaurant } from "@/lib/data"

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: MenuItem, restaurant: Restaurant) => void
  removeFromCart: (menuItemId: string) => void
  updateQuantity: (menuItemId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
  deliveryFee: number
  total: number
  cartRestaurantId: string | null // To ensure items from only one restaurant are in cart
  cartRestaurantName: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Named export
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartRestaurantId, setCartRestaurantId] = useState<string | null>(null)
  const [cartRestaurantName, setCartRestaurantName] = useState<string | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("food_app_cart")
    const savedRestaurantId = localStorage.getItem("food_app_cart_restaurant_id")
    const savedRestaurantName = localStorage.getItem("food_app_cart_restaurant_name")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    if (savedRestaurantId) {
      setCartRestaurantId(savedRestaurantId)
    }
    if (savedRestaurantName) {
      setCartRestaurantName(savedRestaurantName)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("food_app_cart", JSON.stringify(cart))
    localStorage.setItem("food_app_cart_restaurant_id", cartRestaurantId || "")
    localStorage.setItem("food_app_cart_restaurant_name", cartRestaurantName || "")
  }, [cart, cartRestaurantId, cartRestaurantName])

  const addToCart = useCallback(
    (item: MenuItem, restaurant: Restaurant) => {
      if (cartRestaurantId && cartRestaurantId !== restaurant.id) {
        if (
          !confirm(
            `Your cart contains items from ${cartRestaurantName}. Do you want to clear it and add items from ${restaurant.name}?`,
          )
        ) {
          return
        }
        setCart([])
        setCartRestaurantId(restaurant.id)
        setCartRestaurantName(restaurant.name)
      } else {
        setCartRestaurantId(restaurant.id)
        setCartRestaurantName(restaurant.name)
      }

      setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.menuItemId === item.id)
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.menuItemId === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
          )
        } else {
          return [
            ...prevCart,
            { menuItemId: item.id, name: item.name, price: item.price, quantity: 1, imageUrl: item.imageUrl },
          ]
        }
      })
    },
    [cartRestaurantId, cartRestaurantName],
  )

  const removeFromCart = useCallback((menuItemId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.menuItemId !== menuItemId)
      if (newCart.length === 0) {
        setCartRestaurantId(null)
        setCartRestaurantName(null)
      }
      return newCart
    })
  }, [])

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => (item.menuItemId === menuItemId ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0)

      if (updatedCart.length === 0) {
        setCartRestaurantId(null)
        setCartRestaurantName(null)
      }
      return updatedCart
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    setCartRestaurantId(null)
    setCartRestaurantName(null)
  }, [])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 0 ? 15 : 0 // Example: 15 TL delivery fee if cart is not empty
  const total = subtotal + deliveryFee

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    cartRestaurantId,
    cartRestaurantName,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  // Named export
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
