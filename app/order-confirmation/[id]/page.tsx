import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockUser } from "@/lib/data"

interface OrderConfirmationPageProps {
  params: {
    id: string
  }
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  // Default export for the page
  const order = mockUser.orders.find((o) => o.id === params.id)

  if (!order) {
    notFound()
  }

  // Simulate tracking status progression
  const trackingStatus = ["Confirmed", "Preparing", "Out for Delivery", "Delivered"]
  const currentStatusIndex = trackingStatus.indexOf(order.status)
  const nextStatus =
    currentStatusIndex < trackingStatus.length - 1 ? trackingStatus[currentStatusIndex + 1] : order.status

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="text-center border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-green-600">Order Confirmed!</CardTitle>
            <p className="text-lg text-muted-foreground">Your order #{order.id} has been placed successfully.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="font-semibold">Restaurant:</p>
                <p>{order.restaurantName}</p>
              </div>
              <div>
                <p className="font-semibold">Delivery Address:</p>
                <p>{order.deliveryAddress}</p>
              </div>
              <div>
                <p className="font-semibold">Payment Method:</p>
                <p>{order.paymentMethod === "credit_card" ? "Credit Card" : "Cash on Delivery"}</p>
              </div>
              <div>
                <p className="font-semibold">Order Date:</p>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <Separator />

            <h3 className="text-xl font-bold text-left">Order Summary</h3>
            <div className="space-y-2 text-left">
              {order.items.map((item) => (
                <div key={item.menuItemId} className="flex justify-between text-base">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₺{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 text-left">
              <div className="flex justify-between text-base">
                <span>Subtotal:</span>
                <span>₺{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span>Delivery Fee:</span>
                <span>₺{order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span>₺{order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Current Status:</span>
              <span className="text-appRed">{order.status}</span>
            </div>
            <p className="text-muted-foreground mt-2">
              Your order is currently {order.status.toLowerCase()}. We'll notify you when it's{" "}
              {nextStatus.toLowerCase()}.
            </p>
            <Button variant="outline" className="mt-4 w-full">
              Refresh Status
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Link href="/" passHref>
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/profile" passHref>
            <Button className="bg-appRed hover:bg-red-600">View My Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
