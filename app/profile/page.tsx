import { UserProfileCard } from "@/components/user-profile-card" // Named import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History, Settings, Heart, ShoppingCart } from "lucide-react"
import { mockUser } from "@/lib/data"
import { useCart } from "@/context/cart-context" // Client component, so useCart is fine
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function UserProfilePage() {
  // Default export for the page
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?message=Please log in to view your profile.")
  }

  const currentUser = {
    id: user.id,
    name: user.user_metadata.full_name || user.email || "User",
    email: user.email!,
    address: mockUser.address,
    cart: mockUser.cart,
    orders: mockUser.orders,
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="md:col-span-1">
          <UserProfileCard
            name={currentUser.name}
            email={currentUser.email}
            address={currentUser.address}
            // avatarUrl={user.user_metadata.avatar_url || "/placeholder-avatar.png"}
          />
        </div>

        {/* User Actions/Sections */}
        <div className="md:col-span-2 space-y-6">
          <ClientCartSection /> {/* Render ClientCartSection */}
          {/* Order History Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" /> Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentUser.orders.length === 0 ? (
                <p className="text-muted-foreground">No past orders found.</p>
              ) : (
                <div className="space-y-4">
                  {currentUser.orders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <span
                          className={`text-sm font-medium ${order.status === "Delivered" ? "text-green-600" : "text-orange-500"}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">From: {order.restaurantName}</p>
                      <p className="text-sm text-muted-foreground">Total: ₺{order.total.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <Link href={`/order-confirmation/${order.id}`} passHref>
                        <Button variant="link" className="px-0 text-appRed hover:text-red-600 mt-2">
                          View Details
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          {/* Favorite Restaurants Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" /> Favorite Restaurants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven't favorited any restaurants yet.</p>
              <Link href="/" passHref>
                <Button variant="link" className="px-0 text-appRed hover:text-red-600">
                  Browse restaurants
                </Button>
              </Link>
            </CardContent>
          </Card>
          {/* Account Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" /> Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage your account details, payment methods, and preferences.</p>
              <Button variant="link" className="px-0 text-appRed hover:text-red-600">
                Go to settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Client component to use useCart hook
function ClientCartSection() {
  // Named export (implicitly, as it's only used within this file)
  const { cart, subtotal, deliveryFee, total } = useCart()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" /> Current Cart
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.menuItemId} className="flex items-center gap-3">
                <div className="relative w-12 h-12 shrink-0 rounded-md overflow-hidden">
                  <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ₺{item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <span className="font-semibold">₺{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
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
              <Button className="w-full bg-appRed hover:bg-red-600 mt-4">Proceed to Checkout</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
