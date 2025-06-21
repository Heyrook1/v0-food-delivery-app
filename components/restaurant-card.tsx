import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RestaurantCardProps {
  name: string
  imageUrl: string
  rating: number
  deliveryTime: string
  priceRange: string
  isNew?: boolean
}

export function RestaurantCard({
  name,
  imageUrl,
  rating,
  deliveryTime,
  priceRange,
  isNew = false,
}: RestaurantCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={name}
        width={400}
        height={200}
        className="w-full h-40 object-cover"
        quality={75}
      />
      {isNew && (
        <Badge className="absolute top-2 left-2 bg-appRed text-white px-2 py-1 rounded-full text-xs font-semibold">
          New
        </Badge>
      )}
      <CardContent className="p-3">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          <span>{rating.toFixed(1)}</span>
          <span className="mx-1">•</span>
          <span>{deliveryTime}</span>
          <span className="mx-1">•</span>
          <span>{priceRange}</span>
        </div>
      </CardContent>
    </Card>
  )
}
