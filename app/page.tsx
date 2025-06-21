import { AppHeader } from "@/components/app-header"
import { CategoryFilter } from "@/components/category-filter"
import { RestaurantCard } from "@/components/restaurant-card"

const restaurants = [
  {
    id: 1,
    name: "Burger Bliss",
    imageUrl: "/burger-restaurant.png",
    rating: 4.5,
    deliveryTime: "30-45 min",
    priceRange: "$$",
    isNew: true,
  },
  {
    id: 2,
    name: "Pizza Palace",
    imageUrl: "/bustling-pizza-restaurant.png",
    rating: 4.8,
    deliveryTime: "20-30 min",
    priceRange: "$$",
  },
  {
    id: 3,
    name: "Sushi Spot",
    imageUrl: "/bustling-sushi-restaurant.png",
    rating: 4.2,
    deliveryTime: "40-55 min",
    priceRange: "$$$",
  },
  {
    id: 4,
    name: "Indian Spice",
    imageUrl: "/indian-restaurant-exterior.png",
    rating: 4.6,
    deliveryTime: "35-50 min",
    priceRange: "$$",
  },
  {
    id: 5,
    name: "Taco Fiesta",
    imageUrl: "/vibrant-mexican-restaurant.png",
    rating: 4.3,
    deliveryTime: "25-40 min",
    priceRange: "$",
  },
  {
    id: 6,
    name: "Sweet Treats",
    imageUrl: "/charming-dessert-shop.png",
    rating: 4.9,
    deliveryTime: "15-25 min",
    priceRange: "$",
    isNew: true,
  },
  {
    id: 7,
    name: "Green Garden",
    imageUrl: "/healthy-food-restaurant.png",
    rating: 4.1,
    deliveryTime: "30-40 min",
    priceRange: "$$",
  },
  {
    id: 8,
    name: "Vegan Vibes",
    imageUrl: "/vibrant-vegan-restaurant.png",
    rating: 4.7,
    deliveryTime: "45-60 min",
    priceRange: "$$",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader />
      <CategoryFilter />
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Restaurants Near You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
