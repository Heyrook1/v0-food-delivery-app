import Link from "next/link"
import { CategoryFilter } from "@/components/category-filter" // Correct: Named import
import { RestaurantCard } from "@/components/restaurant-card" // Correct: Named import
import { restaurants } from "@/lib/data" // Correct: Named import

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CategoryFilter />
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Restaurants Near You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`} passHref>
                <RestaurantCard {...restaurant} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
