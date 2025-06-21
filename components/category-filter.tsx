import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area" // Correct: Named imports
import { Button } from "@/components/ui/button" // Correct: Named import

const categories = [
  "All",
  "Pizza",
  "Burgers",
  "Sushi",
  "Indian",
  "Mexican",
  "Desserts",
  "Drinks",
  "Healthy",
  "Vegan",
  "Breakfast",
  "Lunch",
  "Dinner",
]

export function CategoryFilter() {
  // Explicitly named export
  return (
    <div className="py-4 border-b bg-white">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 px-4 md:px-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="shrink-0 rounded-full px-4 py-2 text-sm font-medium bg-white text-gray-800 hover:bg-gray-100 data-[state=active]:bg-appRed data-[state=active]:text-white"
              data-state={category === "All" ? "active" : undefined} // Example active state
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
