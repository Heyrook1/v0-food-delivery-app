"use client"

import Link from "next/link"

import { useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { placeOrderAction } from "@/app/actions"
import { mockUser } from "@/lib/data" // For default address

export function CheckoutForm() {
  const { cart, subtotal, deliveryFee, total, clearCart, cartRestaurantId, cartRestaurantName } = useCart()
  const [step, setStep] = useState(1) // 1: Delivery, 2: Payment, 3: Review
  const [deliveryAddress, setDeliveryAddress] = useState(mockUser.address || "")
  const [paymentMethod, setPaymentMethod] = useState("credit_card")

  const [state, formAction, isPending] = useActionState(placeOrderAction, null)

  const handlePlaceOrder = async (formData: FormData) => {
    // Add cart details to formData
    formData.append("cartItems", JSON.stringify(cart))
    formData.append("subtotal", subtotal.toString())
    formData.append("deliveryFee", deliveryFee.toString())
    formData.append("total", total.toString())
    formData.append("restaurantId", cartRestaurantId || "")
    formData.append("restaurantName", cartRestaurantName || "")

    await formAction(formData)
    if (state?.success) {
      clearCart() // Clear cart after successful order
    }
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty!</h2>
        <p className="text-muted-foreground mb-6">Add some delicious food to proceed to checkout.</p>
        <Link href="/" passHref>
          <Button className="bg-appRed hover:bg-red-600">Browse Restaurants</Button>
        </Link>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Checkout</CardTitle>
        <CardDescription className="text-center">Step {step} of 3</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Step 1: Delivery Information */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Delivery Information</h3>
            <div className="grid gap-2">
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <Input
                id="deliveryAddress"
                name="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your full address"
                required
              />
            </div>
            <Button
              className="w-full bg-appRed hover:bg-red-600"
              onClick={() => setStep(2)}
              disabled={!deliveryAddress}
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-2">
              <Label
                htmlFor="credit_card"
                className="flex items-center gap-2 rounded-md border p-4 cursor-pointer has-[[data-state=checked]]:border-appRed"
              >
                <RadioGroupItem id="credit_card" value="credit_card" />
                Credit Card
              </Label>
              <Label
                htmlFor="cash_on_delivery"
                className="flex items-center gap-2 rounded-md border p-4 cursor-pointer has-[[data-state=checked]]:border-appRed"
              >
                <RadioGroupItem id="cash_on_delivery" value="cash_on_delivery" />
                Cash on Delivery
              </Label>
            </RadioGroup>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button className="flex-1 bg-appRed hover:bg-red-600" onClick={() => setStep(3)}>
                Review Order
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review Order */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Review Your Order</h3>
            <div className="space-y-2">
              <p className="font-medium">Delivery Address:</p>
              <p className="text-muted-foreground">{deliveryAddress}</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Payment Method:</p>
              <p className="text-muted-foreground">
                {paymentMethod === "credit_card" ? "Credit Card" : "Cash on Delivery"}
              </p>
            </div>
            <Separator />
            <h4 className="font-semibold">Items:</h4>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.menuItemId} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₺{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>₺{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee:</span>
              <span>₺{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₺{total.toFixed(2)}</span>
            </div>
            <form action={handlePlaceOrder} className="space-y-4">
              <input type="hidden" name="deliveryAddress" value={deliveryAddress} />
              <input type="hidden" name="paymentMethod" value={paymentMethod} />
              <Button type="submit" className="w-full bg-appRed hover:bg-red-600" disabled={isPending}>
                {isPending ? "Placing Order..." : "Place Order"}
              </Button>
            </form>
            {state && (
              <p className={`text-center text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
                {state.message}
              </p>
            )}
            <Button variant="outline" onClick={() => setStep(2)} className="w-full">
              Back
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
