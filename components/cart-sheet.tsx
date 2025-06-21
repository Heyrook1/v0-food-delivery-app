"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from "@/components/ui/sheet" // Named imports
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react"
import Link from "next/link"
import { useId } from "react" // Add this import

interface CartSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ isOpen, onOpenChange }: CartSheetProps) {
  // Named export
  const { cart, updateQuantity, removeFromCart, subtotal, deliveryFee, total, cartRestaurantName } = useCart()
  const titleId = useId() // Add this line
  const descriptionId = useId() // Add this line

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col" aria-labelledby={titleId} aria-describedby={descriptionId}>
        {" "}
        {/* Add aria-labelledby and aria-describedby */}
        <SheetHeader>
          <SheetTitle id={titleId}>Your Cart {cartRestaurantName && `from ${cartRestaurantName}`}</SheetTitle>{" "}
          {/* Add id */}
          <SheetDescription id={descriptionId} className="sr-only">
            {" "}
            {/* Add SheetDescription with id and sr-only */}
            Review your selected items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.menuItemId} className="flex items-center gap-3">
                  <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">₺{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                      >
                        <MinusCircle className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-600"
                        onClick={() => removeFromCart(item.menuItemId)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                  <span className="font-semibold">₺{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <SheetFooter className="flex flex-col gap-2 pt-4">
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
            <Link href="/checkout" passHref>
              <Button className="w-full bg-appRed hover:bg-red-600" onClick={() => onOpenChange(false)}>
                Proceed to Checkout
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
