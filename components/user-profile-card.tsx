import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "lucide-react"

interface UserProfileCardProps {
  name: string
  email: string
  address: string
  avatarUrl?: string
}

export function UserProfileCard({ name, email, address, avatarUrl }: UserProfileCardProps) {
  // Named export
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={avatarUrl || "/placeholder-avatar.png"} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-3xl font-bold">{name}</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">{email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-1">
          <p className="text-sm font-medium text-muted-foreground">Delivery Address</p>
          <p className="text-lg">{address}</p>
        </div>
        <Button className="w-full bg-appRed hover:bg-red-600">
          <PencilIcon className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}
