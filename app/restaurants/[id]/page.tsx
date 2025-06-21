"use client" // This page needs to be a client component to use useCart

import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Clock, MapPin, ShoppingCart } from "lucide-react"
import { restaurants } from "@/lib/data"
import { RestaurantReviews } from "@/components/restaurant-reviews" // Named import
import { useCart } from "@/context/cart-context" // Named import

interface RestaurantDetailPageProps {
  params: {
    id: string
  }
}

export default function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  // Default export for the page
  const restaurant = restaurants.find((r) => r.id === params.id)
  const { addToCart } = useCart()

  if (!restaurant) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Restaurant Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src={restaurant.imageUrl || "/placeholder.svg"}
              alt={restaurant.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              quality={80}
            />
          </div>
          <h1 className="text-4xl font-bold">{restaurant.name}</h1>
          <p className="text-muted-foreground text-lg">{restaurant.description}</p>
          <div className="flex items-center gap-4 text-lg text-gray-700">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{restaurant.priceRange}</span>
            </div>
          </div>

          {/* Menu Section */}
          <h2 className="text-3xl font-bold mt-8 mb-4">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurant.menu.map((item) => (
              <Card key={item.id} className="flex overflow-hidden">
                <div className="relative w-28 h-28 shrink-0">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-lg"
                    quality={70}
                  />
                </div>
                <CardContent className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold">₺{item.price}</span>
                    <Button
                      size="sm"
                      className="bg-appRed hover:bg-red-600"
                      onClick={() => addToCart(item, restaurant)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="md:col-span-1">
          <RestaurantReviews reviews={restaurant.reviews} restaurantId={restaurant.id} />
        </div>
      </div>
    </div>
  )
}
